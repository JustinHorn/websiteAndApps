import styles from "styles/Suggestions.module.css";

import Link from "next/Link";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const Suggestions = () => {
  return (
    <main className={styles.page}>
      <div>
        {[1, 2, 3, 4, 5].map(() => (
          <Card className={styles.card}>
            <CardContent>
              <div className={styles.info}>
                <h2>Agency XY</h2>
                <div className={styles.data}>
                  <p>
                    <span>Specialization: </span>
                    <span className={styles.tag}>Kindergarten</span>
                    <span className={styles.tag}>Job</span>
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
        ))}
      </div>
    </main>
  );
};

export default Suggestions;
