import { PrismaClient } from "@prisma/client";
import InvoiceDetail from "../../components/Invoice/InvoiceDetail/InvoiceDetail";
import { getSession } from "next-auth/react";
import { Fragment } from "react";
import Head from "next/head";

const InvoiceDetails = ({ data }) => {
  return (
    <Fragment>
      <Head>
        <title>Invoice #{data.id.substr(0, 6).toUpperCase()} / Groove</title>
        <meta name="description" content={data.description} />
      </Head>
      <InvoiceDetail data={data} />
    </Fragment>
  );
};
export async function getServerSideProps({ req, params }) {
  const prisma = new PrismaClient();
  const { invoiceId } = params;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });
  const invoices = await prisma.invoice.findFirst({
    where: {
      userId: user.id,
      id: invoiceId,
    },
    include: {
      items: true,
    },
  });
  if (!invoices) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: {
        id: invoices.id,
        senderStreet: invoices.senderStreet,
        senderCity: invoices.senderCity,
        senderPostalCode: invoices.senderPostalCode,
        senderCountry: invoices.senderCountry,
        clientStreet: invoices.clientStreet,
        clientCity: invoices.clientCity,
        clientPostalCode: invoices.clientPostalCode,
        clientCountry: invoices.senderCountry,
        clientName: invoices.clientName,
        clientEmail: invoices.clientEmail,
        description: invoices.description,
        createdAt: new Date(invoices.createdAt).toLocaleDateString("en-GB"),
        paymentDue: new Date(invoices.paymentDue).toLocaleDateString("en-GB"),
        items: invoices.items,
        total: invoices.total,
        status: invoices.status,
      },
    },
  };
}
export default InvoiceDetails;
