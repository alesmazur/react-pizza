import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";
import { useTransition, animated, config } from "react-spring";

export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = React.useRef();

  const [visible, setVisible] = useState(false);
  const transition = useTransition(visible, {
    from: { opacity: 0, y: -30, z: -100 },
    enter: { opacity: 1, y: 0, z: 10 },
    leave: { opacity: 0, y: -50 },
    config: {
      duration: 200,
    },
  });
  // list of items in the sort menu bar
  const list = [
    { name: "popular (DESC)", sortProperty: "rating" },
    { name: "popular (ASC)", sortProperty: "-rating" },
    { name: "price (DESC)", sortProperty: "price" },
    { name: "price (ASC)", sortProperty: "-price" },
    { name: "name (DESC)", sortProperty: "title" },
    { name: "name (ASC)", sortProperty: "-title" },
  ];

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setVisible(false);
  };
  // poup auto-closing implementation after clicking outside the popup
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      !event.target.closest(".sort") && setVisible(false);
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setVisible(!visible)} className="sort__label">
        <svg
          className={visible ? "reverse" : "sort-svg"}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span> {sort.name}</span>
      </div>
      {transition((style, item) => {
        return item ? (
          <animated.div style={style} className="sort__popup">
            <ul>
              {list.map((obj, i) => (
                <li
                  key={i}
                  onClick={() => onClickListItem(obj)}
                  className={
                    sort.sortProperty == obj.sortProperty ? "active" : null
                  }
                >
                  {obj.name}
                </li>
              ))}
            </ul>
          </animated.div>
        ) : null;
      })}
      {/* {visible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty == obj.sortProperty ? "active" : null
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
