import classes from "./InvoiceContent.module.css";
import Link from "next/link";
const InvoiceContent = () => {
  return (
    <div className={classes.container}>
      <Link href={`invoice/id`} passRef>
        <div className={classes.item}>
          <div>
            <h5 className={classes.id}>RT59F0</h5>
          </div>
          <div>
            <h6 className={classes.client}>Mohamed Hesham</h6>
          </div>
          <div>
            <p className={classes.date}>29-07-2022</p>
          </div>
          <div>
            <h3 className={classes.total}>$569</h3>
          </div>
          <div>
            <button className="pending_status">pending</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InvoiceContent;
