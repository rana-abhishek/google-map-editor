import logo from './logo.svg';
import './App.css';
import MapboxMaps from './componenets/mapbox-maps';
import { useEffect, useState } from 'react';
import { debounce } from "lodash";

function App() {
  const [total, setTotal] = useState([]);
  const [current, setCurrent] = useState(1000);

  useEffect(() => {
    console.log("Render for first time");
    const dataLoad = async () => {
      const data = await fetch(
        "https://traffic.nayan.co/api/maps-details/allAppVio"
      );
      const result = await data.json();
      setTotal([...result,... result]);
    };
    dataLoad();
  }, []);

  return (
    <div className="App">
      <div  style={{position: 'absolute', top: 0, left: 0, zIndex: 1}}>
        <label>Plotted map points: </label>
        <input min={1} max={total.length} onChange={e => +e.target.value === 0 ? 1 : (+e.target.value < total.length ? setCurrent(+e.target.value) : +total.length)} value={current}/>
      </div>
      <div style={{position: 'absolute', top: 0, right: 0, zIndex: 1}}>
        <label>Total map points: </label>
        <input disabled={true} value={total.length}/>
      </div>
      
      <MapboxMaps coordinates={total.splice(0, current)}/>
    </div>
  );
}

export default App;
