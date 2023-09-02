import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // List of pages to be rendered without layout
  const noLayoutRoutes = ["/login", "/", "/signup"];

  // Check if current page is in the list of no layout pages
  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);

  return (
    <>
      {isNoLayoutRoute ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default MyApp;
