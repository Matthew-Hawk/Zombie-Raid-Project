import "./App.scss"
import Catagories from "./Components/Catagories/Catagories"

function App() {


  return (
    <div className="app">
     <h1 className="app__t">Z-Run</h1>
     <h2 className="app__ht">How to play</h2>
     <h3 className="app__hh">Hello, and welcome to Z-Run! the way this works is very simple, you chose 1 option from each column and press the run-it button at the end to see if you made it out alive. Seems easy enough? Then prove it! </h3>
    <Catagories />
    </div>
  );
}

export default App;
