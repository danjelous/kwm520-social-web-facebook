'use strict';

var latitude = 48;
var longitude = 14;
var map;

$(document).ready(() => {

    console.log("Ready to go");

    // Button styling, lol
    $("button").button();

    // Setup when click on login
    $("#login").click(() => {

        FB.login((response) => {

            // Login successfull
            if (response.authResponse) {

                $("button").button("option", "disabled", false);
                $("#login").button("option", "disabled", true);
                showUserDetails();
            }
        },
            (error) => {

                // Well, not so
            });
    });

    $("#showfriends").click(() => {

        emptyAndHideAll();
        showFriends();
    });

    createMap();
    initMap();
});

function calculateAndDisplayRoute(currentPos, hometown) {

}

function displayError(positionError) {
  alert("error");
}

function createMap() {
    let coord = new google.maps.LatLng(latitude, longitude);

    var options = {
        zoom: 8,
        center: coord,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map-canvas"), options);
}

function initMap(){
    
    try {
        if(typeof(navigator.geolocation) == 'undefined'){
            alert("I'm sorry, but geolocation services are not supported by your browser.");
        } else {
            var gl = navigator.geolocation;
            gl.getCurrentPosition(displayPosition, displayError);
        }
    }catch(e){}
}

function showLocation(){
    if (hometown != null && hometown.name != null && currentUser != null){
        var geocoder = new google.maps.Geocoder();
        if(geocoder) {
            geocoder.geocode(
            {address : hometown.name}, 
            function(results, status) {
                if(status == google.maps.GeocoderStatus.OK) {
                    userLatLong = results[0].geometry.location;
                    map.setCenter(userLatLong);
                    /*if (marker != null){
                        marker.setMap(null);
                    }    */
                    marker = new google.maps.Marker({
                        position: userLatLong,
                        map: map,
                        icon: {url:'home.gif'},
                        title: currentUser.name
                    });
                    calculateAndDisplayRoute(curLatLong,userLatLong)
                    google.maps.event.addListener(marker, "click", function() {
                        createInfoWindow(currentUser,marker);
                    });
                } else {
                    alert(address + " was not found.");
                }
            });
        }
    } else {
        alert("User does not provide hometown");
    }    
}

function displayPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    curLatLong = new google.maps.LatLng(latitude, longitude);
    var currentLocation = new google.maps.Marker({
        position: curLatLong,
        map: map,
        title: "Your location"
    });
    map.setCenter(curLatLong);
    console.log("got current pos");
    calculateAndDisplayRoute(curLatLong,userLatLong);
}

function showLikes(user) {

    if(user) {
        let html = user + " likes : <br>";
        FB.api('/' + user + '/likes', (likes) => {

            if(likes && likes.data) {
                for(let like in likes) {
                    html += likes.data[like].name + " - ";
                }
            }
        });

        $("#likes").empty().html(html).show();
    }
}

function showFriends() {

    FB.api(
        'me/friends', (list) => {
            console.log(list);
        }
    )
}

function emptyAndHideAll() {

    // Possible refactoring detected :)
    $("#details").empty().hide();
    $("#friends").empty().hide();
    $("#likes").empty().hide();
}

function showUserDetails() {

    FB.api(
        '/me',
        'GET',
        { "fields": "hometown,birthday,name" },
        function (response) {

            // Insert your code here
            if (response) {
                let currentUser = response.id;
                let html =
                    `<div id="pic">
                        <img src="http://graph.facebook.com/${currentUser}/picture/">
                    </div>`;

                $('#user').empty().html(html).show();
                showLikes(currentUser);
            }
        }
    );
}