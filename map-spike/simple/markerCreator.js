var mapElement;
let map = new Map();

map.set('Bondi Beach', '51.51372488696962, -0.1301761800310075')
map.set('British Museum', '51.52095341861179, -0.12816436856515523')

function createMap() {
    mapElement = document.createElement('gmp-map');
    mapElement.setAttribute('center', '51.51372488696962, -0.1301761800310075');
    mapElement.setAttribute('zoom', '10');
    mapElement.setAttribute('map-id', 'DEMO_MAP_ID');


    document.getElementById('map-container').appendChild(mapElement);
    populatePins();

}

function populatePins(){
    var markerElement;

    map.forEach((value, key) => {
        console.log(key, value);
        markerElement = document.createElement('gmp-advanced-marker');
        markerElement.setAttribute('position', value);
        markerElement.setAttribute('title', key);

        const imgElement = document.createElement('img');
        imgElement.classList.add('flag-icon');
        imgElement.src = './blue pin.jpeg';
    
        markerElement.appendChild(imgElement);
        mapElement.appendChild(markerElement);
    })
}

document.addEventListener('DOMContentLoaded', createMap);
