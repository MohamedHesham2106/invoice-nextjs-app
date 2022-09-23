
import EditInvoice from "../../components/Invoice/NewInvoice/EditInvoice";
import { PrismaClient } from "@prisma/client";
const Edit = ({ data }) => {
  return (
    <div className="main_container">
      <EditInvoice data={data} />
    </div>
  );
};
export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const invoices = await prisma.invoice.findMany();
  return {
    fallback: "blocking",
    paths: invoices.map((invoice) => ({
      params: {
        invoiceId: invoice.id,
      },
    })),
  };
}
export async function getStaticProps({ params }) {
  const { invoiceId } = params;
  const prisma = new PrismaClient();
  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId },
    include: {
      items: true,
    },
  });
  return {
    props: {
      data: {
        id: invoice.id,
        senderStreet: invoice.senderStreet,
        senderCity: invoice.senderCity,
        senderPostalCode: invoice.senderPostalCode,
        senderCountry: invoice.senderCountry,
        clientStreet: invoice.clientStreet,
        clientCity: invoice.clientCity,
        clientPostalCode: invoice.clientPostalCode,
        clientCountry: invoice.senderCountry,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        description: invoice.description,
        paymentDue: new Date(invoice.paymentDue).toLocaleDateString("en-US"),
        items: invoice.items,
        total: invoice.total,
        status: invoice.status,
        paymentTerms: invoice.paymentTerms,
      },
    },
    revalidate: 5,
  };
}
export default Edit;
