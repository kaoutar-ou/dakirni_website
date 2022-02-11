import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useNavigate } from "react-router-dom";
import * as Services from "../services/index.js";
import SetSafeZone from './modals/SetSafeZone.jsx';
import MaxSafeZoneWarning from './modals/MaxSafeZoneWarning.jsx'

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({ center, zoom, onPolygon, onFormAdd, handleMaxWarning }) {

  const colors = ["#6FFF63","#FFD263","#FF0000"];
  const ref = useRef();

  

  let danger = 0;
  
  
  useEffect(() => {
    
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom
    });

    
      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            window.google.maps.drawing.OverlayType.POLYGON,
          ],
        },
      });

      
      drawingManager.setMap(map);

      if (danger < 3) {
      window.google.maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        function (event) {
          console.log(event);
          const polygonCoordinates = event.overlay.latLngs
            .getArray()
            .map((it) =>
              it
                .getArray()
                .map((point) => [point.toJSON().lng, point.toJSON().lat])
            );
          onPolygon(polygonCoordinates);

          let points = [];
          polygonCoordinates[0].map((i) => points.push({ lat: i[1], lng: i[0] }));
          console.log(points);

          // onFormAdd(points);
          switch (danger) {
              case 0:
                  onFormAdd({0 : points});
                  break;
              case 1:
                  onFormAdd({1 : points});
                  break;
              case 2:
                  onFormAdd({2 : points});
                  drawingManager.setOptions({
                    drawingControl: false
                  });
                  handleMaxWarning();
                  drawingManager.setMap(null);
                  break;
              default:
                  break;
          }
          
          const form = new window.google.maps.Polygon({
              paths: [points],
              strokeColor: colors[danger],
              strokeOpacity: 0.8,
              strokeWeight: 3,
              fillColor: colors[danger],
              fillOpacity: 0.25,
          });
          danger++;
          console.log(danger);
          form.setMap(map);
        }
      );
    
    }

    if(danger>=3) {
      drawingManager.setOptions({
        drawingControl: false
      });
      drawingManager.setMap(map);
    }
    }, []);

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



const EditMap = () => {  
  let navigate = useNavigate();
  const center = { lat: 31.643478, lng: -8.021075 };
  const zoom = 17;
  const [coords, setCoords] = useState([]);
  const [forms, setForms] = useState([]);
  let points = [];

  const [openSet, setOpenSet] = React.useState(false);
  const handleOpenSet = () => setOpenSet(true);
  const handleCloseSet = () => setOpenSet(false);

  const setSafeZone = () => {
    console.log("setsafezone edit map")
    console.log(forms);
    Services.setSafeZone(forms);
    handleCloseSet();
    navigate("/map");
  }


  const [openMaxWarning, setOpenMaxWarning] = React.useState(false);

  const handleMaxWarning = () => {
    setOpenMaxWarning(true);
  };

  const handleCloseMaxWarning = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMaxWarning(false);
  };


  console.log("c=>", coords);
  return (
    <Wrapper
      libraries={["drawing"]}
      apiKey="AIzaSyCN82KTDRpdaR26H_5rbft3kaB9N73vEvU"
      render={render}
    >
      <MyMapComponent
        onPolygon={(polygonCoordinates) => {
          console.log("onPolygon", polygonCoordinates);
          setCoords([coords, polygonCoordinates]);
        }}
        center={center}
        zoom={zoom}
        onFormAdd={(formCoords) => {
            points.push(formCoords);
            setForms(points);
        }}
        handleMaxWarning={handleMaxWarning}
      />
      {/* <pre>{JSON.stringify(coords, null, 2)}</pre> */}
      <SetSafeZone handleOpenSet={handleOpenSet} handleCloseSet={handleCloseSet} openSet={openSet} setSafeZone={setSafeZone}/>
      <MaxSafeZoneWarning openMaxWarning={openMaxWarning} handleCloseMaxWarning={handleCloseMaxWarning}/>
      <button onClick={handleOpenSet}>Save</button>
      {/* <button onClick={() => {navigate("/map");}}>Save</button> */}
      {/* <button onClick={() => {console.log(forms)}}>Save</button> */}
      {/* <button onClick={() => {console.log(forms[0])}}>Save</button> */}
    </Wrapper>
  );
}

export default EditMap;