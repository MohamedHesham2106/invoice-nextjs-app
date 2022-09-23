import classes from "./InvoiceHeader.module.css";
import { useRouter } from "next/router";
const InvoiceHeader = ({ length }) => {
  const router = useRouter();

  const navigate = () => {
    router.push("/add-new");
  };
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <h3>Invoice</h3>
        <p>There are total {length} invoices</p>
      </div>
      <button className="btn" onClick={navigate}>
        Add New
      </button>
    </div>
  );
};

export default InvoiceHeader;
