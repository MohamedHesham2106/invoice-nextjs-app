import classes from "./InvoiceContent.module.css";
import Link from "next/link";

const InvoiceContent = ({ data }) => {
  return (
    <div className={classes.container}>
      {data.map((invoice, i) => (
        <Link href={`invoice/${invoice.id}`} passRef key={invoice.id}>
          <div className={classes.item}>
            <div>
              <h5 className={classes.id}>#{i + 1}</h5>
            </div>
            <div>
              <h6 className={classes.client}>{invoice.clientName}</h6>
            </div>
            <div>
              <p className={classes.date}>{invoice.paymentDue}</p>
            </div>
            <div>
              <h3 className={classes.total}>${invoice.total}</h3>
            </div>
            <div>
              <button className={`${invoice.status}_status`}>
                {invoice.status}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default InvoiceContent;
