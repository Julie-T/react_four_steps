import React, { useState } from "react";
import ElemOfChart from "./ElemOfChart";
import { nanoid } from "nanoid";
import '../App.css'

const Steps = () => {
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

    console.log(chart);

    if(chart.includes(elem => elem.date.getTime() === obj.date.getTime())) {
        let unique = chart.find(elem => elem.date === obj.date)
        unique.distance = unique.distance + obj.distance;
        const arrUnique = [...chart];
        arrUnique.sort((a,b) => new Date(b.date) - new Date(a.date));
        setChart(arrUnique);
    } else {
        console.log('---')
        const arr = [...chart, obj];
        arr.sort((a,b) => new Date(b.date) - new Date(a.date));
        setChart(arr);
    }
    
    setDistance('');
    setDate('');
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
    <div className='container'>
      <form
        className="date-diistance-form"
        onSubmit={(e) => handleDateDistanceSubmit(e)}
      >
      <div className='wrapper'>
        <div className='title'>Дата (ДД.ММ.ГГ)</div>
        <input className='date'
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => handleDate(e)}
          maxLength="8"
        />
      </div>
      <div className='wrapper'>
      <div className='title'>Пройдено км</div>
        <input className='distance'
          placeholder="км"
          type="number"
          id="distance"
          name="distance"
          value={distance}
          onChange={(e) => handleDistance(e)}
        />
      </div>
      {/* <div> */}
        <button className='button' 
        onClick={(e) => handleSubmit(e)}>OK</button>
      {/* </div> */}
        
      </form>
      <div>
        <ElemOfChart items={chart} remove={removeElem} edit={editElem} />
      </div>
    </div>
  );
};

export default Steps;
