import InvoiceContent from "./InvoiceContent";
import InvoiceHeader from "./InvoiceHeader";
const Invoice = () => {
  return (
    <section className="main_container">
      <InvoiceHeader />
      <InvoiceContent />
    </section>
  );
};

export default Invoice;
