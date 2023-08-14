import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  // const items = useSelector((state) => state.pizza.items);

  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);
  //numbers of skeletons
  const skeletonArray = [...new Array(4)];
  //skeleton handle
  const [isLoading, setIsLoading] = useState(true);
  //pizzas from server
  const [items, setItems] = useState([]);

  //RTK for filtering pizzas
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // pages states for pagination
  // const [currentPage, setCurrentPage] = useState(1);

  // back end pizzas filtering
  const search = searchValue ? ` &search = ${searchValue}` : "";

  {
    /*pizzas filtering on front end , 
  but we also can make  filtering on back end,*/
  }
  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((props) => <PizzaBlock key={props.id} {...props} />);
  const skeletons = skeletonArray.map((el, ind) => <Skeleton key={ind} />);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://64649b2d043c103502bdc4e9.mockapi.io/api/pizza/items?page=${currentPage}&limit=4&category=${
          categoryId == 0 ? "" : categoryId
        }&sortby=${sortType.sortProperty}&order=desc&${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        console.warn(err.message.toUpper);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });
    // navigate(`${queryString}`);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
