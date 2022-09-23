import { Fragment } from "react";
import Invoice from "../components/Invoice/Invoice";
import { PrismaClient } from "@prisma/client";
export default function Home({ data }) {
  return (
    <Fragment>
      <Invoice data={data} />
    </Fragment>
  );
}
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const invoices = await prisma.invoice.findMany();

  return {
    props: {
      data: invoices.map((invoice) => {
        return {
          id: invoice.id,
          clientName: invoice.clientName,
          paymentDue: new Date(invoice.paymentDue).toLocaleDateString("en-GB"),
          total: invoice.total,
          status: invoice.status,
        };
      }),
    },
  };
}
