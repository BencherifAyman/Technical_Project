// backend/db/index.js
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI || "mongodb://mongo:27017/productsdb";

function extractDbName(uri, fallback = "productsdb") {
  try {
    const afterSlash = uri.split("/").pop() || "";
    const dbName = afterSlash.split("?")[0];
    return dbName || fallback;
  } catch {
    return fallback;
  }
}

let _db;

exports.connect = (app) => {
  const dbName = extractDbName(url, "productsdb");
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, poolSize: 10 })
    .then(async (client) => {
      console.log("✅ MongoDB connected (native 3.2)");
      _db = client.db(dbName);
      app.locals.db = _db;

      // Seed si vide
      const col = _db.collection("products");
      const count = await col.countDocuments();
      if (count === 0) {
        await col.insertMany([
          { _id: 1, name: "AC1 Phone1", type: "phone", price: 200.05, rating: 3.8, warranty_years: 1, available: true },
          { _id: 2, name: "AC2 Phone2", type: "phone", price: 147.21, rating: 1,   warranty_years: 3, available: false },
          { _id: 3, name: "AC3 Phone3", type: "phone", price: 150,    rating: 2,   warranty_years: 1, available: true },
          { _id: 4, name: "AC4 Phone4", type: "phone", price: 50.20,  rating: 3,   warranty_years: 2, available: true }
        ]);
        console.log("🌱 Seeded default products");
      }

      app.emit("ready");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed, retry in 2s", err);
      setTimeout(() => exports.connect(app), 2000);
    });
};

exports.getDb = () => _db;
