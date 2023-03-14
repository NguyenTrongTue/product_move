import Product from "~/pages/factory/products/Product";
import Home from "~/pages/factory/Home";
import Warehouse from "~/pages/factory/warehouse/Warehouse";

import FactoryLayout from "../layout/FactoryLayout/Layout/Layout";
import Invoice from "~/pages/factory/invoice/Invoice";
import Create from "~/pages/factory/invoice/create/Create";
import Detail from "~/pages/factory/products/detail/Detail";
import Profile from "~/pages/site/profile/Profile";

export const factoryRoutes = [
  {
    path: "/factory/profile",
    component: Profile,
    layout: FactoryLayout,
  },
  {
    path: "/factory/warehouses",
    component: Warehouse,
    layout: FactoryLayout,
  },
  {
    path: "/factory/dashboard",
    component: Home,
    layout: FactoryLayout,
  },
  {
    path: "/factory/products",
    component: Product,
    layout: FactoryLayout,
  },
  {
    path: "/factory/products/:id",
    component: Detail,
    layout: FactoryLayout,
  },
  {
    path: "/factory/invoices",
    component: Invoice,
    layout: FactoryLayout,
  },
  {
    path: "/factory/invoices/create",
    component: Create,
    layout: FactoryLayout,
  },
];
