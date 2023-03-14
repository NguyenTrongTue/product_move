const siteRouter = require("./site");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const storeRouter = require("./store");
const warrantyRouter = require("./warranty");
const factoryRouter = require("./factory");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/admin", adminRouter);
  app.use("/store", storeRouter);
  app.use("/warranty", warrantyRouter);
  app.use("/factory", factoryRouter);
  app.use("/", siteRouter);

}

module.exports = route;
