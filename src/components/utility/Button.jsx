import React from "react";

const Button = (props) => {
  return (
    <div className={`${props.buttonClass} button`}>
      <button onClick={props.buttonAction}>
        {props.logo && <img src={`./${props.logo}`} alt="" />}
        {props.children}
      </button>
    </div>
  );
};

export default Button;
