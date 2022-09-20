import classes from "./InvoiceDetail.module.css";
import { useRouter } from "next/router";
import InvoiceItem from "./InvoiceItem";
const InvoiceDetail = () => {
  const router = useRouter();

  const goBack = () => router.push("/");

  return (
    <section className="main_container">
      <div className={classes["back_btn"]}>
        <h6 onClick={goBack}>Go Back</h6>
      </div>
      <div className={classes["details_header"]}>
        <div className={classes["details_status"]}>
          <p>Status</p>
          <button className="pending_status">pending</button>
        </div>
        <div className={classes["details_btn"]}>
          <button className="edit_btn">Edit</button>
          <button className="delete_btn">Delete</button>
          <button className="mark_as-btn">Mark as Paid</button>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.box}>
          <div>
            <h4>RT580G</h4>
            <p>Re-branding</p>
          </div>
          <div>
            <p>Block -B , Road - Yasmeen</p>
            <p>Alexandria</p>
            <p>SYL 3108</p>
            <p>Egypt</p>
          </div>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.box}>
          <div>
            <div className={classes.date}>
              <p>Invoice Date</p>
              <h4>29-07-2022</h4>
            </div>
            <div>
              <p className={classes.payment}>Payment Due</p>
              <h4>29-07-2022</h4>
            </div>
          </div>
          <div className={classes.client}>
            <p>Bill to</p>
            <h4>Mohamed Hesham</h4>
            <div>
              <p>Block -B , Road - Yasmeen</p>
              <p>Alexandria</p>
              <p>SYL 3108</p>
              <p>Egypt</p>
            </div>
          </div>
          <div>
            <p>Send to</p>
            <h4>Mohamed@gmail.com</h4>
          </div>
        </div>
        <InvoiceItem />

        {/* Total of all list items */}
        <div className={classes.total}>
          <h5>Total</h5>
          <h2>$500</h2>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetail;
