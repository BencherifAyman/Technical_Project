const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");

const productsRouter = require("./products");
const authRouter = require("./auth");

module.exports = (app) => {
  const router = express.Router();


  router.get("/health", (req, res) => {
    serverResponses.sendSuccess(res, messages.SUCCESSFUL || "OK", {
      status: "up",
      mongo: !!req.app.locals.db,
    });
  });


  router.use("/products", productsRouter); 
  router.use("/", authRouter);             

  app.use("/api", router);

  app.use("/api/*", (req, res) => {
    serverResponses.sendError(res, messages.NOT_FOUND || "Not found", {
      url: req.originalUrl,
      method: req.method,
    });
  });
};
