import logo from './logo.svg';
import './App.css';
import Map from './components/Map.jsx';
import EditMap from './components/EditMap.jsx'
import Navbar from './components/Navbar.jsx'
import AuthPage from './components/AuthPage.jsx'
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const App = () => {

  let fatherKey = useSelector((state) => state.reducer.fatherKey, shallowEqual);
  console.log("fatherKey app", fatherKey);

  return (
    <div className="App">
      {/* <header className="App-header">
        Hi
      </header> */}
      {!fatherKey ? (
        <Routes>
        <Route path="auth" element={<AuthPage />} />
      </Routes>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="map" element={<Map fatherKey={fatherKey} />} />
            <Route path="editmap" element={<EditMap />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;