import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

function EditExercisePage({exerciseToEdit}) {
  const history = useHistory();

  const unitOptions = [
    {value: "kg", label: "kg"},
    {value: "lbs", label: "lbs"},
    {value: "miles", label: "miles"},
  ];

  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const editExercise = async () => {
    const editedExercise = {name, reps, weight, unit, date};
    const response = await fetch(`/exercises/${exerciseToEdit._id}`, { 
      method: 'PUT',
      body: JSON.stringify(editedExercise),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.status === 200) {
      alert('Successfully edited the exercise');
      history.push('/');
    } else {
      alert('Failed to edit exercise');
    }
  };

  return (
    <div>
      <h2>Edit Exercise</h2>
      <form onSubmit={e => e.preventDefault()}>
        <fieldset className='editExerciseForm'>
          <input 
            type="text"
            value={name}
            onChange={e => setName(e.target.value)} 
            required/>
          <input 
            type="Number"
            value={reps}
            onChange={e => setReps(e.target.value)} 
            required/>
          <input 
            type="Number"
            value={weight}
            onChange={e => setWeight(e.target.value)} 
            required/>
          <select value={unit} onChange={e => setUnit(e.target.value)}>
            {unitOptions.map((unitOption) => (
              <option value={unitOption.value}>{unitOption.label}</option>
            ))}
          </select>
          <input 
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)} 
            required/>
          <button onClick={editExercise}>Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default EditExercisePage;