import React from "react";
import { useHistory } from "react-router-dom";
import UnitOptions from "./UnitOption";

function SubmitExercise({exerciseParams, unitOptions}) {
  const history = useHistory();

  <UnitOptions unitOptions={unitOptions}/>

  let unitCheck = false;

  for (let u of unitOptions) {
    if (u === unitOptions.label) {
      unitCheck = true;
    }
  }

  const inputParams = (exerciseParams.name?.constructor === String &&
                        exerciseParams.name > 0 &&
                        exerciseParams.reps?.constructor === Number &&
                        exerciseParams.reps > 0 &&
                        exerciseParams.weight?.constructor === Number && 
                        exerciseParams.weight > 0 &&
                        exerciseParams.unit?.constructor === String &&
                        unitCheck &&
                        exerciseParams.date?.constructor === Date);
  

  const submitExercise = async () => {
    const newExercise = {exerciseParams};
    const response = await fetch('/exercises', { 
      method: 'POST',
      body: JSON.stringify(newExercise),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.status === 201) {
      alert('Successfully submitted the exercise');
      history.push('/');
    } else {
      alert('Failed to submit exercise');
    }
  };

  const invalidInput = () => {
    alert('Invalid input')
  }

  return(
    <button onclick={alert(`${inputParams}`)}></button>
  );
}

export default SubmitExercise;