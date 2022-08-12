// Style import
import './App.css';
// React imports
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Page imports
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
// Component imports
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>

        <header className="App-header">
          <Header/>
        </header>

        <main className="App-main">
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
        </main>
      
        <footer className="App-footer">
          <Footer></Footer>
        </footer>

      </Router>
    </div>
  );
}

export default App;
