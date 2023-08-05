import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundBlock/NotFoundBlock.module.scss";

import notFoundImg from "./../assets/img/not_foud_pizza.jpeg";

export default function EmptyCart() {
  return (
    <div className={styles.root}>
      <span className={styles.span}>
        <img src={notFoundImg} alt="sad_pizza_chunk" />
      </span>
      <br />
      <h1>
        <div>Your cart is empty.</div>
      </h1>
      <div className={styles.description}>
        Go to main page to find some super tasty pizzas !
      </div>
      <br />

      <Link to="/" className="button button--outline button--add ">
        I'm hungry
      </Link>
    </div>
  );
}
