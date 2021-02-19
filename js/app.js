"use strict";

var navigationControl = function(the_link){
	/* manage the appearance of the navigation*/
	$(".WeatherNavlink").parent("li").removeClass("active");
	/* remove the active class from all <li> parents */
	$(the_link).parent("li").addClass("active");
	/* add the active class to the_link anchor's <li> parent */
	
	/* manage the conent that is displayed */
	var idToShow = $(the_link).attr("href");
	
	/* hide all content-wrappers */
	$(".content-wrapper").hide();
	/* show the chosen content wrapper */
	$(idToShow).show();
	
	/* scroll to top of page */
	$("html, body").animate({ scrollTop: "0px" });
	
}

var daily_weather = function(){

	var the_serialized_data = $("#frm_send_weather_info").serialize();
	console.log(the_serialized_data);
	var temp_units = $("#units").val();
	 
	$.getJSON('https://api.weatherbit.io/v2.0/current',the_serialized_data, function(data) {
		console.log(data);
		if (temp_units == 'I' || temp_units == 'i'){
			$("#CurrentWeatherTable").append('<tr><th style = "padding: 10px;"><i class="fas fa-thermometer-half"></i> Temperature: </th><td style = "padding: 10px;">' + data['data'][0]['temp'] + '&deg; F </td> </tr>');
			$("#CurrentWeatherTable").append('<tr><th style = "padding: 10px;"><i class="fas fa-thermometer-full"></i> "Feels Like" Temperature: </th><td style = "padding: 10px;">' + data['data'][0]['app_temp'] + '&deg; F </td></tr>');
			$('#CurrentWeatherTable').append('<tr><th style = "padding: 10px;"><i class="fas fa-wind"></i> Wind Speed and Dircetion: </th><td style = "padding: 10px;">' + data['data'][0]['wind_spd'] + 'mph ' + data['data'][0]['wind_cdir'] + '</td></tr>');
		} else if (temp_units == 'S' || temp_units == 's'){
			$("#CurrentWeatherTable").append('<tr><th style = "padding: 10px;"><i class="fas fa-thermometer-half"></i> Temperature: </th><td style = "padding: 10px;">' + data['data'][0]['temp'] + ' Kelvin </td> </tr>');
			$("#CurrentWeatherTable").append('<tr><th style = "padding: 10px;"><i class="fas fa-thermometer-full"></i> "Feels Like" Temperature: </th><td style = "padding: 10px;">' + data['data'][0]['app_temp'] + ' Kelvin </td></tr>');
			$('#CurrentWeatherTable').append('<tr><th style = "padding: 10px;"><i class="fas fa-wind"></i> Wind Speed and Dircetion: </th><td style = "padding: 10px;">' + data['data'][0]['wind_spd'] + 'mph ' + data['data'][0]['wind_cdir'] + '</td></tr>');
		} else {
			$("#CurrentWeatherTable").append('<tr><th style = "padding: 10px;"><i class="fas fa-thermometer-half"></i> Temperature: </th><td style = "padding: 10px;">' + data['data'][0]['temp'] + '&deg; C </td> </tr>');
			$("#CurrentWeatherTable").append('<tr><th style = "padding: 10px;"><i class="fas fa-thermometer-full"></i> "Feels Like" Temperature: </th><td style = "padding: 10px;">' + data['data'][0]['app_temp'] + '&deg; C </td></tr>');
			$('#CurrentWeatherTable').append('<tr><th style = "padding: 10px;"><i class="fas fa-wind"></i> Wind Speed and Dircetion: </th><td style = "padding: 10px;">' + data['data'][0]['wind_spd'] + 'mph ' + data['data'][0]['wind_cdir'] + '</td></tr>');
		}

		$("#CurrentWeatherTable").append('<tr><th style = "padding: 10px;"><i class="fas fa-location-arrow"></i> Location (City, State/Code, Country): </th><td style = "padding: 10px;">'+ data['data'][0]['city_name'] + ', ' + data['data'][0]['state_code'] + ', ' + data['data'][0]['country_code'] + '</td></tr>');
		$('#CurrentWeatherTable').append('<tr><th style = "padding: 10px;"><i class="fas fa-cloud-sun"></i> Weather Description: </th><td style = "padding: 10px;">' + data['data'][0]['weather']['description'] + '</td></tr>');
		$('#CurrentWeatherTable').append('<tr><th style = "padding: 10px;"><i class="fas fa-cloud"></i> Cloud Coverage: </th><td style = "padding: 10px;">' + data['data'][0]['clouds'] + '% </td></tr>');
		$('#CurrentWeatherTable').append('<tr><th style = "padding: 10px;"><i class="fas fa-tint"></i> Relative humidity: </th><td style = "padding: 10px;">' + data['data'][0]['rh'] + '% </td></tr>');


		$('#HeaderForcast').html('Forcasting for ' + data['data'][0]['city_name'] + ', ' + data['data'][0]['state_code'] + ', ' + data['data'][0]['country_code'])
	}); // end of .getJSON
	 

}; //end of daily_weather

var weather_forcast = function(){
	var the_serialized_data = $("#frm_forcasting").serialize();
	console.log(the_serialized_data);
	var temp_unit = $("#units").val();
	console.log(temp_unit)

	$.getJSON('https://api.weatherbit.io/v2.0/forecast/daily', the_serialized_data, function (data){
		//console.log(data);
		$("#weather").append('<tr><th style = "padding: 5px;"><i class="fas fa-calendar-alt"></i> Date (YYYY-MM-DD): </th><th style = "padding: 5px;"><i class="fas fa-thermometer-half"></i> Tempeture: </th><th style = "padding: 5px;"> Description: <th></tr>')
		for(var i = 0; i < data['data'].length; i++) {
			console.log(data['data'][i]);
			if (temp_unit == 'I' || temp_unit == 'i'){
				$("#weather").append('<tr><td style = "padding: 5px;">' + data['data'][i]['valid_date'] + '</td><td style = "padding: 5px;">' + data['data'][i]['temp'] + '&deg; F </td><td style = "padding: 5px;">' + data['data'][i]['weather']['description'] + '</td></tr>')
			} else if (temp_unit == 'S' || temp_unit == 's'){
				$("#weather").append('<tr><td style = "padding: 5px;">' + data['data'][i]['valid_date'] + '</td><td style = "padding: 5px;">' + data['data'][i]['temp'] + ' Kelvin </td><td style = "padding: 5px;">' + data['data'][i]['weather']['description'] + '</td></tr>')
			} else {
				$("#weather").append('<tr><td style = "padding: 5px;">' + data['data'][i]['valid_date'] + '</td><td style = "padding: 5px;">' + data['data'][i]['temp'] + '&deg; C </td><td style = "padding: 5px;">' + data['data'][i]['weather']['description'] + '</td></tr>')
			}
			
		} // end of for loop 

	});// end of .getJSON

}; //end of weather_forcast 

$(document).ready(function (){

    /* ------------------  basic navigation ----------------*/    
   
    /* this reveals the default page */
    $("#wrapperCurrent").show();
    $("a[href='#wrapperCurrent']").parent("li").addClass("active");
    
    /* this controls navigation - show / hide pages as needed */
    /* when a WeatherNavlink is clicked */

    $(".WeatherNavlink").click(function(){
		navigationControl(this);
        });
    
    
   /* ------------------  Weather button logic -----------------------------------------------*/    
	//when the Weather button is clicked ...
    $("#btnGetWeather").click( function() {

		$('#CurrentWeatherTable').html('');
		$('#danger').html('');
		
		var temp_units = $("#units").val();
        var city = $("#city").val();
        var state = $("#state").val();
    	var country = $("#country").val();
                
        if (city == '' || isNaN(city) == false) {
            $("#danger").html('Please enter a valid city');
        } else {
			daily_weather();
			$("#city_forcasting").val(city);
			$("#state_forcasting").val(state);
			$("#country_forcasting").val(country);
			$("#units_forcasting").val(temp_units);
		}
        
    }); // end click() method (Weather button)

	$('#btnGetForcasting').click(function(){
		
		var city_forcasting = $("#city_forcasting").val();
		var state_forcasting = $("#state_forcasting").val();
		var country_forcasting = $("#country_forcasting").val();
		var units_forcasting = $("#units_forcasting").val();
		var days_forcatsing = $("#days_forcasting").val(); 

		$("#weather").html('');
		$('#share_danger').html('');

		if ( isNaN(days_forcatsing) == true || days_forcasting == '') {
			$('#share_danger').html('Please enter a number between 1-16.');
		} else if (city_forcasting == '') {
			$('#share_danger').html('Please enter a city name under the Current Weather tab.');
		}else{
			weather_forcast();
		}

	}); // end forcasting button
	
	
    }); /* end the document ready event*/
