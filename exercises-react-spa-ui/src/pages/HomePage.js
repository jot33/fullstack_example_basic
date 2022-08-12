import React from 'react';
import ExerciseList from '../components/ExerciseList'
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'

function HomePage({ setExerciseToEdit }) {
    const history = useHistory();

    const [exercises, setExercises] = useState([]);

    const onDelete = async (_id) => {
      if (window.confirm('Are you sure you want to delete?')) {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
          alert('exercise deleted');
          const newExercises = exercises.filter(m => m._id !== _id);
          setExercises(newExercises);
        } else {
          alert('failed to delete due to error')
          console.error(`Failed to delete exercise with _id=${_id}, status code = ${response.status}`);
        }
      } else {
        alert('exercise not deleted');
      }
    };

    const onEdit = exercise => {
      setExerciseToEdit(exercise);
      history.push("/edit-exercise");
    };

    const loadExercises = async () => {
      const response = await fetch('/exercises');
      const data = await response.json();
      setExercises(data);
    }

    useEffect(() => {
      loadExercises();
    }, []);

    return (
      <>
        <h2> List of Exercises</h2>
        <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        <Link to="/add-exercise">Add exercise</Link>
      </>
    );
}

export default HomePage;