import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as Services from "../services/index.js"


const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({ center, zoom, forms }) {

  const colors = ["#6FFF63","#FFD263","#FF0000"];
  const ref = useRef();

  // let danger = 0;

  // let forms = [[{}]];

  

  useEffect(() => {
    
   
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom
    });

    if(forms !== undefined && forms[0] !== undefined && forms[0][0] !== undefined) {

    // console.log("forms[0]");
    // console.log("forms[0][0]",forms[0]);
    // console.log(forms[1]);
    // console.log(forms[2]);
    

    const greenZoneCoords = forms[0];
  
    const yellowZoneCoords = forms[1];

    const redZoneCoords = forms[2];

    // Construct the polygon.
    const greenZone = new window.google.maps.Polygon({
      paths: greenZoneCoords,
      strokeColor: colors[0],
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: colors[0],
      fillOpacity: 0.35,
    });
    

    const yellowZone = new window.google.maps.Polygon({
      paths: yellowZoneCoords,
      strokeColor: colors[1],
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: colors[1],
      fillOpacity: 0.25,
    });
    

    const redZone = new window.google.maps.Polygon({
      paths: redZoneCoords,
      strokeColor: colors[2],
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: colors[2],
      fillOpacity: 0.15,
    });

    
    redZone.setMap(map);
    yellowZone.setMap(map);
    greenZone.setMap(map);
  }
  }, [forms]);

  return (
    <div
      style={{
        height: "90vh"
      }}
      ref={ref}
      id="map"
    />
  );
}

const Map = () => {
  let res = [];
  useEffect(() => {
    res = Services.getSafeZone();
  }, []);

  let navigate = useNavigate();
  // const res = Services.getSafeZone();
  const center = { lat: 31.643478, lng: -8.021075 };
  const zoom = 17;
  // const [coords, setCoords] = useState([]);
  // const [forms, setForms] = useState([]);
  // let points = [];
  // console.log("c=>", coords);
  const forms = useSelector((state) => state.reducer.safezone, shallowEqual);
  
  console.log("forms map", forms);

  return (
    <Wrapper
      libraries={["drawing"]}
      apiKey="AIzaSyCN82KTDRpdaR26H_5rbft3kaB9N73vEvU"
      render={render}
    >
      
      <MyMapComponent
        // onPolygon={(polygonCoordinates) => {
        //   console.log("onPolygon", polygonCoordinates);
        //   setCoords([coords, polygonCoordinates]);
        // }}
        center={center}
        zoom={zoom}
        forms={forms}
        // onFormAdd={(formCoords) => {
        //     points.push(formCoords);
        //     setForms(points);
        // }}  
      />
      
      {/* <pre>{JSON.stringify(forms, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(coords, null, 2)}</pre> */}
      <button onClick={() => {navigate("/editmap");}}>Save</button>
    </Wrapper>
  );

}
  
  
  export default Map;