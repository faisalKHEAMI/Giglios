// how many times did the button get pushed???
let m = 0;
//the text on the nav bar, Location our story contact us....
let navtext1 = document.querySelector('.nav-text1');
let navtext2 = document.querySelector('.nav-text2');
let navtext3 = document.querySelector('.nav-text3');
let navtext4 = document.querySelector('.nav-text4');
let navtext5 = document.querySelector('.nav-text5');

//the symbols on the nav bar, Location our story contact us....
let navSymbolsOrder = document.querySelector('.fa.fa-hamburger');
let navSymbolsPolicy = document.querySelector('.fa.fa-file-alt');
let navSymbolsContact = document.querySelector('.fa.fa-envelope');
let navSymbolsStory = document.querySelector('.fa.fa-book-open');
let navSymbolsLocation = document.querySelector('.fa.fa-map-pin');

//for the burger button
let burgerLine1 = document.querySelector('.burger_line');
let burgerLine2 = document.querySelector('.burger_line1');
let burgerLine3 = document.querySelector('.burger_line2');

function open_nav_bar() {
    let navBarElement = document.querySelector('.nav_bar');

    if (m % 2 === 0) {

        navBarElement.classList.remove('closing');
        navBarElement.classList.add('expand');

        setTimeout(() => navtext1.style.display = 'flex', 500);
        setTimeout(() => navtext2.style.display = 'flex', 500);
        setTimeout(() => navtext3.style.display = 'flex', 500);
        setTimeout(() => navtext4.style.display = 'flex', 500);
        setTimeout(() => navtext5.style.display = 'flex', 500);

        setTimeout(() => navSymbolsOrder.style.color = ' rgb(224, 230, 218)', 500);
        setTimeout(() => navSymbolsPolicy.style.color = ' rgb(224, 230, 218)', 500);
        setTimeout(() => navSymbolsLocation.style.color = ' rgb(224, 230, 218)', 500);
        setTimeout(() => navSymbolsContact.style.color = ' rgb(224, 230, 218)', 500);
        setTimeout(() => navSymbolsStory.style.color = ' rgb(224, 230, 218)', 500);

        setTimeout(() => {
            burgerLine1.style.backgroundColor = ' rgb(224, 230, 218)';
            burgerLine2.style.backgroundColor = ' rgb(224, 230, 218)';
            burgerLine3.style.backgroundColor = ' rgb(224, 230, 218)';
        }, 500);

    } else {
        navBarElement.classList.remove('closing');
        close_nav_bar();

    }
    m++;
}

function close_nav_bar() {
    let navBarElement = document.querySelector('.nav_bar');
    navBarElement.classList.remove('expand');
    navBarElement.classList.add('closing');

    navBarElement.addEventListener('animationend', function() {

        navBarElement.classList.remove('closing');
    }, { once: true });
    setTimeout(() => {
    navtext1.style.display = 'none';
    navtext2.style.display = 'none';
    navtext3.style.display = 'none';
    navtext4.style.display = 'none';
    navtext5.style.display = 'none';
    }, 500);

    setTimeout(() =>  navSymbolsOrder.style.color = '#333333', 250);
    setTimeout(() =>  navSymbolsPolicy.style.color = '#333333', 250);
    setTimeout(() =>  navSymbolsLocation.style.color = '#333333', 250);
    setTimeout(() =>  navSymbolsContact.style.color = '#333333', 250);
    setTimeout(() =>  navSymbolsStory.style.color = '#333333', 250);

    setTimeout(() => {
        burgerLine1.style.backgroundColor = '#333333';
        burgerLine2.style.backgroundColor = '#333333';
        burgerLine3.style.backgroundColor = '#333333';
    }, 250);

}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.305574, lng: -83.061870 },
        zoom: 15,
    });
    const request = {
        placeId: "ChIJw4b2PnQtO4gRhkwVkfJn_2s",
        fields: ["name", "formatted_address", "place_id", "geometry"],
    };
    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
            });
            google.maps.event.addListener(marker, "click", () => {
                const content = document.createElement("div");
                const nameElement = document.createElement("h2");
                nameElement.textContent = place.name;
                content.appendChild(nameElement);
                const placeIdElement = document.createElement("p");
                placeIdElement.textContent = place.place_id;
                content.appendChild(placeIdElement);
                const placeAddressElement = document.createElement("p");
                placeAddressElement.textContent = place.formatted_address;
                content.appendChild(placeAddressElement);
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });
        }
    });
}
window.initMap = initMap;

function openLink() {
    window.open("https://www.google.com/maps/dir/?api=1&destination=42.3095,-83.0714", "_blank");
}
