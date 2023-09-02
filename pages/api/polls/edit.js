const db = require("../db");

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      break;
    case "POST":
      const chipData = req.body.chipData;
      const pollId = req.body.pollId;

      await db.execute("DELETE FROM polloptions where poll_id=?", [pollId]);
      await db.execute("DELETE FROM votes where poll_id=?", [pollId]);
      for (let x in chipData) {
        await db.execute(
          "INSERT INTO polloptions (name, poll_id) VALUES (?, ?)",
          [chipData[x], pollId]
        );
      }
      await db.execute("UPDATE polls SET title=?, description=?", [
        req.body.title,
        req.body.description,
      ]);
      res.status(200).json({ msg: "success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
