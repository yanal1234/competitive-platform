const generateRoadmap = (rows) => {
  let roadmap = [];
  const seen = new Set();
  let stage = {};
  for (const row of rows) {
    if (!seen.has(row.stage_id)) {
      seen.add(row.stage_id);
      if (!stage[row.stage_id]) {
        stage[row.stage_id] = {
          stageId: row.stage_id,
          title: row.title,
          topics: []
        }
      }
      roadmap.push(stage[row.stage_id]);
    }
    stage[row.stage_id].topics.push({
      tagId: row.tag_id,
      name: row.tag_name,
      completed: row.completed || 0
    })
  }
  return roadmap;
}

module.exports = { generateRoadmap };
