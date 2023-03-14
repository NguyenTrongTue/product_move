const FactoryWarehouse = require("../models/FactoryWarehouse");
const StoreWarehouse = require("../models/StoreWarehouse");
const Invoice = require("../models/Invoice");
const Product = require("../models/Product");
const Factory = require("../models/Factory");

const createError = require("../../util/error");

class FactoryController {
  // import shipment after production
  import(req, res, next) {
    const importProducts = async (req, res, next) => {
      try {
        const newInvoice = new Invoice({
          ...req.body,
          type: "import",
        });

        // save new invoice
        const invoice = await newInvoice.save();

        // factorywarehouse update
        var warehouse = await FactoryWarehouse.findOne({
          productCode: req.body.productCode,
        });
        var errorQuantity = warehouse
          ? warehouse.errorQuantity + parseInt(req.body.quantity)
          : parseInt(req.body.quantity);
        var quantity = warehouse
          ? warehouse.quantity + parseInt(req.body.quantity)
          : parseInt(req.body.quantity);
        // check if the shipment is defective then add the defective status
        if (req.body.isError === "0") {
          // If found update, if not create a new one
          const product = await FactoryWarehouse.findOneAndUpdate(
            {
              productCode: req.body.productCode,
            },
            {
              $set: {
                quantity,
                factoryWarehouseCode: req.params.factory,
              },
            },
            { upsert: true, new: true }
          );
          res.status(200).json({ product, invoice });
        } else {
          // similar
          const product = await FactoryWarehouse.findOneAndUpdate(
            {
              productCode: req.body.productCode,
            },
            {
              $set: {
                errorQuantity,
                factoryWarehouseCode: req.params.factory,
              },
            },
            { upsert: true, new: true }
          );
          res.status(200).json({ product, invoice });
        }
      } catch (err) {
        next(err);
      }
    };
    importProducts(req, res, next);
  }
  // export products for stores
  export(req, res, next) {
    const exportProducts = async (req, res, next) => {
      try {
        var warehouse = await FactoryWarehouse.findOne({
          productCode: req.body.productCode,
        });
        // Check if the factory product exists in the warehouse
        if (!warehouse) return next(createError(404, "Warehouse not found!"));
        // check if the output quantity is bigger than in the warehouse
        if (warehouse.quantity < parseInt(req.body.quantity))
          return next(
            createError(
              404,
              "Output quantity is larger than available quantity!"
            )
          );

        // save new invoice

        const newInvoice = new Invoice({
          ...req.body,
          type: "export",
          isError: false,
        });
        const invoice = await newInvoice.save();

        // Update the quantity in stock and the quantity sold
        var quantity = warehouse.quantity - parseInt(req.body.quantity);
        // Update total sales
        var totalSales = warehouse
          ? warehouse.totalSales + parseInt(req.body.quantity)
          : parseInt(req.body.quantity);
        const product = await FactoryWarehouse.findOneAndUpdate(
          {
            productCode: req.body.productCode,
          },
          {
            $set: {
              quantity,
              totalSales,
              factoryWarehouseCode: req.params.factory,
            },
          },
          { upsert: true, new: true }
        );

        // update store warehouse based on product code
        var storeWarehouse = await StoreWarehouse.findOne({
          productCode: req.body.productCode,
        });
        var quantityStore = storeWarehouse
          ? storeWarehouse.quantity + parseInt(req.body.quantity)
          : parseInt(req.body.quantity);
        const store = await StoreWarehouse.findOneAndUpdate(
          {
            productCode: req.body.productCode,
          },
          {
            $set: {
              quantity: quantityStore,
              storeWarehouseCode: req.body.outputCode,
            },
          },
          { upsert: true, new: true }
        );
        res.status(200).json({ product, invoice, store });
      } catch (err) {
        next(err);
      }
    };
    exportProducts(req, res, next);
  }
  // sales statistics and production quantity defect rate
  statisticProduct(req, res, next) {
    const statistic = async (req, res, next) => {
      const responsive = await FactoryWarehouse.find({});
      const data = await Promise.all(
        responsive.map(async (item) => {
          const product = await Product.findOne({
            productCode: item.productCode,
          });
          const factory = await Factory.findOne({
            factoryCode: item.factoryWarehouseCode,
          });
          let errorRate = (
            (item.errorQuantity /
              (item.quantity + item.totalSales + item.errorQuantity)) *
            100
          ).toFixed(2);
          let salesRate = (
            (item.totalSales /
              (item.quantity + item.totalSales + item.errorQuantity)) *
            100
          ).toFixed(2);
          // inventory ratio
          let inventory = (100 - errorRate - salesRate).toFixed(2);
          return {
            productCode: item.productCode,
            productLine: product.productLine,
            productName: product.name,
            quantity: item.quantity,
            errorQuantity: item.errorQuantity,
            factoryWarehouseCode: item.factoryWarehouseCode,
            address: factory.address,
            totalSales: item.totalSales,
            errorRate,
            salesRate,
            inventory,
            createAt: item.createdAt.toDateString(),
          };
        })
      );

      res.status(200).json(data);
    };
    statistic(req, res, next);
  }

  show(req, res, next) {
    const factoryWarehouse = FactoryWarehouse.find({}).then((data) => {
      res.status(200).json(data);
    });
  }
  showAll(req, res, next) {
    Invoice.find({}).then((data) => res.status(200).json(data));
  }
}

module.exports = new FactoryController();
