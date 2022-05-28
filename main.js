// Make map at 34.23921640079608, -118.52807553933594
/* map bounds 
34.242875299472075, -118.53186489809671 NW
34.24277495703962, -118.5245212313445 NE
34.235386916853265, -118.53188007096189 SW
34.23543709248766, -118.52447571274891 SE
*/

// Declare map and global var
let map;
const correct = "Correct!";
const incorrect = "Incorrect";

// Keeps track of score
let cor = 0;
let inc = 0;

// Creates constant for map bounds
const CSUN_BOUNDS = {
    north: 34.242875299472075,
    south: 34.235386916853265,
    west: -118.53186489809671,
    east: -118.5245212313445,
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapId: '62c3cd82857a5842',
        zoom: 17,
        gestureHandling: "none",
        zoomControl: false,
        center: { lat: 34.23921640079608, lng: -118.52807553933594 },
        disableDefaultUI: true,
        restriction: {
            latLngBounds: CSUN_BOUNDS,
            strictBounds: false,
        },
    });
    map.setOptions({ draggableCursor: 'crosshair' });

    // Create invisible boxes on map to manipulate properties later
    // Matadome [RE140] (mandatory location)
    const matadome = new google.maps.Rectangle({
        name: 'Matadome [RE140]',
        visible: false,
        strokeColor: "#2b8026",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#2b8026",
        fillOpacity: 0.35,
        map,
        bounds: {
            north: 34.24178057732276,
            south: 34.241358683071304,
            east: -118.52634849432083,
            west: -118.52671849975133,
        },
        north: 34.24178057732276,
        south: 34.241358683071304,
        east: -118.52634849432083,
        west: -118.52671849975133,
        cursor: 'crosshair',
    })
    // Delmar T. Oviatt Library
    const library = new google.maps.Rectangle({
        name: 'Delmar T. Oviatt Library',
        visible: false,
        strokeColor: "#2b8026",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#2b8026",
        fillOpacity: 0.35,
        map,
        bounds: {
            north: 34.24039680185964,
            south: 34.2396384683637,
            east: -118.52862350281912,
            west: -118.53004507363912,
        },
        north: 34.24039680185964,
        south: 34.2396384683637,
        east: -118.52862350281912,
        west: -118.53004507363912,
        cursor: 'crosshair',
    })
    // Sierra Hall
    const sierraHall = new google.maps.Rectangle({
        name: 'Sierra Hall',
        visible: false,
        strokeColor: "#2b8026",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#2b8026",
        fillOpacity: 0.35,
        map,
        bounds: {
            north: 34.23845774070049,
            south: 34.23808457209262,
            east: -118.53001259957858,
            west: -118.53138953716022,
        },
        north: 34.23845774070049,
        south: 34.23808457209262,
        east: -118.53001259957858,
        west: -118.53138953716022,
        cursor: 'crosshair',
    });
    // Student Recreation Center
    const recCenter = new google.maps.Rectangle({
        name: 'Student Recreation Center',
        visible: false,
        strokeColor: "#2b8026",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#2b8026",
        fillOpacity: 0.35,
        map,
        bounds: {
            north: 34.24063020903227,
            south: 34.239328849105355,
            east: -118.52468817908427,
            west: -118.52517750398862,
        },
        north: 34.24063020903227,
        south: 34.239328849105355,
        east: -118.52468817908427,
        west: -118.52517750398862,
        cursor: 'crosshair',
    });
    // Campus Store Complex
    const campusStore = new google.maps.Rectangle({
        name: 'Campus Store Complex',
        visible: false,
        strokeColor: "#2b8026",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#2b8026",
        fillOpacity: 0.35,
        map,
        bounds: {
            north: 34.237797682974346,
            south: 34.23695728119504,
            east: -118.52758312442623,
            west: -118.52874988538228,
        },
        north: 34.237797682974346,
        south: 34.23695728119504,
        east: -118.52758312442623,
        west: -118.52874988538228,
        cursor: 'crosshair',
    });

    // Create array containing all locations
    let locations = [matadome, library, sierraHall, recCenter, campusStore];

    // Shuffle locations array
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    i=0;

    shuffle(locations);
    nextLocation();

    // Function to grab new location from array and present it to player
    function nextLocation() {
        
        console.log(i);
        let currentLocation = locations[locations.length - (i + 1)];
        console.log(currentLocation);
        console.log(currentLocation.name);
        console.log(locations.length - (i + 1));

        document.getElementById('prompt').innerHTML = "Double click on " + currentLocation.name;
        checkGuess(currentLocation, i);
        i++;
        function checkGuess(currentLocation, i) {
            console.log(currentLocation);
            var lis = map.addListener("dblclick", (e) => {
                guess(e.latLng, map, i);
            });

            function guess(latLng, map, i) {
                let lat = latLng.lat();
                let lng = latLng.lng();
                if (lat <= currentLocation.north && lat >= currentLocation.south && lng <= currentLocation.east && lng >= currentLocation.west) {
                    document.getElementById('response').innerHTML = correct;
                    document.getElementById('response').style.color = "green";

                    currentLocation.setVisible(true);
                    cor++;
                    google.maps.event.removeListener(lis); // Removes Listener

                    if (i < 4) { // Moves to next question if counter < 5
                        nextLocation(); 
                    }
                    else {
                        endGame(); // Or else finishes the game
                    }
                }
                else {
                    document.getElementById('response').innerHTML = incorrect;
                    document.getElementById('response').style.color = "red";

                    currentLocation.setVisible(true);
                    currentLocation.strokeColor = "#ff0000";
                    currentLocation.fillColor = "#ff0000";
                    inc++;
                    google.maps.event.removeListener(lis); // Removes Listener

                    if (i < 4) { // Moves to next question if counter < 5
                        nextLocation(); 
                    }
                    else { 
                        endGame(); // Or else finishes the game
                    }
                }
                document.getElementById('score').innerHTML = cor + " Correct / " + inc + " Incorrect";
            }
        }
    }
    function endGame() {
        document.getElementById('prompt').innerHTML = "You finished the game!";
    }
}