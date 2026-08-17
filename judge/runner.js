const fs = require("fs/promises");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const languages = require("./languages");

const runCode = async (code, input, expectedOutput, timeLimit, memoryLimit, language) => {
  let output = "";
  let errorOutput = "";
  let verdict = "Accepted";
  let memoryUsed = Number(memoryLimit);

  const languageConfig = languages[language];

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "judge-"));
  const solutionpath = path.join(tempDir, languageConfig.fileName);

  try {
    await fs.writeFile(solutionpath, code);

    const container_name = `judge-${Date.now()}`;

    const child = spawn("docker", ["run", "-i", "--name", container_name, "--memory", `${memoryLimit}m`, "-v", `${solutionpath}:/app/${languageConfig.fileName}:ro`, languageConfig.image]);

    child.stdin.write(input);
    child.stdin.end();

    const startTime = Date.now();

    const timeout = setTimeout(() => {
      verdict = "Time Limit Exceeded";
      spawn("docker", ["rm", "-f", container_name]);
    }, Number(timeLimit) * 1000);

    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    const result = await new Promise((resolve) => {
      child.on("close", async (code) => {
        const executionTime = (Date.now() - startTime) / 1000;

        clearTimeout(timeout);

        const oomKilled = await new Promise((resolve) => {
          const inspect = spawn("docker", ["inspect", "--format={{.State.OOMKilled}}", container_name]);
          let result = "";
          inspect.stdout.on("data", (data) => {
            result += data.toString();
          });

          inspect.on("close", () => {
            resolve(result.trim() === "true");
          })
        });

        if (verdict !== "Time Limit Exceeded") {
          if (oomKilled) {
            verdict = "Memory Limit Exceeded";
            memoryUsed = memoryUsed * 2;
          }
          else if (code === 10) {
            verdict = "Compilation Error";
          }
          else if (code === 0) {
            if (output.trim() === expectedOutput.trim()) {
              verdict = "Accepted";
            }
            else {
              verdict = "Wrong Answer";
            }
          }
          else if (errorOutput.includes("JavaScript heap out of memory")) {
            verdict = "Memory Limit Exceeded";
            memoryUsed = memoryUsed * 2;
          }
          else {
            verdict = "Runtime Error";
          }
        }

        resolve({
          verdict,
          output,
          errorOutput,
          executionTime,
          memoryUsed
        });
      });
    });

    spawn("docker", ["rm", "-f", container_name]);

    return (result);
  }
  finally { await fs.rm(tempDir, { recursive: true, force: true }) };

};

module.exports = runCode;
