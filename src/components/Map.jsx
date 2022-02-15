import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as Services from "../services/index.js"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { getDatabase, ref, onValue} from "firebase/database";
import database from '../services/firebase.js';

import {isInside, Point} from "../services/checksafezone.js";

// // import { initializeApp } from 'firebase/app';
// // import * as db from 'firebase/database';

// import firebase from 'firebase';

// // import Firebase from 'firebase';
// // import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// // Web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCSic3jmsL-pJZiZz4Wwa2QJLwwSios684",
//   authDomain: "dakirni.firebaseapp.com",
//   databaseURL: "https://dakirni-default-rtdb.firebaseio.com",
//   projectId: "dakirni",
//   storageBucket: "dakirni.appspot.com",
//   messagingSenderId: "744400890347",
//   appId: "1:744400890347:web:dc2b4c92977e25663411ae"
// };

// // firebase.initializeApp(firebaseConfig);
// // let database = firebase.database();

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // Firebase.initializeApp(firebaseConfig);

// // const getFatherLocation = () => {
// //   let ref = app.database().ref("/");
// //   let state;
// //   ref.on("value", snapshot => {
// //     state = snapshot.val();
// //     // this.setState(state);
// //   });
// //   console.log("state");
// //   console.log(state);
// // };

// // let ref = Firebase.database().ref("/");

// // const db = getFirestore(app);

// // async function getCities(db) {
// //   const citiesCol = collection(db, 'cities');
// //   const citySnapshot = await getDocs(citiesCol);
// //   const cityList = citySnapshot.docs.map(doc => doc.data());
// //   return cityList;
// // }

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({ zoom, forms, location, setInside }) {

  const colors = ["#6FFF63","#FFD263","#FF0000"];
  const ref = useRef();

  let center = { lat: 31.643478, lng: -8.021075 };

  useEffect(() => {

    
    if (location !== undefined && location != null) { 
      center = { lat: location.latitude, lng: location.longitude }
    }
    
    
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom
    });

    if(forms !== undefined && forms[0] !== undefined && forms[0][0] !== undefined) {

    // console.log("forms[0]");
    console.log("forms[0]",forms[0]);

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

    let greenPolygon = [];
    // forms[0].map(form => console.log(form + ","));
    for(let i=0 ; i<forms[0].length; i++) {
      // console.log(forms[0][i]);
      // console.log(forms[0][i].lat);
      greenPolygon.push(new Point(forms[0][i].lat, forms[0][i].lng));
    }

    let yellowPolygon = [];
    for(let i=0 ; i<forms[1].length; i++) {
      yellowPolygon.push(new Point(forms[1][i].lat, forms[1][i].lng));
    }

    let redPolygon = [];
    for(let i=0 ; i<forms[2].length; i++) {
      redPolygon.push(new Point(forms[2][i].lat, forms[2][i].lng));
    }

    let point = new Point(31.643478, -8.021075);
    console.log("point",point);
    if(!isInside(redPolygon, point)) {
      // console.log("is insideee");
      setInside(false);
    }
    else {
      setInside(true);
    }
  }

  console.log("location component");
  console.log(location);
  if (location !== undefined && location != null) {
    var myLatlng = new window.google.maps.LatLng(location.latitude, location.longitude);
    // var myLatlng = new window.google.maps.LatLng(31.6469904,-8.0129456);
    var marker = new window.google.maps.Marker({
      position: myLatlng,
      title:"Father Location"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }

  }, [forms, location]);

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


const Map = ({fatherKey}) => {
  let res = [];
  useEffect(() => {
    console.log("fatherkey map", fatherKey);
    res = Services.getSafeZone(fatherKey);
    getFatherLocation();
    // let i = 0;
    // if(i===0){
    //   window.location.reload()
    //   i++;
    // }else {
    //   window.location.reload(false)
    // }
    if (!inside) {
      console.log("not inside");
    }
    else {
      console.log("inside");
    }
  }, []);

  let [location , setLocation] = useState();
  const [inside , setInside] = useState(true);

  const getFatherLocation = () => {
    const databaseRef = ref(database, 'location/user_id/'+fatherKey);
    onValue(databaseRef, (snapshot) => {
      const locationInfos = snapshot.val();
      setLocation(locationInfos);
      console.log("locationInfos.latitude");
      console.log(locationInfos.latitude);
    });
    if (!inside) {
      console.log("not inside");
    }
    else {
      console.log("inside");
    }
  }

  let navigate = useNavigate();
  // const center = { lat: 31.643478, lng: -8.021075 };
  const zoom = 17;
  const forms = useSelector((state) => state.reducer.safezone, shallowEqual);
  
  // console.log("forms map", forms);
  // console.log("forms[0][0].lat", forms[0][0].lat);

  // let greenPolygon = [];
  // // forms[0].map(form => console.log(form + ","));
  // for(let i=0 ; i<forms[0].length; i++) {
  //   // console.log(forms[0][i]);
  //   // console.log(forms[0][i].lat);
  //   greenPolygon.push(new Point(forms[0][i].lat, forms[0][i].lng));
  // }

  // let yellowPolygon = [];
  // for(let i=0 ; i<forms[1].length; i++) {
  //   yellowPolygon.push(new Point(forms[1][i].lat, forms[1][i].lng));
  // }

  // let redPolygon = [];
  // for(let i=0 ; i<forms[2].length; i++) {
  //   redPolygon.push(new Point(forms[2][i].lat, forms[2][i].lng));
  // }

  // let point = new Point(31.643478, -8.021075);
  // if(isInside(greenPolygon, point)) {
  //   console.log("is inside");
  // }

  return (
    <Wrapper
      libraries={["drawing"]}
      apiKey="AIzaSyCN82KTDRpdaR26H_5rbft3kaB9N73vEvU"
      render={render}
    >
      
      <MyMapComponent
        // center={center}
        zoom={zoom}
        forms={forms}
        location={location}
        setInside={setInside}
      />
      
      {/* <pre>{JSON.stringify(forms, null, 2)}</pre> */}

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '10vh', backgroundColor: '#1976d2' }}
      >
        <Stack spacing={7} direction="row" style={{ minHeight: '4vh' }}>
          <Button variant="contained" style={{ backgroundColor: '#ffffff', width:"23vh" }} onClick={getFatherLocation}>
            <Typography id="modal-modal-title" color="#1976d2" >
              Get Father Location
            </Typography>
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#ffffff', width:"23vh" }} onClick={() => {navigate("/editmap");}}>
            <Typography id="modal-modal-title" color="#1976d2" >
              Update safe zone
            </Typography>
          </Button>
        </Stack>
      </Grid>
    </Wrapper>
  );

}
  
  export default Map;