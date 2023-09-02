const db = require("../db");

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const [rows, fields] = await db.execute("SELECT * FROM users");
      res.json(rows[0]);
      break;
    case "POST":
      res.json({ method: "POST", endpoint: "Users" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
