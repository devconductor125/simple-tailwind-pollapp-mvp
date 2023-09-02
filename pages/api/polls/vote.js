const db = require("../db");

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const [rows, fields] = await db.execute(
        "SELECT t1.*, t2.name FROM (SELECT COUNT(id), option_id  FROM votes WHERE poll_id=? GROUP BY option_id) t1 LEFT JOIN polloptions t2 ON t1.option_id = t2.id",
        [req.body.id]
      );
      console.log("adsfasdf", rows);
      res.json(rows);
      break;
    case "POST":
      const [votes] = await db.execute(
        "SELECT t1.*, t2.name FROM (SELECT COUNT(id) as value, option_id  FROM votes WHERE poll_id=? GROUP BY option_id) t1 LEFT JOIN polloptions t2 ON t1.option_id = t2.id",
        [req.body.id]
      );
      console.log("adsfasdf", votes);
      res.json(votes);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
