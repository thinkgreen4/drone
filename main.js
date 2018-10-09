var queryURL =  "api.dronestre.am/data "

    var locations = []
    var places = []
    var narrative = []
    var killed = []

    
    $("#add-data").on("click", function(event) {
        event.preventDefault();

        var userBeginMessy = $("#startDate").val()
        var userBeginMessytoo = userBeginMessy.replace("-", "")
        var userBegin = userBeginMessytoo.replace("-", "")
        
        var userEndMessy = $("#endDate").val()
        var userEndMessytoo = userEndMessy.replace("-", "")
        var userEnd = userEndMessytoo.replace("-", "")
        console.log(userBegin);

    $.ajax({
    method: "GET",
    url: "https://cors-anywhere.herokuapp.com/https://api.dronestre.am/data",
    }).then(function(data) {
        console.log(data);

    var drone = data.strike;
    var droneLength = drone.length;

    for (n =0; n < droneLength; n++){

        instaData = $("<p> </p>");

        var droneDate = data.strike[n].date;
        var droneYear = droneDate.substring(0,10).toString();
        
        var dateSlice = droneYear.replace("-", "");
        var dataSliceToo = dateSlice.replace("-", "");

        var lon = data.strike[n].lon;
        var lat = data.strike[n].lat;
        var dronePlace = data.strike[n].location;
        var droneNarrative = data.strike[n].narrative
        var death = data.strike[n].deaths

        if (dataSliceToo>=userBegin && dataSliceToo<=userEnd) {

            locations.push([lon, lat]);
            places.push([dronePlace]);
            narrative.push([droneNarrative]);
            killed.push([death]);
            //   console.log(droneDate)
            // instaData.text(droneDate)
            // // console.log(instaData)
            //  $(".Output").append(instaData)
        }
    } 

    //  console.log(locations)
        console.log(locations.length);
        console.log(places);

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 1,
            center: new google.maps.LatLng(-33.92, 151.25),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        var summaryDiv = $("<div>")

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][0]),
            map: map
        });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(places[i][0]);
                    infowindow.open(map, marker);

                    //modal
                    $('#myModal').on('shown.bs.modal')
                        $('#myInput').trigger('focus')
                
                
                    $("#modal-info").prepend(summaryDiv);
                    $(summaryDiv).append(" ", "  Strike narrative:  ", narrative[i],"  Number killed  ", killed[i]);
                }
            })(marker, i));
        //   console.log(locations[i][0], locations[i][1])
        }

    });

});

////////////////////////////Google Maps///////////////////////////////////////////

    var map;

    function initMap() {
        var myLatLng = {lat: 40.747, lng: -111.89};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: myLatLng
        });

    } 