



import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useNavigate } from "react-router-dom";

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({ center, zoom, onPolygon, onFormAdd }) {

    // const [danger, setDanger] = useState(0);
    const colors = ["#6FFF63","#FFD263","#FF0000"];
  const ref = useRef();

  useEffect(() => {
      let danger = 0;
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom
    });
    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      // drawingControl: false,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          // window.google.maps.drawing.OverlayType.MARKER,
          // window.google.maps.drawing.OverlayType.CIRCLE,
          window.google.maps.drawing.OverlayType.POLYGON,
          // window.google.maps.drawing.OverlayType.POLYLINE,
          // window.google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
    });

    // const triangleCoords = [
    //   { lat: 25.774, lng: -80.19 },
    //   { lat: 18.466, lng: -66.118 },
    //   { lat: 32.321, lng: -64.757 },
    //   { lat: 25.774, lng: -80.19 },
    // ];
  
    // // Construct the polygon.
    // const bermudaTriangle = new window.google.maps.Polygon({
    //   paths: triangleCoords,
    //   strokeColor: "#FF0000",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#FF0000",
    //   fillOpacity: 0.35,
    // });
  
    // bermudaTriangle.setMap(map);

    drawingManager.setMap(map);

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
                break;
            default:
                break;
        }
        
        
        // console.log(danger);
        // setDanger(1);

        // console.log(polygonCoordinates[0].length);
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
    
    // window.google.maps.event.addListener(drawingManager, 'click', function() {
    //   this.setMap(null);
    // });
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
    const center = { lat: 21.4498898, lng: 38.930965 };
  const zoom = 4;
  const [coords, setCoords] = useState([]);
  const [forms, setForms] = useState([]);
  let points = [];
//   const [num, setNum] = useState(0);
// let num = 0;
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
            // formCoords.map((i) => points.push(i));
            points.push(formCoords);
            setForms(points);
            // points = [];
            // num++;
        }}  
      />
      <pre>{JSON.stringify(coords, null, 2)}</pre>
 

      <button onClick={() => {navigate("/map");}}>Save</button>

      {/* <button onClick={() => {console.log(forms)}}>Save</button> */}
      {/* <button onClick={() => {console.log(forms[0])}}>Save</button> */}
    </Wrapper>
  );

}
  
  
  export default EditMap;