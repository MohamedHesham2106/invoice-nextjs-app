import { Fragment } from "react";
import Invoice from "../components/Invoice/Invoice";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import Head from "next/head";
export default function Home({ data }) {
  return (
    <Fragment>
      <Head>
        <title>Home / Groove </title>
        <meta
          name="description"
          content="invoice management website help you organize your invoices"
        />
      </Head>
      <Invoice data={data} />
    </Fragment>
  );
}
export async function getServerSideProps({ req }) {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
      },
    };
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  const invoices = await prisma.invoice.findMany({
    where: {
      userId: user.id,
    },
  });

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
