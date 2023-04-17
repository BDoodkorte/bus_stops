
//readline
import { prompt } from "readline-sync";
//Alternative: import * as readline from "readline-sync"

// postcode variable to generate lat and long

//generate user input
console.log("Please provide a postcode:");
const userInput = prompt();
const lowerCasePostCode = userInput.toLowerCase();
const postCode = lowerCasePostCode.replace(" ", "");
//var postCode = "nw51tl"
let url = `http://api.postcodes.io/postcodes/${postCode}`;
let postCodeAPIresponse = await fetch(url);
let postCodeData = await postCodeAPIresponse.json()
let lat = postCodeData.result.latitude;
let long = postCodeData.result.longitude;

let url2 = `https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram`;
let busAPIresponse = await fetch(url2);
let busStopData = await busAPIresponse.json();
// print the nearest two bus stops
console.log(`The nearest two bus stops to your location are ${busStopData.stopPoints[0].commonName} : ${busStopData.stopPoints[0].indicator} and ${busStopData.stopPoints[1].commonName} : ${busStopData.stopPoints[1].indicator}`);

let id = busStopData.stopPoints[0].id;
//console.log(id);
let url3 = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`;
let busArrivalResponse = await fetch(url3);
let busArrivalDataFull = await busArrivalResponse.json();
// splice array to a maximum of 5
let busArrivalData = busArrivalDataFull.slice(0, 5);
//console.log(busArrivalData);
console.log(`The next busses to arrive at ${busStopData.stopPoints[0].commonName} : ${busStopData.stopPoints[0].indicator} are: \n`);
let busArray = [];
for (let i = 0; i < busArrivalData.length; i++) {
    let date = new Date(busArrivalData[i].expectedArrival);
    let hour = date.getHours();
    let min = 0;
    if (date.getMinutes() < 10) {
        min = '0' + date.getMinutes();
    }
    else {
        min = date.getMinutes();
    }
    busArray.push(`${hour}:${min} ${busArrivalData[i].lineName} to ${busArrivalData[i].destinationName} \n`);
    busArray.sort();
}
console.log(...busArray);


let id2 = busStopData.stopPoints[1].id;

let url4 = `https://api.tfl.gov.uk/StopPoint/${id2}/Arrivals`;
let busArrivalResponse2 = await fetch(url4);
let busArrivalDataFull2 = await busArrivalResponse2.json();
// splice array to a maximum of 5
let busArrivalData2 = busArrivalDataFull2.slice(0, 5);
//console.log(busArrivalData);
console.log(`The next busses to arrive at ${busStopData.stopPoints[1].commonName} : ${busStopData.stopPoints[1].indicator} are: \n`);
let busArray2 = [];
for (let i = 0; i < busArrivalData2.length; i++) {
    // create empty array and fill with arrival data, sort array and then print it
    let date2 = new Date(busArrivalData2[i].expectedArrival);
    let hour2 = date2.getHours();
    let hour2Int = parseInt(hour2);
    let min2 = 0;
    let min2Int = 0;
    if (date2.getMinutes() < 10) {
        min2 = '0' + date2.getMinutes();
        min2Int = parseInt(min2);
    }
    else {
        min2 = date2.getMinutes();
        min2Int = parseInt(min2);

    }

    busArray2.push(`${hour2Int}:${min2Int} ${busArrivalData2[i].lineName} to ${busArrivalData2[i].destinationName} \n`);
    busArray2.sort();
}
console.log(...busArray2);