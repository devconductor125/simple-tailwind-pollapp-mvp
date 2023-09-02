const db = require("../db");

export async function login(req, res) {
  console.log(req);
}

export default async (req, res) => {
  const { method } = req;
  const {
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      res.json({ method: "POST", endpoint: "Users" });
      break;
    case "POST":
      const [rows] = await db.execute(
        "select option_id from votes where user_id=? and poll_id=?",
        [id, req.body.pollId]
      );
      res.json(rows);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
