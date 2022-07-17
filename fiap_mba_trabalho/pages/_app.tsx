import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserInfoContextProvider from "../src/Store/UserInfo/UserInfoProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserInfoContextProvider>
      <Component {...pageProps} />
    </UserInfoContextProvider>
  );
}

export default MyApp;
