$(document).ready(function(){
// on pageloader
	$.ajax({ 
				url: 'http://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=cf1c34c76955d8b4050f34d47495ed1f',
				type: "GET",
				dataType: "jsonp",
				success: function(data){
					temperature = data.main.temp.toFixed(0);
					$("#temp").html(data.main.temp.toFixed(0)+'° C');
					$("#city_name").html(data.name + ",");
					$("#country").html(data.sys.country);
					$("#weather_icon").html("<img src='https://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png'>");
					$("#desc").html(data.weather[0].description);
					$("#humidity_level").html(data.main.humidity + "%");
					$("#wind_speed").html(data.wind.speed + "km/h");
				},
				
    });
	$('#flexSwitchCheckChecked').click(function () {
		console.log($(this).attr('id'));  //-->this will console id of checked checkbox.
		if (this.checked) {
			console.log("toggle on")
			$("#temp").html(((temperature*1.8)+32).toFixed(0) +'° F');
		}
		else{
			console.log("toggle off")
			$("#temp").html(temperature +'° C');
			//$(".target").toggle(true);
		}
	});

	$('#submitLocation').click(function(e){
		e.preventDefault();
		var city = $("#input_city").val();
		var temperature;
		if (city != ''){
			$.ajax({
				url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&appid=cf1c34c76955d8b4050f34d47495ed1f",
				type: "GET",
				dataType: "jsonp",
				success: function(data){
					temperature = data.main.temp.toFixed(0);
					$("#temp").html(data.main.temp.toFixed(0)+'° C');
					$("#city_name").html(data.name + ",");
					$("#country").html(data.sys.country);
					$("#weather_icon").html("<img src='https://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png'>");
					$("#desc").html(data.weather[0].description);
					$("#humidity_level").html(data.main.humidity + "%");
					$("#wind_speed").html(data.wind.speed + "km/h");
					$("#input_city").val('');
					//console.log()
				},
				error: function() {
                    alert("Please enter valid city name or zip code!!!");
                }
			});

			$('#flexSwitchCheckChecked').click(function () {
				console.log($(this).attr('id'));  //-->this will console id of checked checkbox.
				if (this.checked) {
					console.log("toggle on")
					$("#temp").html(((temperature*1.8)+32).toFixed(0) +'° F');
				}
				else{
					console.log("toggle off")
					$("#temp").html(temperature +'° C');
					//$(".target").toggle(true);
				}
			});
		}else{
			// $("alert()").html('Field cannot be empty');
			alert("Field cannot be empty")
		}
	});

//--> Geolocation codes here 

	$('#useLocation').click(function(e){
		e.preventDefault();
		navigator.geolocation.getCurrentPosition(onPositionUpdate, showError);
	});
	
	function onPositionUpdate(position) {
		console.log(position)
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var temperature;
		$.ajax({
			url : "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=cf1c34c76955d8b4050f34d47495ed1f",
			dataType : "jsonp",
			success: function(data){
				temperature = data.main.temp.toFixed(0);
				$("#temp").html(data.main.temp.toFixed(0)+'° C');
				$("#city_name").html(data.name + ",");
				$("#country").html(data.sys.country);
				$("#desc").html(data.weather[0].description);
				$("#weather_icon").html("<img src='https://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png'>");
			}
		});

		$('#flexSwitchCheckChecked').click(function () {
			console.log($(this).attr('id'));  //-->this will console id of checked checkbox.
			if (this.checked) {
				console.log("toggle on")
				$("#temp").html(((temperature*1.8)+32).toFixed(0) +'° F');
			}
			else{
				console.log("toggle off")
				$("#temp").html(temperature +'° C');
				//$(".target").toggle(true);
			}
		});
	}

	function showError(error) {
		switch(error.code) {
		  case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation.")
			break;
		  case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.")
			break;
		  case error.TIMEOUT:
			alert("The request to get user location timed out.")
			break;
		  case error.UNKNOWN_ERROR:
			alert("An unknown error occurred.")
			break;
		}
	}
	
});
