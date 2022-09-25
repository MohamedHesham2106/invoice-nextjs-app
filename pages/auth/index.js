import React, { Fragment } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import Head from "next/head";
const Authentication = () => {
  return (
    <Fragment>
      <Head>
        <title>Log in to Groove / Groove</title>
        <meta
          name="description"
          content="Groove app for managing your invoices and payments"
        />
      </Head>
      <AuthForm />
    </Fragment>
  );
};

export default Authentication;
