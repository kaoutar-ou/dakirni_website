import logo from './logo.svg';
import './App.css';
import Map from './components/Map.jsx';
import EditMap from './components/EditMap.jsx'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        Hi
      </header> */}
      <Navbar />
      <Routes>
        <Route path="map" element={<Map />} />
        <Route path="editmap" element={<EditMap />} />
      </Routes>

    </div>
  );
}

export default App;