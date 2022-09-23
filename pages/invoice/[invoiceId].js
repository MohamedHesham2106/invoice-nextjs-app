import React from "react";
import { PrismaClient } from "@prisma/client";
import InvoiceDetail from "../../components/Invoice/InvoiceDetail/InvoiceDetail";
const InvoiceDetails = ({ data }) => {
  return <InvoiceDetail data={data} />;
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
  const invoices = await prisma.invoice.findMany({
    where: {
      id: invoiceId,
    },
    include: {
      items: true,
    },
  });
  return {
    props: {
      data: invoices.map((invoice) => {
        return {
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
          createdAt: new Date(invoice.createdAt).toLocaleDateString("en-US"),
          paymentDue: new Date(invoice.paymentDue).toLocaleDateString("en-US"),
          items: invoice.items,
          total: invoice.total,
          status: invoice.status,
        };
      }),
    },
    revalidate: 5,
  };
}
export default InvoiceDetails;
