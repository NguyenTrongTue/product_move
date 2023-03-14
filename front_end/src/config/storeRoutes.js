import StoreLayout from "../layout/StoreLayout/Layout/Layout";
import StoreHome from "../pages/store/home/Home";
import Customers from "~/pages/store/customers/Customers";
import Orders from "~/pages/store/orders/Orders";
import Detail from "~/pages/store/orders/detail/Detail";
import InvoiceDetail from "~/pages/store/warranty-invoice/detail/Detail";
import ProductDetail from "~/pages/store/products/detail/Detail";
import Create from "~/pages/store/orders/create/Create";
import InvoiceCreate from "~/pages/store/warranty-invoice/create/Create";

import Product from "~/pages/store/products/Product";
import Warehouse from "~/pages/store/warehouse/Warehouse";
import WarrantyInvoice from "~/pages/store/warranty-invoice/WarrantyInvoice";
import Profile from "~/pages/site/profile/Profile";

export const storeRoutes = [
  {
    path: "store/dashboard",
    component: StoreHome,
    layout: StoreLayout,
  },
  {
    path: "store/profile",
    component: Profile,
    layout: StoreLayout,
  },
  {
    path: "/store/customers",
    component: Customers,
    layout: StoreLayout,
  },
  {
    path: "/store/orders",
    component: Orders,
    layout: StoreLayout,
  },
  {
    path: "/store/orders/:id",
    component: Detail,
    layout: StoreLayout,
  },
  {
    path: "/store/orders/create",
    component: Create,
    layout: StoreLayout,
  },
  {
    path: "/store/products",
    component: Product,
    layout: StoreLayout,
  },
  {
    path: "/store/products/:id",
    component: ProductDetail,
    layout: StoreLayout,
  },
  {
    path: "/store/warehouses",
    component: Warehouse,
    layout: StoreLayout,
  },
  {
    path: "/store/warranty_invoice",
    component: WarrantyInvoice,
    layout: StoreLayout,
  },
  {
    path: "/store/warranty_invoice/:id",
    component: InvoiceDetail,
    layout: StoreLayout,
  },
  {
    path: "/store/warranty_invoice/create",
    component: InvoiceCreate,
    layout: StoreLayout,
  },
];
