import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";

import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.center}>
      <div className={styles.intro}>
        <div className={styles.img4x4grid}>
          <img src="images/curiosity.webp" />
          <img src="images/trust.webp" />
          <img src="images/education.webp" />
          <img src="images/help.webp" />
        </div>
        <aside>
          <h3 className="spaced">
            You are ready for your individual relocation adventure? <br />
            Nice to meet you!
          </h3>
          <span className="main">
            <p>
              HYMT is your trusted partner for relocation and immigration
              services in Germany.
            </p>
            <p>
              As a service and booking platform, we will accompany you from the
              very beginning to ensure that you arrive safely and satisfied. In
              addition, we offer you a wealth of articles, tutorials, guides and
              other valuable information for your relocation.
            </p>
            <p>
              You need professional support on site? With HYMT you will find
              exactly the right relocation agency in your city and can move into
              your new home without any worries.
            </p>
          </span>
          <h4 className="footer">​HYMT - Simply coming home.</h4>
        </aside>
      </div>
      <Link href="/form">
        <Button variant="contained" color="primary">
          I want to relocate
        </Button>
      </Link>
    </main>
  );
}
