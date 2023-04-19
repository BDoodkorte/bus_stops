//To do list:


// do 123 tgt, and then add readme as we wish
//4.break into more files;


// Functions to be used in BusStops
import { prompt } from "readline-sync";

// 1. Ask for input and convert postcode

export async function postCodeInput() {
    console.log("Please provide a postcode:");
    let userInput = prompt();
    

    //api to check postcode validity;
    let url = `http://api.postcodes.io/postcodes/${userInput}/validate`;
    let validityData = await fetch(url);
    let validity = await validityData.json();
    let validityResult = validity.result;
   
    while (validityResult===false){
        console.log("Sorry, the postcode is not valid. Please try again.");
        console.log("Please provide a postcode:");
        userInput = prompt();

        url = `http://api.postcodes.io/postcodes/${userInput}/validate`;
        validityData = await fetch(url);
        validity = await validityData.json();
        validityResult = validity.result;
    } 

    const lowerCasePostCode = userInput.toLowerCase();
    const postCode = lowerCasePostCode.replace(" ", ""); 


    return postCode;
    
} 

// 2. Fetch postcode data from API 
export async function postCodeData(postCode){
    let url = `http://api.postcodes.io/postcodes/${postCode}`;
    let postCodeAPIresponse = await fetch(url); // if we don't await here it will not complete fetching everything.
    let postCodeData = await postCodeAPIresponse.json()
    return postCodeData;
}

//2.1 Generate Latitude
export function latPC(postCodeData){
    let lat = postCodeData.result.latitude;
    return lat;
}
//2.2 Generate Longitude
export function longPC(postCodeData){
    let long = postCodeData.result.longitude;
    return long;
}

// 3.  Fetch StopPoint data (commonName and indicator)
export async function busStopData(lat,long){
    let url = `https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram`;
    let busAPIresponse = await fetch(url);
    let busStopData = await busAPIresponse.json();
    return busStopData;
}

// 3.1 Fetch route from Postcode and StopPoint Id
export async function routeData(postCode, busStopData, n){
    let id = busStopData.stopPoints[n].id; 
    let url = `https://api.digital.tfl.gov.uk/Journey/JourneyResults/${postCode}/to/${id}`;
    try {
        let routeAPIresponse = await fetch(url);
        let routeData = await routeAPIresponse.json();
        return routeData;
    } finally {
        let error = console.log('API not functioning');
        return error;
      }
}


// 4.1 Generate busstop ID and fetch bus arrival data () and cut it to size
export async function busArrivalData(busStopData,n){
    let id = busStopData.stopPoints[n].id; 
    
    let url = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`;
    let busArrivalResponse = await fetch(url);
    let busArrivalDataFull = await busArrivalResponse.json();
    let busArrivalData = busArrivalDataFull.slice(0, 5);
    return busArrivalData;
}

//4.2 loop through all the incoming busses
export function busArray (busArrivalData){
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
        busArray.push(`\n ${hour}:${min} ${busArrivalData[i].lineName} to ${busArrivalData[i].destinationName} \n`);
        busArray.sort();
    }

   
        return busArray;
    
    
}
    
