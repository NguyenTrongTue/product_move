import classNames from "classnames/bind";
import styles from "./Warranty.module.scss";
import Datatable from "~/components/datable/Datatable";
import { category } from "~/api/httpRequest";
import { storeColumns } from "~/data/datatablesource";

const cx = classNames.bind(styles);

const Warranty = () => {
  return (
    <div>
      <Datatable
        columns={storeColumns}
        type={category.warranties}
        page="admin"
        linkCreate={"/admin/warranties/create"}
      />
    </div>
  );
};

export default Warranty;
