import "styles/globals.css";
import Head from "next/head";

import Link from "next/link";

//...
import Button from "@material-ui/core/Button";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>HYMT</title>
        <link rel="icon" href="/hymt.webp" />
      </Head>

      <nav>
        <br />
        <div className={"content"}>
          <div>
            <Link href="/">
              <Button size="small" variant="outlined">
                <h1 id="join">Home</h1>
              </Button>
            </Link>
          </div>
          <div id="navbutton">
            <Button size="sm" variant="outlined" color="secondary">
              I am an Agency
            </Button>
          </div>
        </div>
        <br />
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
