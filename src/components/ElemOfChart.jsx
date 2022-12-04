import React from "react";
import PropTypes from "prop-types";

const ElemOfChart = (props) => {
  return (
    <div className="chart">
      {props.items.map((item) => (
        <div key={item.id}>{item.distance + " " + item.date}
        <button onClick={() => props.edit(item.id)}>Edit</button>
        <button onClick={() => props.remove(item.id)}>Remove</button></div>
      ))}
    </div>
  );
};

ElemOfChart.propTypes = {};

export default ElemOfChart;
