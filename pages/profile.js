import styles from "styles/Profile.module.css";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Profile = () => {
  return (
    <main className={styles.page}>
      <h2>Agency XY</h2>
      <img src="images/heimat.JPG" alt="" />

      <div className={styles.rating}>
        <h5>Rating 9/10</h5>
        <div>
          <Button size="small" variant="contained" color="primary">
            Message
          </Button>
        </div>
      </div>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>

      <div className="flex">
        <Card className={styles.card}>
          <CardContent>
            <h4>Tier 1</h4>
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
            <h4>Tier 2</h4>
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
            <h4>Tier 3</h4>
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
