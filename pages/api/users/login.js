const db = require("../db");

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const [rows, fields] = await db.execute("SELECT * FROM users");
      res.json(rows);
      break;
    case "POST":
      const [user] = await db.execute(
        `SELECT * FROM users where email='${req.body.email}' and password='${req.body.password}'`
      );
      if (user.length > 0) res.json(user);
      else res.status(202).json({ msg: "Invalid user" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
