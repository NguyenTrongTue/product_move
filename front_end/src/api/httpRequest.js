import axiosClient from "./axiosClient";

export const category = {
  customers: "customers",
  orders: "orders",
  products: "products",
  storeWarehouse: "warehouse",
  invoices: "invoices",
  warrantyInvoice: "warranty_invoice",
  users: "users",
  factories: "factories",
  stores: "stores",
  warranties: "warranties",
  statisticalWarranty: "statistical_warranty",
  statisticalStore: "statistical_store",
};

const httpRequest = {
  getAll: (type) => {
    return axiosClient.get(type);
  },
  getDetail: (type, id) => {
    const url = type + "/" + id;
    return axiosClient.get(url);
  },
  delele: (type, id) => {
    const url = category[type] + "/" + id;
    return axiosClient.delete(url);
  },
  postData: (url, data) => {
    return axiosClient.post(url, data);
  },
  putData: (url, data) => {
    return axiosClient.put(url, data);
  },
  getStoreWarehouse: (url) => {
    return axiosClient.get(url);
  },
  getProductByProductCode: (productCode) => {
    const url = `/products/${productCode}`;
    return axiosClient.get(url);
  },
  getStatistical: (url) => {
    return axiosClient.get(url);
  },
};

export default httpRequest;
