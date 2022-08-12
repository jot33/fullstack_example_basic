import React from "react";
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit }) {
  return(
    <tr>
      <td key={exercise.name}>{exercise.name}</td>
      <td key={exercise.reps}>{exercise.reps}</td>
      <td key={exercise.weight}>{exercise.weight}</td>
      <td key={exercise.unit}>{exercise.unit}</td>
      <td key={exercise.date}>{exercise.date.substring(0,10)}</td>
      <td key={exercise._id + "edit"} className="clickable"><MdEdit onClick={() => onEdit(exercise)}/></td>
      <td key={exercise._id + "delete"} className="clickable"><MdDeleteForever onClick={ () => onDelete(exercise._id)}/></td>
    </tr>
  );
}

export default Exercise;