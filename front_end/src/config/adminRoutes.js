import AdminHome from "~/pages/admin/home/AdminHome";
import Create from "~/pages/admin/user/create/Create";
import CreateProduct from "~/pages/admin/products/create/Create";
import CreateFactory from "~/pages/admin/factorys/create/Create";
import CreateStore from "~/pages/admin/stores/create/Create";
import CreateWarranty from "~/pages/admin/warranties/create/Create";
import Detail from "~/pages/admin/user/detail/Detail";
import ProductDetail from "~/pages/admin/products/detail/Detail";
import Users from "~/pages/admin/user/Users";
import AdminLayout from "~/layout/AdminLayout/Layout/Layout";
import Product from "~/pages/admin/products/Product";
import Factory from "~/pages/admin/factorys/Factory";
import Store from "~/pages/admin/stores/Store";
import Warranty from "~/pages/admin/warranties/Warranty";
import Home from "~/pages/admin/home/statistical/store/Home";
import FactoryHome from "~/pages/admin/home/statistical/factory/Home";
import WarrantyHome from "~/pages/admin/home/statistical/warranty/Home";
import Profile from "~/pages/site/profile/Profile";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: AdminHome,
    layout: AdminLayout,
  },
  {
    path: "/admin/dashboard/statistical/store",
    component: Home,
    layout: AdminLayout,
  },
  {
    path: "/admin/dashboard/statistical/factory",
    component: FactoryHome,
    layout: AdminLayout,
  },
  {
    path: "/admin/dashboard/statistical/warranty",
    component: WarrantyHome,
    layout: AdminLayout,
  },
  {
    path: "/admin/users",
    component: Users,
    layout: AdminLayout,
  },
  {
    path: "/admin/users/:id",
    component: Detail,
    layout: AdminLayout,
  },
  {
    path: "/admin/users/create",
    component: Create,
    layout: AdminLayout,
  },
  {
    path: "/admin/products",
    component: Product,
    layout: AdminLayout,
  },
  {
    path: "/admin/products/:id",
    component: ProductDetail,
    layout: AdminLayout,
  },
  {
    path: "/admin/products/create",
    component: CreateProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/factories",
    component: Factory,
    layout: AdminLayout,
  },
  {
    path: "/admin/factories/create",
    component: CreateFactory,
    layout: AdminLayout,
  },
  {
    path: "/admin/stores",
    component: Store,
    layout: AdminLayout,
  },
  {
    path: "/admin/stores/create",
    component: CreateStore,
    layout: AdminLayout,
  },
  {
    path: "/admin/warranties",
    component: Warranty,
    layout: AdminLayout,
  },
  {
    path: "/admin/warranties/create",
    component: CreateWarranty,
    layout: AdminLayout,
  },
  {
    path: "/admin/profile",
    component: Profile,
    layout: AdminLayout,
  },
];
