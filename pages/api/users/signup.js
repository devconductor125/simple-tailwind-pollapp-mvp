const db = require("../db");

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json({ msg: "success" });
      break;
    case "POST":
      const data = req.body;
      const [exist] = await db.execute("SELECT * FROM users WHERE email=?", [
        data.email,
      ]);
      if (exist.length > 0) res.json({ msg: "Email already exist" });
      else {
        const [rows] = await db.execute(
          "INSERT INTO users (name, email, password) VALUES (?,?,?)",
          [data.name, data.email, data.password]
        );
        res.json({ msg: "success" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
