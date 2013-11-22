
// Namespace voor de score app. Als de FED_APP nog niet bestaat maak 'm aan.
var FED_APP = FED_APP || {};

(function () { // Dit is een self-invoking function. D.w.z:
	// De routing zorgt ervoor dat als er op een link wordt geklikt de data wordt getoond die bij de link hoort. Het template wordt later in de code
	// gemaakt met transparency.
	FED_APP.settings = {
		scheduleDataUrl : "https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id=19219&access_token=740211582f",
		poolDataUrl : "https://api.leaguevine.com/v1/pools/?tournament_id=19389&name=a&fields=%5Bname%2C%20standings%5D&access_token=07045a371c",
		gameScoreUrl : "https://api.leaguevine.com/v1/games/"
	}
	// Als de dom ready is wordt de init methode binnen heb routing object aangeroepen
	FED_APP.init = function (){
		FED_APP.routing.init();
		//FED_APP.gestures.registerSwipeLeft();
		//FED_APP.gestures.registerSwipeRight();
	}  

	// Het post object
	FED_APP.post = {
		gameScore : function () {
			// De data die meegestuurd wordt aan de post pagina. Zo worden de huidige scores aangegeven.
			// Deze data heeft promise nodig om te posten (url, data, headers)
			var data = JSON.stringify({
				    team_1_score: document.getElementById('team_1_score').value,
				    team_2_score: document.getElementById('team_2_score').value,
				    is_final: 'True',
				    game_id: document.getElementById('game_id').value
				});
				// De url waar naartoe gepost wordt en de informatie opgehaald kan worden.
			var url = "https://api.leaguevine.com/v1/game_scores/";
				// De headers voor de Leaguevine API
			var headers = {
				'Content-type':'application/json',
				'Accept' : 'application/json',
				'Authorization':'bearer 35ac044018'
			};
			// Promise doet de post van de url, data en headers.
			promise.post(url, data, headers).then(function(error, text, xhr) {
			    if (error) {
			        alert('Error ' + xhr.status);
			        return;
			    } else {
			    	document.location.href = '#schedule';
			    }
			});
		}
	}
	// Het routing object (routie)
	FED_APP.routing = {
		init : function() {
			routie({

			    'schedule': function() { // Als routie 'schedule' in de url tegen komt wordt showSchedulPage() aangeroepen
			    	FED_APP.pages.showSchedulePage();
			    	FED_APP.toggle.isSelected('j-scheduleanchor', true);
			    	FED_APP.toggle.isSelected('j-rankinganchor', false);
			    },

				'updategame/:id': function(id) { 	// Als routie 'updategame/:id' in de url tegen komt wordt showUpdateGamePage() aangeroepen
												// en de id van de game meegestuurd.
			    	FED_APP.pages.showUpdateGamePage(id);
			    },

			    'ranking, *': function() { 	// Als routie 'ranking' in de url tegen komt wordt showrankingpage aangeroepen. Als er niets in de
			    							// url staat wordt deze functie ook aangeroepen.
			    	FED_APP.pages.showRankingPage();
			    	FED_APP.toggle.isSelected('j-rankinganchor', true);
			    	FED_APP.toggle.isSelected('j-scheduleanchor', false);
			    }

			});
		}
	}

	FED_APP.gestures = {
		registerSwipeLeft : function (){
			var element = document.getElementById('body');
   		var hammertime = Hammer(element).on("dragleft", function(event) {
    			FED_APP.pages.showSchedulePage();
    		});
		},
		registerSwipeRight : function (){
			var element = document.getElementById('body');
    		var hammertime = Hammer(element).on("dragright", function(event) {
    			FED_APP.pages.showRankingPage();
    		});
		}
	}

	FED_APP.toggle = {
		showHide : function (elementId, show){
			var e = document.getElementById(elementId);

			if (show) {
				e.className = e.className.replace('', 'show ');
			} else {
				e.className = e.className.replace('show ', '');
			}
		},

		isSelected : function (elementId, selected){
			// opzetje voor de is-selected addClass functie voor menuitems
			var e = document.getElementById(elementId);

			if(selected) {
				e.className = e.className.replace('', 'is-selected ');
			} else {
				e.className = e.className.replace('is-selected ', '');
			}
		}
	}

	FED_APP.loader = {

		show : function (){
			FED_APP.toggle.showHide('j-loader', true);
		},
		hide : function (){
			FED_APP.toggle.showHide('j-loader', false);
		}
	}

	// Hier wordt de variabele content van de pagina's gegenereerd.
	FED_APP.pages = {
		showSchedulePage : function() {
			FED_APP.pages.hideAllPages();

			FED_APP.data.getScheduleData( function(scheduleData) {
				FED_APP.toggle.showHide('j-scheduleData', true);

				var directives = {
					id: {
						text: function(){
							return ""
						},
						href: function() {
							return "#updateGame/" + this.id;
						}
					},

					start_time: {
						text: function(){
							return new Date(this.start_time).toString(" d MMM HH:mm"); 
						}
					}
				};

				Transparency.render(document.getElementById('j-scheduleTable'), scheduleData, directives);
				FED_APP.loader.hide();
			});


		},
		
		showRankingPage : function() {
			FED_APP.pages.hideAllPages();	

			FED_APP.data.getGameData( function(rankingData) {
				FED_APP.toggle.showHide('j-rankingData', true);
				Transparency.render(document.getElementById('j-rankingData'), rankingData);
				FED_APP.loader.hide();
			});
		},

		showUpdateGamePage : function(id) {
			FED_APP.pages.hideAllPages();	

			FED_APP.data.getGameScore( id, function(gameScore) {
				FED_APP.toggle.showHide('j-updateGame', true);
				Transparency.render(document.getElementById('j-updateGame'), gameScore);
				FED_APP.loader.hide();
			});
		},

		hideAllPages : function() {
			FED_APP.toggle.showHide('j-scheduleData', false);
			FED_APP.toggle.showHide('j-rankingData', false);
			FED_APP.toggle.showHide('j-updateGame', false);
		}
	}

	FED_APP.data = { //Hier wordt de (nu nog) statische data opgehaald.
		getGameData : function(callback){

			promise.get(FED_APP.settings.poolDataUrl).then(function(error, text, xhr) {
			    if (error) {
			        alert('Error ' + xhr.status);
			        return;
			    }

			    // in deze variabele staat alle informatie (een string) die we hebben teruggekregen van promise. Deze wordt hier
			    // netjes omgetoverd tot object.
			     var json = JSON.parse(text);

			     json.objects;
			     callback(json.objects[0]);

			});
			FED_APP.loader.show();
		},

		getScheduleData : function(callback){

			promise.get(FED_APP.settings.scheduleDataUrl).then(function(error, text, xhr) {
			    if (error) {
			        alert('Error ' + xhr.status);
			        return;
			    }

			    // in deze variabele staat alle informatie (een string) die we hebben teruggekregen van promise. Deze wordt hier
			    // netjes omgetoverd tot object.
			     var json = JSON.parse(text);

			     json.objects;
			     callback(json.objects);
			});
			FED_APP.loader.show();
		},

		getGameScore : function(id, callback){

			promise.get(FED_APP.settings.gameScoreUrl + id + '/').then(function(error, text, xhr) {
			    if (error) {
			        alert('Error ' + xhr.status);
			        return;
			    }

			    // in deze variabele staat alle informatie (een string) die we hebben teruggekregen van promise. Deze wordt hier
			    // netjes omgetoverd tot object.
			     var json = JSON.parse(text);

			     json.objects;
			     callback(json);
			});
			FED_APP.loader.show();
		},
	}

	// DOM ready
	domready(function () {
		// Kickstart application
		FED_APP.init();
	});

})();