import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useEffect, useState } from "react";

import { geolocated } from "react-geolocated";

function Home(props) {
  const [name, setName] = useState("");

  const [weather, setWeather] = useState(undefined);
  useEffect(() => {
    if (props.coords) {
      const { latitude, longitude } = props.coords;

      console.log(latitude);
      console.log(longitude);

      fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setName(res.name);
          setWeather(res.main.feels_like + " °C");
        });
    }
  }, [props.coords]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hi</h1>
      <p>You are at: {name}</p>
      <p>Your weather feels like: {weather}</p>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Home);
