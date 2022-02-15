import { store } from "../reducers/store.js";
import * as api from "../api/index.js";

export const setSafeZone = async (req, fatherKey) => {
    let request = req;

    let res = {}

  //   let safeZone = {
  //     "safezone" : {
  //         "green" : {
  //             "lat" : [15, 16, 17],
  //             "lng" : [16, 17, 18]
  //         },
  //         "yellow" : {
  //             "lat" : [11, 12, 15],
  //             "lng" : [26, 27, 28]
  //         },
  //         "red" : {
  //             "lat" : [35, 16, 17],
  //             "lng" : [36, 17, 18]
  //         }
  //     }
  // }

    console.log("safeZone");
    console.log(request[0][0][0]);
    console.log(request[1][1][1]);
    console.log(request[0][0][0]["lat"]);

    let greenLat = [];
    let greenLng = [];

    request[0][0].map((i) => greenLat.push(i["lat"]));
    request[0][0].map((i) => greenLng.push(i["lng"]));

    console.log("lat");
    console.log(greenLat);

    let yellowLat = [];
    let yellowLng = [];

    request[1][1].map((i) => yellowLat.push(i["lat"]));
    request[1][1].map((i) => yellowLng.push(i["lng"]));

    console.log("lat");
    console.log(yellowLat);

    let redLat = [];
    let redLng = [];

    request[2][2].map((i) => redLat.push(i["lat"]));
    request[2][2].map((i) => redLng.push(i["lng"]));

    console.log("lat");
    console.log(redLat);

    let safeZone = {
      "safezone" : {
          "green" : {
              "lat" : greenLat,
              "lng" : greenLng
          },
          "yellow" : {
              "lat" : yellowLat,
              "lng" : yellowLng
          },
          "red" : {
              "lat" : redLat,
              "lng" : redLng
          },
          fatherKey : fatherKey
      }
    }

    try {
      res = await api.setSafeZone(safeZone);
    } catch (err) {
      console.log(err);
    }

    console.log("safeZone request");
    console.log(request);
    let array = [request[0][0], request[1][1], request[2][2]];
    console.log(array);

    store.dispatch({
      type: "SET_SAFEZONE",
      payload: array,
    });

    console.log("res setSafeZone");
    console.log(res);
    return res;
  };

  export const getSafeZone = async (fatherKey) => {
    // let safeZone = req;

    let res = {}
    let father_key = {
      "fatherKey" : fatherKey
    }

    try {
      console.log("fatherKey index",fatherKey);
      res = await api.getSafeZone(father_key);
      console.log(res)
    } catch (err) {
      console.log(err);
    }

      console.log("res");
      console.log(res);

    console.log("res.data");
    console.log(res.data);


    if(res !== undefined) {
      let green_coords = [];
      let green_length = res.data.green.safezone_lat.length;
      let green_lat = res.data.green.safezone_lat;
      let green_lng = res.data.green.safezone_lng;
      console.log("length");
      console.log(green_length);
      for (let i = 0; i < green_length; i++) {
        green_coords.push({ lat: green_lat[i], lng: green_lng[i] })
      }
      console.log("green_coords");
      console.log(green_coords);


      let yellow_coords = [];
      let yellow_length = res.data.yellow.safezone_lat.length;
      let yellow_lat = res.data.yellow.safezone_lat;
      let yellow_lng = res.data.yellow.safezone_lng;
      console.log("length");
      console.log(yellow_length);
      for (let i = 0; i < yellow_length; i++) {
        yellow_coords.push({ lat: yellow_lat[i], lng: yellow_lng[i] })
      }
      console.log("yellow_coords");
      console.log(yellow_coords);


      let red_coords = [];
      let red_length = res.data.red.safezone_lat.length;
      let red_lat = res.data.red.safezone_lat;
      let red_lng = res.data.red.safezone_lng;
      console.log("length");
      console.log(red_length);
      for (let i = 0; i < red_length; i++) {
        red_coords.push({ lat: red_lat[i], lng: red_lng[i] })
      }
      console.log("red_coords");
      console.log(red_coords);

      let safeZone = [];
      console.log("safe zone");

      safeZone.push(green_coords);
      safeZone.push(yellow_coords);
      safeZone.push(red_coords);

      console.log("safeZone");
      console.log(safeZone);
      // green_lat.map((i) => green_coords.push({ lat: i[1], lng: i[0] }));

      // safeZone = [
      //   []
      // ]

      store.dispatch({
        type: "SET_SAFEZONE",
        payload: safeZone,
      });
    }
    return res;
  };