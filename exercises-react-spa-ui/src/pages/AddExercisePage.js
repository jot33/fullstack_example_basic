import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UnitOption from '../components/UnitOption';

function AddExercisePage() {
  const history = useHistory();

  const unitOptions = [
    {value: "kg", label: "kg"},
    {value: "lbs", label: "lbs"},
    {value: "miles", label: "miles"},
  ];

  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState(unitOptions[0].value);
  const [date, setDate] = useState('');
  
  

  const addExercise = async () => {
    const newExercise = {name, reps, weight, unit, date};
    console.log({name, reps, weight, unit, date});
    const response = await fetch('/exercises', { 
      method: 'POST',
      body: JSON.stringify(newExercise),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.status === 201) {
      alert('Successfully added the exercise');
      history.push('/');
    } else {
      alert('Failed to add exercise');
    }
  };

  return (
    <div>
      <h2>Add Exercise</h2>
      <form onSubmit={e => e.preventDefault()}>
        <fieldset className='addExerciseForm'>
        <input 
          type="text" 
          placeholder='Enter Name Here'
          value={name}
          onChange={e => setName(e.target.value)} 
          required/>
        <input 
          type="Number" 
          placeholder='Enter Reps Here'
          value={reps}
          onChange={e => setReps(e.target.value)} 
          required/>
        <input 
          type="Number" 
          placeholder='Enter Weight Here'
          value={weight}
          onChange={e => setWeight(e.target.value)} 
          required/>
        <select onChange={e => setUnit(e.target.value)} value={unit}>
          {unitOptions.map((unitOption) => (
            <option value={unitOption.value}>{unitOption.label}</option>
          ))}
        </select>
        <input 
          type="date" 
          placeholder='Enter Date Here'
          value={date}
          onChange={e => setDate(e.target.value)} 
          required/>
        <button onClick={addExercise}>Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddExercisePage;