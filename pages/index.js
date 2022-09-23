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
          createdAt: new Date(invoice.createdAt).toLocaleDateString("en-US"),
          total: invoice.total,
          status: invoice.status,
        };
      }),
    },
  };
}
