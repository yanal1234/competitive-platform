const formatProblems = (problems) => {
  const sortproblems = {};
  for (problem of problems) {
    if (!sortproblems[problem.problem_id]) {
      sortproblems[problem.problem_id] = {
        problem_id: problem.problem_id,
        title: problem.title,
        difficulty: problem.difficulty,
        tags: []
      }
    }
    sortproblems[problem.problem_id].tags.push(problem.tag_id);
  }
  console.log(Object.values(sortproblems));
  return Object.values(sortproblems);
}


module.exports = { formatProblems };
