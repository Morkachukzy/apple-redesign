import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toaster />
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
