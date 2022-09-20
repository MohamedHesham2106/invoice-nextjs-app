import classes from "./Invoice.module.css";
import InvoiceContent from "./InvoiceContent";
import InvoiceHeader from "./InvoiceHeader";
const Invoice = () => {
  return (
    <section className={classes.container}>
      <InvoiceHeader />
      <InvoiceContent />
    </section>
  );
};

export default Invoice;
