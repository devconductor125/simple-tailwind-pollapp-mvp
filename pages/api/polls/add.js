const db = require("../db");

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      break;
    case "POST":
      const chipData = req.body.chipData;
      await db
        .execute("INSERT INTO polls (title, description) VALUES (?, ?)", [
          req.body.title,
          req.body.description,
        ])
        .then((newRow) => {
          console.log(newRow[0].insertId);
          for (let x in chipData) {
            db.execute(
              "INSERT INTO polloptions (name, poll_id) VALUES (?, ?)",
              [chipData[x], newRow[0].insertId]
            );
          }
        });
      res.status(200).json({ msg: "success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
