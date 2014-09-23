var lat = 0;
var lon = 0;

var isFreezed = false;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        if(!isFreezed) {
            setInterval(function () {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }, 1000);
        }
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;  
    $('#lat').text(lat);
    $('#lon').text(lon);
}

function showError(error) {

    if(isFreezed)   return;
    isFreezed = true;

    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
                break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
                break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
                break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
                break;
    }
}

/* Main */
$( document ).ready(function() {
    $('#find-me-btn').click(function() {
        getLocation();
        $('#setup-div').hide("slow");
        $('#result-container').show("slow");
    });
    $('.reload').click(function() {
        location.reload();
    });
});
