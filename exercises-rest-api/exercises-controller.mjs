import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller ******************************************
app.post ('/exercises', (req,res) => { 
    exercises.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight, 
        req.body.unit, 
        req.body.date
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Invalid input data' });
        });
});


// RETRIEVE controller ****************************************************
// GET exercises by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Exercise not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// GET exercises filtered by reps or unit
app.get('/exercises', (req, res) => {
    let filter = {};

    // filter by reps
    if(req.query.reps !== undefined){
        filter = { reps: req.query.reps };
    }
    // filter by unit
    if(req.query.unit !== undefined){
        filter = { unit: req.query.unit };
    }
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Invalid request' });
        });
});

// UPDATE controller ************************************
app.put('/validate/', (req, res) => {
    const result = exercises.validateExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight, 
        req.body.unit, 
        req.body.date
    )
    res.json(result);
});

app.put('/exercises/:_id', (req, res) => {
    const result = exercises.replaceExercise(
        req.params._id, 
        req.body.name, 
        req.body.reps, 
        req.body.weight, 
        req.body.unit, 
        req.body.date
    )
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({ 
                _id: req.params._id, 
                name: req.body.name,
                reps: req.body.reps,
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: `${error}` });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});