import Profile from "~/pages/site/profile/Profile";
import Home from "~/pages/warranty/Home";
import Warehouse from "~/pages/warranty/warehouse/Warehouse";
import Detail from "~/pages/warranty/warranty-invoice/detail/Detail";
import WarrantyInvoice from "~/pages/warranty/warranty-invoice/WarrantyInvoice";
import WarrantyLayout from "../layout/WarrantyLayout/Layout/Layout";

export const warrantyRoutes = [
  {
    path: "/warranty/warehouses",
    component: Warehouse,
    layout: WarrantyLayout,
  },
  {
    path: "/warranty/dashboard",
    component: Home,
    layout: WarrantyLayout,
  },
  {
    path: "/warranty/warranty_invoice",
    component: WarrantyInvoice,
    layout: WarrantyLayout,
  },
  {
    path: "/warranty/warranty_invoice/:id",
    component: Detail,
    layout: WarrantyLayout,
  },
  {
    path: "warranty/profile",
    component: Profile,
    layout: WarrantyLayout,
  },
];
