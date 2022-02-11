// // import React from "react";

// // const Map = () => {
// //     const ref = React.useRef(null);
// //     const [map, setMap] = React.useState();

// //     React.useEffect(() => {
// //         if (ref.current && !map) {
// //             setMap(new window.google.maps.Map(ref.current, {}));
// //         }
// //     }, [ref, map]);
// // };

// // export default Map;

// // // import React from "react";
// // // import "./Style.css";

// // // const Map = () => {
// // //     initMap();
// // // }

// // // function initMap() {
// // //     const map = new google.maps.Map(document.getElementById("map"), {
// // //       center: { lat: -34.397, lng: 150.644 },
// // //       zoom: 8,
// // //     });
// // //     const drawingManager = new google.maps.drawing.DrawingManager({
// // //       drawingMode: google.maps.drawing.OverlayType.MARKER,
// // //       drawingControl: true,
// // //       drawingControlOptions: {
// // //         position: google.maps.ControlPosition.TOP_CENTER,
// // //         drawingModes: [
// // //           google.maps.drawing.OverlayType.MARKER,
// // //           google.maps.drawing.OverlayType.CIRCLE,
// // //           google.maps.drawing.OverlayType.POLYGON,
// // //           google.maps.drawing.OverlayType.POLYLINE,
// // //           google.maps.drawing.OverlayType.RECTANGLE,
// // //         ],
// // //       },
// // //       markerOptions: {
// // //         icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
// // //       },
// // //       circleOptions: {
// // //         fillColor: "#ffff00",
// // //         fillOpacity: 1,
// // //         strokeWeight: 5,
// // //         clickable: false,
// // //         editable: true,
// // //         zIndex: 1,
// // //       },
// // //     });
  
// // //     drawingManager.setMap(map);
// // //   }

// // // export default Map;






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

// const Map = () => {
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


// export default Map;



import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Map = () => {

    let navigate = useNavigate();

  return (
    <div>
        <div>Map</div>
        <button onClick={() => {navigate("/editmap");}}>Edit</button>
        {/* <button onClick={() => {}}><Link to="/editmap">Edit</Link></button> */}
    </div>
  );

}


export default Map;