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

  let danger = 0;

  // let forms = [[{}]];

  

  useEffect(() => {
    
    if(forms !== undefined && forms[0] !== undefined && forms[0][0] !== undefined) {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom
    });

    // console.log("forms[0]");
    // console.log(forms[0][0]);
    // console.log(forms[1]);
    // console.log(forms[2]);
    

    const greenZoneCoords = forms[0][0];
  
    const yellowZoneCoords = forms[1][1];

    const redZoneCoords = forms[2][2]

    // Construct the polygon.
    const greenZone = new window.google.maps.Polygon({
      paths: greenZoneCoords,
      strokeColor: colors[0],
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: colors[0],
      fillOpacity: 0.35,
    });
    greenZone.setMap(map);

    const yellowZone = new window.google.maps.Polygon({
      paths: yellowZoneCoords,
      strokeColor: colors[1],
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: colors[1],
      fillOpacity: 0.35,
    });
    yellowZone.setMap(map);

    const redZone = new window.google.maps.Polygon({
      paths: redZoneCoords,
      strokeColor: colors[2],
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: colors[2],
      fillOpacity: 0.35,
    });
    redZone.setMap(map);
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
  
  let navigate = useNavigate();
  const center = { lat: 31.643478, lng: -8.021075 };
  const zoom = 17;
  // const [coords, setCoords] = useState([]);
  // const [forms, setForms] = useState([]);
  // let points = [];
  // console.log("c=>", coords);
  const forms = useSelector((state) => state.reducer.safezone, shallowEqual);
  

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