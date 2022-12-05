import React from "react";
import PropTypes from "prop-types";
import '../App.css'

const ElemOfChart = (props) => {
    
  return (
    <div className="chart">
    <div>
      {props.items.map((item) => (
        <div className='elem-of-chart' key={item.id}>
        <div className='date'>
        {item.date.getDate() + "." + 
        (item.date.getMonth() + 1) + "." + 
        item.date.getFullYear().toString().slice(2)}</div>
        <div className='distance'>{item.distance}</div>
        <button className='btn-edit' onClick={() => props.edit(item.id)}>Edit</button>
        <button className='btn-rmv' onClick={() => props.remove(item.id)}>Remove</button></div>
      ))}
    </div>
    </div>
  );
};

ElemOfChart.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        distance: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]), 
        date: PropTypes.object, 
        id: PropTypes.string, 
        inputDate: PropTypes.string
    })),
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
};

export default ElemOfChart;
