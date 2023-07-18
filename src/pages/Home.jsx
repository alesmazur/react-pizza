import React, { useState, useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

export default function Home({ searchValue }) {
  //numbers of skeletons
  const skeletonArray = [...new Array(8)];
  //skeleton handle
  const [isLoading, setIsLoading] = useState(true);
  //pizzas from server
  const [items, setItems] = useState([]);
  // STATES OF CHILDS
  //active category state
  const [categoryId, setCategoryId] = useState(0);
  //active sort state
  const [sortType, setSortType] = useState({
    name: "popular",
    sortProperty: "rating",
  });

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((props) => <PizzaBlock key={props.id} {...props} />);
  const skeletons = skeletonArray.map((el, ind) => <Skeleton key={ind} />);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://64649b2d043c103502bdc4e9.mockapi.io/api/pizza/items?category=${
        categoryId == 0 ? "" : categoryId
      }&sortby=${sortType.sortProperty}&order=desc`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
}
