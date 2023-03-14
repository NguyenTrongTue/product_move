import classNames from "classnames/bind";
import styles from "~/components/datable/Datatable.module.scss";

const cx = classNames.bind(styles);

export const customerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Fullname",
    width: 280,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 320,
  },
  {
    field: "createdAt",
    headerName: "Create At",
    width: 230,
  },
];

export const orderColumns = [
  { field: "id", headerName: "ID", width: 40 },
  {
    field: "product",
    headerName: "Product",
    width: 350,
    renderCell: (params) => {
      return (
        <div className={cx("cellWithImg")}>
          <img
            className={cx("cellImg")}
            src={params.row.productImage}
            alt="avatar"
          />
          {params.row.productName}
        </div>
      );
    },
  },
  {
    field: "fullName",
    headerName: "Customer Name",
    width: 240,
  },
  {
    field: "customerPhone",
    headerName: "Phone",
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => {
      return (
        <div className={cx("cellWithStatus", `${params.row.status}`)}>
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Order Date",
    width: 220,
  },
];

export const productColumns = [
  { field: "id", headerName: "id", width: 50 },
  {
    field: "product",
    headerName: "Product",
    width: 350,
    renderCell: (params) => {
      return (
        <div className={cx("cellWithImg")}>
          <img
            className={cx("cellImg")}
            src={params.row.productImage}
            alt="avatar"
          />
          {params.row.productName}
        </div>
      );
    },
  },
  {
    field: "productCode",
    headerName: "Product Code",
    width: 230,
  },
  {
    field: "productLine",
    headerName: "Product Line",
    width: 230,
  },
];

export const warehousesColumns = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "productName",
    headerName: "Product Name",
    width: 350,
  },
  {
    field: "productCode",
    headerName: "Product Code",
    width: 160,
  },
  {
    field: "quantity",
    headerName: "Quantity In Stock",
    width: 250,
  },
  {
    field: "totalSales",
    headerName: "Total Sales",
    width: 180,
  },
  {
    field: "storeWarehouseCode",
    headerName: "Warehouse Code",
    width: 240,
  },
];

export const invoiceColumns = [
  { field: "id", headerName: "ID", width: 50 },

  {
    field: "productCode",
    headerName: "Product Code",
    width: 160,
  },

  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
  },
  {
    field: "errorName",
    headerName: "Error Name",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={cx("cellWithStatus", `${params.row.status}`)}>
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 380,
  },
];

export const factoryWarehousesColumns = [
  { field: "id", headerName: "ID", width: 50 },

  {
    field: "productName",
    headerName: "Product Name",
    width: 350,
  },
  {
    field: "productCode",
    headerName: "Product Code",
    width: 160,
  },
  {
    field: "quantity",
    headerName: "Quantity In Stock",
    width: 200,
  },
  {
    field: "errorQuantity",
    headerName: "Error ",
    width: 120,
  },
  {
    field: "totalSales",
    headerName: "Total Sales",
    width: 160,
  },
  {
    field: "factoryWarehouseCode",
    headerName: "Warehouse Code",
    width: 220,
  },
];

export const InvoiceColumns = [
  { field: "id", headerName: "ID", width: 50 },

  {
    field: "productName",
    headerName: "Product Name",
    width: 350,
  },
  {
    field: "type",
    headerName: "Type",
    width: 80,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
  },
  {
    field: "inputCode",
    headerName: "Input Code",
    width: 150,
  },
  {
    field: "outputCode",
    headerName: "Output Code",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 220,
  },
  {
    field: "isError",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={cx("cellWithStatus", `${params.row.isError}`)}>
          {params.row.isError ? "Error" : "Normal"}
        </div>
      );
    },
  },
];

export const userColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "fullName",
    headerName: "Fullname",
    width: 240,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },

  {
    field: "postion",
    headerName: "Postion",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={cx("cellWithPostion")}>
          {params.row.isAdmin
            ? "Admin"
            : params.row.isManager
            ? "Manager"
            : "Staff"}
        </div>
      );
    },
  },

  {
    field: "addressCode",
    headerName: "Working address code",
    width: 220,
  },
];

export const factoryColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "address",
    headerName: "Address",
    width: 320,
  },

  {
    field: "factoryCode",
    headerName: "Factory Code",
    width: 180,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 230,
  },
];

export const storeColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "address",
    headerName: "Address",
    width: 320,
  },

  {
    field: "storeCode",
    headerName: "Store Code",
    width: 180,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 230,
  },
];

export const warrantyColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "address",
    headerName: "Address",
    width: 320,
  },

  {
    field: "factoryCode",
    headerName: "Factory Code",
    width: 180,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 230,
  },
];

export const warrantyWarehousesColumns = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "productName",
    headerName: "Product Name",
    width: 200,
  },
  {
    field: "productCode",
    headerName: "Product Code",
    width: 120,
  },
  {
    field: "fixing",
    headerName: "Fixing",
    width: 120,
  },
  {
    field: "complete",
    headerName: "Completed ",
    width: 150,
  },
  {
    field: "canNotBeFixed",
    headerName: "Unfixable",
    width: 140,
  },
  {
    field: "warrantyWarehouseCode",
    headerName: "Warehouse Code",
    width: 220,
  },
];

export const statisticalWarrantyColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "productName",
    headerName: "Product Name",
    width: 300,
  },
  {
    field: "productCode",
    headerName: "Product Code",
    width: 140,
  },
  {
    field: "productLine",
    headerName: "Product Line",
    width: 130,
  },
  {
    field: "completeRate",
    headerName: "Complete Rate (%)",
    width: 190,
  },
  {
    field: "errorRate",
    headerName: "Error Rate (%)",
    width: 150,
  },
  {
    field: "warrantyWarehouseCode",
    headerName: "Warehouse Code",
    width: 180,
  },
];

export const statisticalStoreColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "productName",
    headerName: "Product Name",
    width: 280,
  },
  {
    field: "productCode",
    headerName: "Product Code",
    width: 140,
  },
  {
    field: "productLine",
    headerName: "Product Line",
    width: 130,
  },
  {
    field: "salesRate",
    headerName: "Sales Rate (%)",
    width: 150,
  },
  {
    field: "inventory",
    headerName: "Inventory (%)",
    width: 140,
  },
  {
    field: "errorRate",
    headerName: "Error (%)",
    width: 120,
  },
  {
    field: "storeWarehouseCode",
    headerName: "Warehouse",
    width: 120,
  },
];

export const statisticalFatoryColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "productName",
    headerName: "Product Name",
    width: 280,
  },
  {
    field: "productCode",
    headerName: "Product Code",
    width: 140,
  },
  {
    field: "productLine",
    headerName: "Product Line",
    width: 130,
  },
  {
    field: "salesRate",
    headerName: "Sales Rate (%)",
    width: 150,
  },
  {
    field: "inventory",
    headerName: "Inventory (%)",
    width: 140,
  },
  {
    field: "errorRate",
    headerName: "Error (%)",
    width: 120,
  },
  {
    field: "factoryWarehouseCode",
    headerName: "Warehouse",
    width: 120,
  },
];
