import classes from "./InvoiceHeader.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
const InvoiceHeader = () => {
  const router = useRouter();

  const navigate = () => {
    router.push("/add-new");
  };
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <h3>Invoice</h3>
        <p>There are total 7 invoices</p>
      </div>
      <button className="btn" onClick={navigate}>
        Add New
      </button>
    </div>
  );
};

export default InvoiceHeader;
