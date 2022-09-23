import classes from "./InvoiceDetail.module.css";
import { useRouter } from "next/router";
import InvoiceItem from "./InvoiceItem";
const InvoiceDetail = (props) => {
  const router = useRouter();
  const data = props.data[0];
  console.log(data);
  const goBack = () => router.push("/");

  return (
    <section className="main_container">
      <div className={classes["back_btn"]}>
        <h6 onClick={goBack}>Go Back</h6>
      </div>
      <div className={classes["details_header"]}>
        <div className={classes["details_status"]}>
          <p>Status</p>
          <button
            className={`${
              data.status === "paid"
                ? "paid_status"
                : data.status === "pending"
                ? "pending_status"
                : "draft_status"
            }`}
          >
            {data.status}
          </button>
        </div>
        <div className={classes["details_btn"]}>
          <button
            className="edit_btn"
            onClick={() => router.push(`/edit/${data.id}`)}
          >
            Edit
          </button>
          <button className="delete_btn">Delete</button>
          <button className="mark_as-btn">Mark as Paid</button>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.box}>
          <div>
            <h4>{data.id.substr(0, 6).toUpperCase()}</h4>
            <p>{data.description}</p>
          </div>
          <div>
            <p>{data.senderStreet}</p>
            <p>{data.senderCity}</p>
            <p>{data.senderPostalCode}</p>
            <p>{data.senderCountry}</p>
          </div>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.box}>
          <div>
            <div className={classes.date}>
              <p>Invoice Date</p>
              <h4>{data.createdAt}</h4>
            </div>
            <div>
              <p className={classes.payment}>Payment Due</p>
              <h4>{data.paymentDue}</h4>
            </div>
          </div>
          <div className={classes.client}>
            <p>Bill to</p>
            <h4>{data.clientName}</h4>
            <div>
              <p>{data.clientStreet}</p>
              <p>{data.clientCity}</p>
              <p>{data.clientPostalCode}</p>
              <p>{data.clientCountry}</p>
            </div>
          </div>
          <div>
            <p>Send to</p>
            <h4>{data.clientEmail}</h4>
          </div>
        </div>

        <InvoiceItem items={data.items} />

        <div className={classes.total}>
          <h5>Total</h5>
          <h2>${data.total}</h2>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetail;
