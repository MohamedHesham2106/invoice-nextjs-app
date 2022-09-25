import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Invoice app for managing Invoices and payments"
          />
        </Head>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          closeOnClick
          theme="dark"
          pauseOnHover={false}
        />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
