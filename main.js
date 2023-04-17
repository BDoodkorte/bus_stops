// BUSSTOPS

import * as mainFunctions from "./mainFunctions.js"

// Function 1: Ask user for postcode and convert into usable format for API
let postcode = await mainFunctions.postCodeInput();

// Function 2: Fetch postcode data from API and generate Latitude and Longitude from postcode
let pcData = await mainFunctions.postCodeData(postcode); // put await here so that it knows to finish this function first, otherwise it will jump to the next one.
let lat = mainFunctions.latPC(pcData);
let long = mainFunctions.longPC(pcData);

// Function 3: Fetch StopPoint data (commonName and indicator)
let bsData = await mainFunctions.busStopData(lat,long);

// Print two nearest busstops to postcode
if(bsData.stopPoints.length == 0){
    console.log("There are no TFL bus stops near that postcode.")
}
else{
console.log(`The nearest two bus stops to your location are \n
${bsData.stopPoints[0].commonName} : ${bsData.stopPoints[0].indicator} \n 
${bsData.stopPoints[1].commonName} : ${bsData.stopPoints[1].indicator} \n`);


// Print next busses to arrive for stop 1
console.log(`The next busses to arrive at ${bsData.stopPoints[0].commonName} : ${bsData.stopPoints[1].indicator}are: \n`);

// Function 4: Generate busstop ID and fetch bus arrival data () and cut it to size and loop through all the incoming busses
let bsArrivalData = await mainFunctions.busArrivalData(bsData,0);
let bsArray = mainFunctions.busArray(bsArrivalData);

if (bsArray.length===0){
    console.log("There is no imminent bus.\n")
}else{
    console.log(...bsArray)};

// Print next busses to arrive for stop 2
console.log(`The next busses to arrive at ${bsData.stopPoints[1].commonName} : ${bsData.stopPoints[1].indicator} are: \n`);

// Function 4
bsArrivalData = await mainFunctions.busArrivalData(bsData,1);
bsArray = mainFunctions.busArray(bsArrivalData);

if (bsArray.length===0){
    console.log("There is no imminent bus.\n")
}else{
    console.log(...bsArray)};
}
