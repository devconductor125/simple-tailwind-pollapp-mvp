const db = require("../db");

export default async (req, res) => {
  const { method } = req;
  const {
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      await db
        .execute(
          "SELECT tt1.*, tt2.optionIds FROM (SELECT t1.*, GROUP_CONCAT(t2.name) AS poll_options FROM polls t1 LEFT JOIN polloptions t2 ON t1.id=t2.poll_id GROUP BY t2.poll_id) tt1 LEFT JOIN (SELECT t1.*, GROUP_CONCAT(t3.id) AS optionIds FROM polls t1 LEFT JOIN polloptions t3 ON t1.id=t3.poll_id GROUP BY t3.poll_id) tt2 ON tt1.id = tt2.id WHERE tt1.id=?",
          [id]
        )
        .then((result) => {
          res.json(result);
        });
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
    case "DELETE":
      const [poll] = await db.execute(
        "SELECT t1.*, GROUP_CONCAT(t3.id) AS optionIds FROM polls t1 LEFT JOIN polloptions t3 ON t1.id=t3.poll_id WHERE t1.id=? GROUP BY t3.poll_id",
        [id]
      );
      const options = poll[0]?.optionIds?.split(",");
      for (let x in options) {
        await db.execute("DELETE FROM polloptions where id=? and poll_id=?", [
          options[x],
          id,
        ]);
      }
      await db.execute("DELETE FROM votes where poll_id=?", [id]);
      await db.execute("DELETE FROM polls where id=?", [id]);
      res.json({ msg: "success" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
