import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <>
    <NoteState>
        <Router>
              <Navbar/>
              <Routes>
                  
                  <Route path="/" 
                      element={<Home/>} >
                  </Route>  

                  <Route exact path="/about" 
                      element={<About/>} >
                  </Route>  

              </Routes>
        </Router>
    </NoteState>
    </>
  );
}

export default App;
