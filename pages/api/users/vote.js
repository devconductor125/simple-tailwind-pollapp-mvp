const db = require("../db");

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const [rows, fields] = await db.execute(
        "SELECT t1.*, t2.name FROM (SELECT COUNT(id), option_id  FROM votes WHERE poll_id=? GROUP BY option_id) t1 LEFT JOIN polloptions t2 ON t1.option_id = t2.id",
        [req.body.id]
      );
      res.json(rows);
      break;
    case "POST":
      let vote = req.body;
      await db
        .execute(
          "SELECT COUNT(id) AS votes, id FROM votes WHERE user_id = ?  AND poll_id = ?",
          [vote.userId, vote.pollId]
        )
        .then((result) => {
          if (result[0][0].id) {
            db.execute(
              "UPDATE votes SET user_id=?, poll_id=?, option_id=? where id=?",
              [vote.userId, vote.pollId, vote.optionId, result[0][0].id]
            );
          } else {
            db.execute(
              "INSERT INTO votes (user_id, poll_id, option_id) values (?, ?, ?)",
              [vote.userId, vote.pollId, vote.optionId]
            );
          }
        });
      res.json({ msg: "success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
