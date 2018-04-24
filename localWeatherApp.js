var apiCallStr = "https://fcc-weather-api.glitch.me/api/current?";
var latitude = '';
var longitude = '';

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, fail);
 // $('#contentDiv').html('Checking location now...');
}
// Display message if location cannot be established
else {
  $('#contentDiv').html('Sorry, unable to establish your location...');
}

function success(position) {
  //console.log('getCurrentPosition was a success');
  latitude = "lat=" + position.coords.latitude;      // used to build apiCallStr
  longitude = "lon=" + position.coords.longitude;    // used to build apiCallStr
  
  $('#latitude').text("Latitude: " + position.coords.latitude); // display latitude on screen
  $('#longitude').text("Longitude: " + position.coords.longitude); // display longitude on screen
  
  apiCallStr += latitude + "&" + longitude;
  
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: apiCallStr,
    cache: false,
    success: function(data) {
      console.log('Hello from the success function inside ajax method');
      console.log(data);
      var localWeather = (data.main.temp);
      $('#weatherInfo').text(localWeather);
      var imgSrc = data.weather[0].icon;
      $('#icon').html('<img src=' + imgSrc + ' alt="weather icon image" />');
      
      //$('#weatherInfo').text(localWeather);
      //$('#icon').html("<img src='icon' alt='icon img' title='iconImg' />");
    },
    error: function(data) {
      console.log('Hello from the error function inside the ajax method.... There was an error.');
      console.log(data.status); //pg. 389
      console.log(data.statusText);
      console.log(errorThrown);
    }
  });
}

function fail(position) {
  console.log('hello from the fail function... getCurrentPosition failed');
  $('#contentDiv').html('getCurrentPosition failed...');
  console.log(position.code);
  console.log(position.message);
}
