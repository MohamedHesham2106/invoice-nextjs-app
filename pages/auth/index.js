import React, { Fragment } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import Head from "next/head";
const Authentication = () => {
  return (
    <Fragment>
      <Head>
        <title>Log in to White Clover / White Clover</title>
        <meta
          name="description"
          content="White Clover social media app for posting"
        />
      </Head>
      <AuthForm />
    </Fragment>
  );
};

export default Authentication;
