// // // import logo from './logo.svg';
// // // import './App.css';
// // // import Map from './components/Map.jsx'

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;


// // // import { Wrapper, Status } from "@googlemaps/react-wrapper";
// // // import Map from "./components/Map.jsx";

// // // const App = () => {

// // //   const render = (status) => {
// // //     // return <h1>{status}</h1>;
// // //     return <h1>{Status.SUCCESS}</h1>;
// // //   };
  
// // //   <Wrapper apiKey={"AIzaSyA4aali4C2ngfs-7yZp-VvSqrlCC6IcMdQ"} render={render}>
// // //     <Map/>
// // //   </Wrapper>

// // // }

// // // export default App;


// // // import "./styles.css";
// // import { Wrapper } from "@googlemaps/react-wrapper";
// // import React from "react";

// // import DrawingManager from 'google-maps-drawing-tools';

// // const markers = [
// //   { lat: -25.363, lng: 131.044 },
// //   { lat: -15.363, lng: 122.044 }
// // ];

// // const Map = ({ onClick, onIdle, children, style, ...options }) => {
// //   const ref = React.useRef(null);
// //   const [map, setMap] = React.useState();

// //   React.useEffect(() => {
// //     if (ref.current && !map) {
// //       setMap(new window.google.maps.Map(ref.current, {}));
// //     }
// //   }, [ref, map]);

// //   React.useEffect(() => {
// //     if (map) {
// //       map.setOptions(options);
// //     }
// //   }, [map, options]);

// //   React.useEffect(() => {
// //     if (map) {
// //       ["click", "idle"].forEach((eventName) =>
// //         window.google.maps.event.clearListeners(map, eventName)
// //       );

// //       if (onClick) {
// //         map.addListener("click", onClick);
// //       }

// //       if (onIdle) {
// //         map.addListener("idle", () => onIdle(map));
// //       }
// //     }
// //   }, [map, onClick, onIdle]);


// //   // const drawingManager = new window.google.maps.drawing.DrawingManager({
// //   //   drawingMode: window.google.maps.drawing.OverlayType.MARKER,
// //   //   drawingControl: true,
// //   //   drawingControlOptions: {
// //   //     position: window.google.maps.ControlPosition.TOP_CENTER,
// //   //     drawingModes: [
// //   //       window.google.maps.drawing.OverlayType.MARKER,
// //   //       window.google.maps.drawing.OverlayType.CIRCLE,
// //   //       window.google.maps.drawing.OverlayType.POLYGON,
// //   //       window.google.maps.drawing.OverlayType.POLYLINE,
// //   //       window.google.maps.drawing.OverlayType.RECTANGLE,
// //   //     ],
// //   //   },
// //   //   markerOptions: {
// //   //     icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
// //   //   },
// //   //   circleOptions: {
// //   //     fillColor: "#ffff00",
// //   //     fillOpacity: 1,
// //   //     strokeWeight: 5,
// //   //     clickable: false,
// //   //     editable: true,
// //   //     zIndex: 1,
// //   //   },
// //   // });
// //   // drawingManager.setMap(map);


  
// //   return (
// //     <>
// //       <div ref={ref} style={style} />
// //       {React.Children.map(children, (child) => {
// //         if (React.isValidElement(child)) {
// //           return React.cloneElement(child, { map });
// //         }
// //       })}
// //     </>
// //   );
// // };

// // const Marker = (options) => {
// //   const [marker, setMarker] = React.useState();
// //   const contentRef = React.useRef(null);

// //   React.useEffect(() => {
// //     if (!marker) {
// //       setMarker(new window.google.maps.Marker());
// //     }

// //     return () => {
// //       if (marker) {
// //         marker.setMap(null);
// //       }
// //     };
// //   }, [marker]);

// //   React.useEffect(() => {
// //     if (marker) {
// //       const infowindow = new window.google.maps.InfoWindow({
// //         content: `daver`
// //       });
// //       marker.setOptions(options);

// //       marker.addListener("click", () => {
// //         infowindow.open({
// //           anchor: marker,
// //           shouldFocus: false
// //         });
// //       });
// //     }
// //   }, [marker, options]);

// //   return null;
// // };

// // const App = () => {
  
// //   return (
// //     <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
// //       <Wrapper apiKey={"AIzaSyBcq5w9zHY3R7whR4UjS5CmDrZvONBEJrY"}>
// //         <Map
// //           center={{ lat: -25.363, lng: 131.044 }}
// //           zoom={3}
// //           style={{ flexGrow: "1", height: "100%" }}
// //         >
// //           {markers.map((marker) => {
// //             return <Marker position={marker} />;
// //           })}
// //         </Map>
// //       </Wrapper>
// //     </div>
// //   );
// // }

// // // const google = window.google;






// // export default App;

// import React, { useEffect, useRef, useState } from "react";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

// const render = (status) => {
//   if (status === Status.LOADING) return <h3>{status} ..</h3>;
//   if (status === Status.FAILURE) return <h3>{status} ...</h3>;
//   return null;
// };

// function MyMapComponent({ center, zoom, onPolygon }) {
//   const ref = useRef();

//   useEffect(() => {
//     const map = new window.google.maps.Map(ref.current, {
//       center,
//       zoom
//     });
//     const drawingManager = new window.google.maps.drawing.DrawingManager({
//       drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
//       // drawingControl: false,
//       drawingControlOptions: {
//         position: window.google.maps.ControlPosition.TOP_CENTER,
//         drawingModes: [
//           // window.google.maps.drawing.OverlayType.MARKER,
//           // window.google.maps.drawing.OverlayType.CIRCLE,
//           window.google.maps.drawing.OverlayType.POLYGON,
//           // window.google.maps.drawing.OverlayType.POLYLINE,
//           // window.google.maps.drawing.OverlayType.RECTANGLE,
//         ],
//       },
//     });

//     // const triangleCoords = [
//     //   { lat: 25.774, lng: -80.19 },
//     //   { lat: 18.466, lng: -66.118 },
//     //   { lat: 32.321, lng: -64.757 },
//     //   { lat: 25.774, lng: -80.19 },
//     // ];
  
//     // // Construct the polygon.
//     // const bermudaTriangle = new window.google.maps.Polygon({
//     //   paths: triangleCoords,
//     //   strokeColor: "#FF0000",
//     //   strokeOpacity: 0.8,
//     //   strokeWeight: 2,
//     //   fillColor: "#FF0000",
//     //   fillOpacity: 0.35,
//     // });
  
//     // bermudaTriangle.setMap(map);

//     drawingManager.setMap(map);

//     window.google.maps.event.addListener(
//       drawingManager,
//       "overlaycomplete",
//       function (event) {
//         console.log(event);
//         const polygonCoordinates = event.overlay.latLngs
//           .getArray()
//           .map((it) =>
//             it
//               .getArray()
//               .map((point) => [point.toJSON().lng, point.toJSON().lat])
//           );
//         onPolygon(polygonCoordinates);
//       }
//     );

//     // window.google.maps.event.addListener(drawingManager, 'click', function() {
//     //   this.setMap(null);
//     // });
//   }, []);

//   return (
//     <div
//       style={{
//         height: "90vh"
//       }}
//       ref={ref}
//       id="map"
//     />
//   );
// }

// export default function App() {
//   const center = { lat: 21.4498898, lng: 38.930965 };
//   const zoom = 4;
//   const [coords, setCoords] = useState([]);

//   console.log("c=>", coords);

//   return (
//     <Wrapper
//       libraries={["drawing"]}
//       apiKey="AIzaSyCN82KTDRpdaR26H_5rbft3kaB9N73vEvU"
//       render={render}
//     >
//       <MyMapComponent
//         onPolygon={(polygonCoordinates) => {
//           console.log("onPolygon", polygonCoordinates);
//           setCoords([coords, polygonCoordinates]);
//         }}
//         center={center}
//         zoom={zoom}
//       />
//       <pre>{JSON.stringify(coords, null, 2)}</pre>
//     </Wrapper>
//   );
// }




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