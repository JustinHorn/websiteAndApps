import styles from "styles/Suggestions.module.css";
import Head from "next/head";

import Link from "next/link";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const Suggestions = () => {
  return (
    <main className={styles.page}>
      <Head>
        <title>Suggestions</title>
      </Head>
      <div>
        <Card className={styles.card}>
          <CardContent>
            <div className={styles.info}>
              <h2>New Home Agency</h2>
              <div className={styles.data}>
                <p>
                  <span>Specialization: </span>
                  <span className={styles.tag}>Kindergarten</span>
                  <span className={styles.tag}>Apartment</span>
                  <span className={styles.tag}>Legal Help</span>
                </p>

                <span className={styles.cost}>Cost: ~1k€</span>
              </div>

              <h5>Rated 9/10</h5>
            </div>
            <div className={styles.cardbuttons}>
              <Button size="small" variant="outlined" color="primary">
                Reviews
              </Button>
              <Link href="/profile">
                <Button size="small" variant="contained" color="primary">
                  Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent>
            <div className={styles.info}>
              <h2>Path Next Agency</h2>
              <div className={styles.data}>
                <p>
                  <span>Specialization: </span>
                  <span className={styles.tag}>Kindergarten</span>
                  <span className={styles.tag}>Admission</span>
                </p>

                <span className={styles.cost}>Cost: ~2k€</span>
              </div>

              <h5>Rated 8/10</h5>
            </div>
            <div className={styles.cardbuttons}>
              <Button size="small" variant="outlined" color="primary">
                Reviews
              </Button>
              <Link href="/profile">
                <Button size="small" variant="contained" color="primary">
                  Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        {[3, 4, 5].map((value) => (
          <Card className={styles.card} key={value}>
            <CardContent>
              <div className={styles.info}>
                <h2>The Relocation Agency</h2>
                <div className={styles.data}>
                  <p>
                    <span>Specialization: </span>
                    <span className={styles.tag}>None</span>
                  </p>

                  <span className={styles.cost}>Cost: ~0.75k€</span>
                </div>

                <h5>Rated 7/10</h5>
              </div>
              <div className={styles.cardbuttons}>
                <Button size="small" variant="outlined" color="primary">
                  Reviews
                </Button>
                <Link href="/profile">
                  <Button size="small" variant="contained" color="primary">
                    Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Suggestions;
