const StoreWarehouse = require("../models/StoreWarehouse");
const FactoryWarehouse = require("../models/FactoryWarehouse");
const WarrantyWarehouse = require("../models/WarrantyWarehouse");

const Product = require("../models/Product");
const Warranty = require("../models/Warranty");
const WarrantyInvoice = require("../models/WarrantyInvoice");
class WarrantyController {
  returnProductToStore(req, res, next) {
    const update = async (req, res, next) => {
      try {
        const id = req.params.id;
        const warrantyInvoice = await WarrantyInvoice.findByIdAndUpdate(
          id,
          {
            $set: {
              description: `The product has been shipped to the store`,
              status: "Successful",
            },
          },
          {
            new: true,
          }
        );
        const warrantyWarehouse = await WarrantyWarehouse.findOne({
          productCode: warrantyInvoice.productCode,
        });
        warrantyWarehouse.fixing =
          warrantyWarehouse.fixing - warrantyInvoice.quantity;
        warrantyWarehouse.complete =
          warrantyWarehouse.complete + warrantyInvoice.quantity;
        await warrantyWarehouse.save();

        const storeWarehouse = await StoreWarehouse.findOne({
          productCode: warrantyInvoice.productCode,
        });
        storeWarehouse.quantity =
          storeWarehouse.quantity + warrantyInvoice.quantity;
        storeWarehouse.description = `Received  ${warrantyInvoice.quantity} from warranty`;
        await storeWarehouse.save();

        res.status(200).json(warrantyInvoice);
      } catch (err) {
        next(err);
      }
    };

    update(req, res, next);
  }
  returnProductToFactory(req, res, next) {
    const update = async (req, res, next) => {
      try {
        const id = req.params.id;
        const warrantyInvoice = await WarrantyInvoice.findByIdAndUpdate(
          id,
          {
            $set: {
              description: `Product cannot be repaired`,
              status: "Failure",
            },
          },
          {
            new: true,
          }
        );
        const warrantyWarehouse = await WarrantyWarehouse.findOne({
          productCode: warrantyInvoice.productCode,
        });
        warrantyWarehouse.fixing =
          warrantyWarehouse.fixing - warrantyInvoice.quantity;
        warrantyWarehouse.canNotBeFixed =
          warrantyWarehouse.canNotBeFixed + warrantyInvoice.quantity;
        await warrantyWarehouse.save();

        const factoryWarehouse = await FactoryWarehouse.findOne({
          productCode: warrantyInvoice.productCode,
        });
        factoryWarehouse.errorQuantity =
          factoryWarehouse.errorQuantity + warrantyInvoice.quantity;
        await factoryWarehouse.save();

        res.status(200).json(warrantyInvoice);
      } catch (err) {
        next(err);
      }
    };

    update(req, res, next);
  }
  show(req, res, next) {
    WarrantyWarehouse.findOne({ _id: req.params.id })
      .then((warrantyWarehouse) => {
        res.status(200).json(warrantyWarehouse);
      })
      .catch(next);
  }
  showAll(req, res, next) {
    WarrantyWarehouse.find({})
      .then((warrantyWarehouse) => {
        res.status(200).json(warrantyWarehouse);
      })
      .catch(next);
  }
  statisticProduct(req, res, next) {
    const statistic = async (req, res, next) => {
      const responsive = await WarrantyWarehouse.find({});
      const data = await Promise.all(
        responsive.map(async (item) => {
          const product = await Product.findOne({
            productCode: item.productCode,
          });
          const warranty = await Warranty.findOne({
            warrantyCode: item.warrantyWarehouseCode,
          });
          let errorRate = (
            (item.canNotBeFixed / (item.complete + item.canNotBeFixed)) *
            100
          ).toFixed(2);
          let completeRate = (
            (item.complete / (item.complete + item.canNotBeFixed)) *
            100
          ).toFixed(2);
          return {
            productCode: item.productCode,
            productLine: product.productLine,
            productName: product.name,
            errorQuantity: item.errorQuantity,
            warrantyWarehouseCode: item.warrantyWarehouseCode,
            complete: item.complete,
            canNotBeFixed: item.canNotBeFixed,
            errorRate,
            completeRate,
            fixing: item.fixing,
          };
        })
      );

      res.status(200).json(data);
    };
    statistic(req, res, next);
  }
}

module.exports = new WarrantyController();
