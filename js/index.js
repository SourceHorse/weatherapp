var lat = 0;
var long = 0;
var temp = 0;
var tempMin = 0;
var tempMax = 0;
var condit = "";
var hiNloC = "";
var hiNloF = "";
var currentFC = '';
var tempfield = document.getElementById('temp');

//CLICK EVENT TO GET WEATHER
$('#weatherBtn').on('click', function() {
  $('#content').animate({opacity: 0}, 1000);
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    weather();
  });
   
  };
  
  GetClock();
  setInterval(GetClock,1000);
  
});

//WEATHER FUNCTION
function weather() {
$.ajax({
  url: "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long,
 //url: "https://fcc-weather-api.glitch.me/api/current?lat=36&lon=-110", //SWAP URLS TO TEST DIFFERENT LOCATIONS
  
  type: 'GET',
  dataType: 'JSON',
  success: function(a) {
    temp = Math.floor(a.main.temp); 
    tempMin = Math.floor(a.main.temp_min);
    tempMax = Math.floor(a.main.temp_max);
    tempC = temp + '°C'
    hiNloC = '<div><div>' + tempMin + '</div><br><div class = "margin-up">low</div></div> <div><div>' + tempMax + '</div><br><div class = "margin-up">high</div></div>';
    hiNloF = '<div><div>' + (Math.floor(tempMin * 9 / 5 + 32)) + '</div><br><div class = "margin-up">low</div></div> <div><div>' + (Math.floor(tempMax * 9 / 5 + 32)) + '</div><br><div class = "margin-up">high</div></div>';


    currentFC = hiNloC;
    $('#weatherBtn').appendTo($('#btnrelocate')).text('Refresh');
    $('#city').text(a.name);
    $('#briefdes').text(a.weather[0].main);
    $('#conditions').text(a.weather[0].description);
    $('#icon').html('<img src = "' + a.weather[0].icon + '">');
    $('#temp').text(tempC);
    $('#hilo').html(currentFC);
    $('#humidity').html('<div class = "midfont">' + a.main.humidity + '%</div><div class = "smallfont margin-up">Humidity</div>')
    $('#content').animate({opacity: 1}, 1000);
    
//RESIZE CITY NAME BASED ON LENGTH
    var nameLength = a.name.length;
    var startFont = 7;
    var sizedFont = 0;
    if (nameLength > 14) {
      sizedFont = startFont - 5 + 'em'
      $('#city').css('font-size', sizedFont);  
    } else if (nameLength > 10) {
      sizedFont = startFont - 4 + 'em'
      $('#city').css('font-size', sizedFont);
    } else if (nameLength > 8) {
      sizedFont = startFont - 3 + 'em'
      $('#city').css('font-size', sizedFont);
    } else if (nameLength > 5) {
      sizedFont = startFont - 2 + 'em'
      $('#city').css('font-size', sizedFont);
    } else {
      $('#city').css('font-size', (startFont + 'em'));
    };

    
}}); //END AJAX

//GET URL FOR TROUBLESHOOTING
$('#apiurl').text("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long);

} //END WEATHER FUNCTION

//CELCIUS FAHRENHEIT CONVERSION FUNCTION
//CURRENT TEMPERATURE CONVERSION
$('#cf').on('click', function() {
  if ($('#temp').text() == tempC) {
    $('#temp').text(Math.floor(temp * 9 / 5 + 32) + '°F');
  } else {
    $('#temp').text(tempC);
  };
//DAILY HIGH AND LOW CONVERSION
  if (currentFC == hiNloC) {
    currentFC = hiNloF;
  $('#hilo').html(currentFC);
  } else {
    currentFC = hiNloC;
  $('#hilo').html(currentFC);
  }
  });

//CLOCK FUNCTION
tday = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
tmonth = new Array ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

function GetClock() {
var d = new Date();
var nday = d.getDay(), nmonth = d.getMonth(), ndate = d.getDate(), nyear = d.getFullYear();
var nhour = d.getHours(), nmin = d.getMinutes(), nsec = d.getSeconds(), ap;

if (nhour == 0) {
  ap = " AM";
  nhour = 12;
} else if (nhour < 12) {
  ap = " AM";
} else if (nhour == 12) {
  ap = " PM";
} else if (nhour > 12) {
  ap = " PM";
  nhour -= 12;
}

if (nmin <= 9) nmin = "0" + nmin;
if (nsec <= 9) nsec = "0" + nsec;

$('#clockbox').html('<div>'+nhour+':'+nmin+':'+nsec+ap+'</div><div class = "smallfont">'+tday[nday]+', '+tmonth[nmonth]+' '+ndate+', '+nyear+'</div>');
}