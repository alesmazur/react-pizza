import React, { useState } from "react";

export default function Categories({ value, onClickCategory }) {
  const categories = ["All", "Vegie", "Meat", "Cheese", "Greece", "Spicy"];
  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => {
          return (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={value == i ? "active" : null}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
