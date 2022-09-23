import InvoiceContent from "./InvoiceContent";
import InvoiceHeader from "./InvoiceHeader";
const Invoice = ({ data }) => {
  return (
    <section className="main_container">
      <InvoiceHeader length={data.length} />
      <InvoiceContent data={data} />
    </section>
  );
};

export default Invoice;
