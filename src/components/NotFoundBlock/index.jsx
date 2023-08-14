import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundBlock.module.scss";
import notFoundImg from "../../assets/img/not_foud_pizza.jpeg";

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <span className={styles.span}>
        <img src={notFoundImg} alt="sad_pizza_chunk" />
      </span>
      <br />
      <h1>
        <div>Page not Found.</div>
      </h1>
      <div className={styles.description}>
        Unfortunately the page you are requesting does not exist!
      </div>
      <br />

      <Link to="/home" className="button button--outline button--add ">
        Main Page
      </Link>
    </div>
  );
}
