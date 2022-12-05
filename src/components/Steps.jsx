import React, { useState } from "react";
import PropTypes from "prop-types";
import ElemOfChart from "./ElemOfChart";
import { nanoid } from "nanoid";

const Steps = (props) => {
  const [chart, setChart] = useState([]);
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  const handleDateDistanceSubmit = (e) => {
    e.preventDefault();
  };

  const handleDate = (dateInput) => {
    const valueOfInput = dateInput.target.value;
    setDate(valueOfInput);
  };

  const handleDistance = (distanceInput) => {
    const valueOfInput = distanceInput.target.value;
    setDistance(valueOfInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      distance: distance,
      date: new Date(date),
      id: nanoid(),
      inputDate: date
    };
    const arr = [...chart, obj];
    arr.sort((a,b) => new Date(b.date) - new Date(a.date));
    setChart(arr);
    setDistance('');
    setDate('');
    console.log(chart);
  };

  const removeElem = (id) => {
    setChart(chart.filter((elem) => elem.id !== id));
  };

  const editElem = (id) => {
    const editObj = chart.find(elem => elem.id === id);
    setDate(editObj.inputDate)
    setDistance(editObj.distance)
    setChart(chart.filter((elem) => elem.id !== id));
  };

  return (
    <div>
      <form
        className="date-diistance-form"
        onSubmit={(e) => handleDateDistanceSubmit(e)}
      >
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => handleDate(e)}
          maxLength="8"
        />
        <input
          placeholder="км"
          type="number"
          id="distance"
          name="distance"
          value={distance}
          onChange={(e) => handleDistance(e)}
        />
        <button onClick={(e) => handleSubmit(e)}>OK</button>
      </form>
      <ElemOfChart items={chart} remove={removeElem} edit={editElem} />
    </div>
  );
};

Steps.propTypes = {};

export default Steps;
