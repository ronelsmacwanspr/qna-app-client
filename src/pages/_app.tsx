import "../styles/globals.css";
import { enableMapSet } from "immer";
import Head from "next/head";
import { RedirectToLoginScreenIfUserAbsent } from "../components/RedirectToLoginScreenIfUserAbsent";
import { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  enableMapSet();
  const token_id =
    typeof window !== "undefined" ? localStorage.getItem("token_id") : null;
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers: {
      authorization: token_id as string,
    },
  });
  return (
    <>
      <Head>
        <meta name="description" content="QnA app demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>QnA App</title>
      </Head>
      <ApolloProvider client={client}>
        <RedirectToLoginScreenIfUserAbsent>
          <Component {...pageProps} />
        </RedirectToLoginScreenIfUserAbsent>
      </ApolloProvider>
    </>
  );
}
