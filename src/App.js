import './App.css';
import "./global.css"
import HomePage from './HomePage/HomePage';
import Topbar from "./Topbar/Topbar";

function App() {
  return (
    <div className="app">
      <Topbar />
      <HomePage />
    </div>
  );
}

export default App;
