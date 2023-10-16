import React from "react";
import logo from "../assets/logo.png";

export default function OptionSelection({ arrayItems, selectOption }) {
  return (
    <>
      <img className="logo-image" src={logo} alt="logo CV Katalis Indonesia" />
      <h1 className="heading">ChatGPT CV Katalis Indonesia</h1>
      <div className="grid-main">
        {arrayItems.map((item) => {
          return (
            <div
              className="grid-child"
              onClick={() => selectOption(item.option)}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
