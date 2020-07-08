import App from "next/app";
import Head from "next/head";
import { getTokeAndCheckIsExpired, removeToken } from "../util/auth";
import { Router } from "next/router";
import { configureServerURLToAxios } from "../util/axios";
configureServerURLToAxios();

class MyApp extends App {
  static async getInitialProps(ctx) {
    const appProps = await App.getInitialProps(ctx);
    const isExpired = getTokeAndCheckIsExpired(ctx.req);
    if (isExpired) {
      // TODO: Remove cookies
      removeToken(ctx.req);
      if (ctx.res) res.redirect("/login");
      else Router.push("/login");
    }
    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.3.1/tinymce.min.js"
            type="text/javascript"
          ></script>
          <script
            type="text/javascript"
            id="MathJax-script"
            async
            src="https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-chtml.js"
          ></script>
        </Head>
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    );
  }
}
export default MyApp;
