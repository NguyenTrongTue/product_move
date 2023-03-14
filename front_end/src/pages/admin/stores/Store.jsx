import classNames from "classnames/bind";
import styles from "./Store.module.scss";
import Datatable from "~/components/datable/Datatable";
import { category } from "~/api/httpRequest";
import { storeColumns } from "~/data/datatablesource";

const cx = classNames.bind(styles);

const Store = () => {
  return (
    <div>
      <Datatable
        columns={storeColumns}
        type={category.stores}
        page="admin"
        linkCreate={"/admin/stores/create"}
      />
    </div>
  );
};

export default Store;
