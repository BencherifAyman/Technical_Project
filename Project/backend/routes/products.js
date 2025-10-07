
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "super_secret_key";

// Middleware d'auth pour POST/PUT/DELETE
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}


// GET /api/products
router.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const all = await db.collection("products").find().toArray();
    res.json(all);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const _id = parseInt(req.params.id);;
    const doc = await db.collection("products").findOne({ _id });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST /api/products (protégé)
router.post("/", auth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const col = db.collection("products");
    const doc = req.body;

    if (typeof doc._id === "undefined") {
      const last = await col.find().sort({ _id: -1 }).limit(1).toArray();
      doc._id = last[0] ? (Number(last[0]._id) || 0) + 1 : 1;
    }

    await col.insertOne(doc);


    req.io.emit("product_created", doc);

    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/products/:id (protégé)
router.put("/:id", auth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const col = db.collection("products");
    const _id = parseInt(req.params.id);;

    await col.updateOne({ _id }, { $set: req.body });
    const updated = await col.findOne({ _id });
    if (!updated) return res.status(404).json({ error: "Not found" });

    req.io.emit("product_updated", updated);

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/products/:id (protégé)
router.delete("/:id", auth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const col = db.collection("products");
    const _id = parseInt(req.params.id);;

    const toDelete = await col.findOne({ _id });
    const r = await col.deleteOne({ _id });
    if (r.deletedCount === 0) return res.status(404).json({ error: "Not found" });

    req.io.emit("product_deleted", toDelete || { _id });

    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
