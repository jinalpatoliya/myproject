import App from "next/app";
import "../styles/global.scss";

class MyApp extends App {
  static async getInitialProps(ctx) {
    const props = await App.getInitialProps();
    console.log(props);
    return {
      ...props,
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default App;
