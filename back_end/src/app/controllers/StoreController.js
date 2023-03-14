const StoreWarehouse = require("../models/StoreWarehouse");
const WarrantyWarehouse = require("../models/WarrantyWarehouse");
const Product = require("../models/Product");
const Store = require("../models/Store");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const WarrantyInvoice = require("../models/WarrantyInvoice");

const createError = require("../../util/error");

class StoreController {
  showAllWarehouse(req, res, next) {
    const show = async (req, res, next) => {
      try {
        const data = await StoreWarehouse.find({});

        res.status(200).json({ data });
      } catch (err) {
        next(err);
      }
    };
    show(req, res, next);
  }
  showWarehouse(req, res, next) {
    StoreWarehouse.findById(req.params.id)
      .then((data) => res.status(200).json(data))
      .catch(next(createError(404, "Not found storewarehouse!")));
  }
  showAllCustomer(req, res, next) {
    Customer.find({})
      .then((customers) => res.status(200).json(customers))
      .catch(next);
  }
  showOrder(req, res, next) {
    Order.findById(req.params.id)
      .then((order) => res.status(200).json(order))
      .catch(next);
  }
  showAllOrder(req, res, next) {
    Order.find({})
      .then((order) => res.status(200).json(order))
      .catch(next);
  }
  showWarrantyInvoice(req, res, next) {
    WarrantyInvoice.findById(req.params.id)
      .then((warrantyInvoice) => res.status(200).json(warrantyInvoice))
      .catch(next);
  }
  showAllWarrantyInvoice(req, res, next) {
    WarrantyInvoice.find({})
      .then((warrantyInvoice) => res.status(200).json(warrantyInvoice))
      .catch(next);
  }
  createOrder(req, res, next) {
    const order = async (req, res, next) => {
      // Check if the product exists in the warehouse based on the product code
      const storeWarehouse = await StoreWarehouse.findOne({
        productCode: req.body.productCode,
      });
      if (!storeWarehouse)
        return next(createError(404, "The product is currently not in stock"));
      const product = await Product.findOne({
        productCode: req.body.productCode,
      });

      const price = product.price;
      const total = price * req.body.quantity;
      const remaining = storeWarehouse.quantity - req.body.quantity;

      const newOrder = new Order({ ...req.body, price, total });

      const customer = await Customer.findOne({
        customerNumber: req.body.customerNumber,
      });
      if (!customer) {
        const newCustomer = new Customer({
          customerNumber: req.body.customerNumber,
          fullName: req.body.fullName,
          phone: req.body.customerPhone,
          address: req.body.customerAddress,
        });
        newCustomer.save();
      }
      const totalSales =
        storeWarehouse.totalSales + parseInt(req.body.quantity);
      Promise.all([
        newOrder.save(),
        StoreWarehouse.findOneAndUpdate(
          { productCode: req.body.productCode },
          {
            $set: { quantity: remaining, totalSales },
          },
          {
            new: true,
          }
        ),
      ]).then(([order, storeWarehouse]) => {
        res.status(200).json({
          order,
          storeWarehouse,
        });
      });
    };
    order(req, res, next);
  }
  // create a warranty invoice
  createWarrantyInvoice(req, res, next) {
    const createInvoice = async (req, res, next) => {
      const newWarrantyInvoice = new WarrantyInvoice(req.body);
      const warehouse = await StoreWarehouse.findOne({
        productCode: req.body.productCode,
      });
      const errorQuantity = warehouse
        ? warehouse.errorQuantity + parseInt(req.body.quantity)
        : parseInt(req.body.quantity);

      Promise.all([
        newWarrantyInvoice.save(),
        StoreWarehouse.findOneAndUpdate(
          { productCode: req.body.productCode },
          {
            $set: {
              errorQuantity,
              description: `Received ${req.body.quantity} more defective products`,
            },
          }
        ),
      ]).then(([warrantyInvoice, ...rest]) =>
        res.status(200).json(warrantyInvoice)
      );
    };
    createInvoice(req, res, next);
  }
  // Send the warranty product to the warranty center and update the factory warehouse 
  // and the warranty center warehouse
  sendToWarranty(req, res, next) {
    const update = async (req, res, next) => {
      try {
        const id = req.params.id;
        const warrantyInvoice = await WarrantyInvoice.findByIdAndUpdate(
          id,
          {
            $set: {
              warrantyCode: "w_cg",
              description: "Transferred to the warranty",
            },
          },
          {
            new: true,
          }
        );
        const storeWarehouse = await StoreWarehouse.findOne({
          productCode: warrantyInvoice.productCode,
        });
        storeWarehouse.errorQuantity =
          storeWarehouse.errorQuantity - warrantyInvoice.quantity;
        await storeWarehouse.save();
        var warrantyWarehouse = await WarrantyWarehouse.findOne({
          productCode: warrantyInvoice.productCode,
        });

        if (!warrantyWarehouse) {
          const newWarrantyWarehouse = new WarrantyWarehouse({
            productCode: warrantyInvoice.productCode,
            warrantyWarehouseCode: "w_cg",
            description: `Received ${warrantyInvoice.quantity} defective products from ${warrantyInvoice.storeCode}`,
            fixing: warrantyInvoice.quantity,
            status: "Pedding",
          });
          await newWarrantyWarehouse.save();
        } else {
          var fixing = warrantyWarehouse
            ? warrantyWarehouse.fixing + warrantyInvoice.quantity
            : warrantyWarehouse.fixing;
          warrantyWarehouse.fixing = fixing;
          warrantyWarehouse.description = `Received ${warrantyInvoice.quantity} defective products from ${warrantyInvoice.storeCode}`;
          warrantyWarehouse.status = "Pedding";
          await warrantyWarehouse.save();
        }

        res.status(200).json(warrantyInvoice);
      } catch (err) {
        next(err);
      }
    };
    update(req, res, next);
  }
  // If the product has been repaired, return the new product to the customer
  returnProductToCustomer(req, res, next) {
    const update = async (req, res, next) => {
      try {
        const id = req.params.id;
        const warrantyInvoice = await WarrantyInvoice.findById(id);
        if (warrantyInvoice.status === "Successful") {
          warrantyInvoice.description =
            "Delivered warranty products to customers";
        } else {
          warrantyInvoice.status = "Failure";
          warrantyInvoice.description = "Delivered new products to customers";
        }
        await warrantyInvoice.save();
        const storeWarehouse = await StoreWarehouse.findOne({
          productCode: warrantyInvoice.productCode,
        });
        storeWarehouse.quantity =
          storeWarehouse.quantity - warrantyInvoice.quantity;
        await storeWarehouse.save();
        res.status(200).json({
          warrantyInvoice,
        });
      } catch (err) {
        next(err);
      }
    };
    update(req, res, next);
  }
  // sales statistics, error rate, inventory,...
  statisticProduct(req, res, next) {
    const statistic = async (req, res, next) => {
      const responsive = await StoreWarehouse.find({});
      const data = await Promise.all(
        responsive.map(async (item) => {
          const product = await Product.findOne({
            productCode: item.productCode,
          });
          const store = await Store.findOne({
            storeCode: item.storeWarehouseCode,
          });
          let errorRate = (
            (item.totalError /
              (item.quantity + item.totalSales + item.totalError)) *
            100
          ).toFixed(2);
          let salesRate = (
            (item.totalSales /
              (item.quantity + item.totalSales + item.totalError)) *
            100
          ).toFixed(2);
          let inventory = (100 - errorRate - salesRate).toFixed(2);
          return {
            productCode: item.productCode,
            productLine: product.productLine,
            productName: product.name,
            quantity: item.quantity,
            errorQuantity: item.errorQuantity,
            storeWarehouseCode: item.storeWarehouseCode,
            totalSales: item.totalSales,
            totalError: item.totalError,
            errorRate,
            salesRate,
            inventory,
          };
        })
      );

      res.status(200).json(data);
    };
    statistic(req, res, next);
  }
}

module.exports = new StoreController();
