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
    const currentObject = chart.find(item => item.date.getTime() === obj.date.getTime())
    console.log(currentObject)
    if(chart.includes(currentObject)) {
        console.log("wow")
        const arrUnique = [...chart];
        arrUnique.map(item => {
            if (item.date.getTime() === obj.date.getTime()) {
                item.distance = Number(item.distance) + Number(obj.distance)
            }
            // return item
        })
        arrUnique.sort((a,b) => new Date(b.date) - new Date(a.date));
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
        className="date-distance-form"
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
      <div className='wrapper-button'>
        <div className='title'></div>
        <button className='button' 
        onClick={(e) => handleSubmit(e)}>OK</button>
      </div>
      </form>
      <div>
      <div className='title-chart'>
        <div className='title'>Дата (ДД.ММ.ГГ)</div>
        <div className='title'>Пройдено км</div>
        <div className='title'>Действия</div>
      </div>
        <ElemOfChart items={chart} remove={removeElem} edit={editElem} />
      </div>
    </div>
  );
};

export default Steps;
