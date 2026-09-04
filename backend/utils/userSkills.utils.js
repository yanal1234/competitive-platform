const updateUserSkills = async (userId, problemId, difficulty) => {
  const difficultyPoints = {
    Easy: 5,
    Medium: 10,
    Hard: 15
  };

  const masteryPoints = difficultyPoints[difficulty];

  const [tags] = await db.query(
    `SELECT tag_id FROM problemtags WHERE problem_id = ?`,
    [problemId]
  );

  for (const tag of tags) {

    const [skill] = await db.query(
      `SELECT solved_count, mastery_score
       FROM userskills
       WHERE user_id = ? AND tag_id = ?`,
      [userId, tag.tag_id]
    );

    if (skill.length > 0) {

      await db.query(
        `UPDATE userskills
         SET solved_count = solved_count + 1,
             mastery_score = LEAST(mastery_score + ?, 100)
         WHERE user_id = ? AND tag_id = ?`,
        [masteryPoints, userId, tag.tag_id]
      );
    } else {

      await db.query(
        `INSERT INTO userskills
         (user_id, tag_id, solved_count, mastery_score)
         VALUES (?, ?, 1, ?)`,
        [userId, tag.tag_id, masteryPoints]
      );
    }
  }
};
