import styles from "styles/Profile.module.css";
import Head from "next/head";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Profile = () => {
  return (
    <main className={styles.page}>
      <Head>
        <title>Profile</title>
      </Head>
      <h2>New Home Agency</h2>
      <img src="images/relocation-agency.jpg" alt="" />

      <div className={styles.rating}>
        <h5>Rating 9/10</h5>
        <div>
          <Button size="small" variant="contained" color="primary">
            Message
          </Button>
        </div>
      </div>
      <p>
        We have been in this field for over 15 years. We ourselves himself had
        the bitter experience of moving from abroad without professional help
        when he moved back to Germany in 2000.
      </p>

      <div className="flex">
        <Card className={styles.card}>
          <CardContent>
            <h4>Kindergarten</h4>
            <ul>
              <li>Point 1</li>
              <li>Point 2</li>
              <li>Point 3</li>
              <li>Point 4</li>
            </ul>
            <span className={styles.cost}>Cost: ~1k€</span>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent>
            <h4>Apartment</h4>
            <ul>
              <li>Point 1</li>
              <li>Point 2</li>
              <li>Point 3</li>
              <li>Point 4</li>
            </ul>
            <span className={styles.cost}>Cost: ~1k€</span>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent>
            <h4>Legal Help</h4>
            <ul>
              <li>Point 1</li>
              <li>Point 2</li>
              <li>Point 3</li>
              <li>Point 4</li>
            </ul>
            <span className={styles.cost}>Cost: ~1k€</span>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Profile;
