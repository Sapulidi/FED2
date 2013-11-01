
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
			    },

				'updategame/:id': function(id) { 	// Als routie 'updategame/:id' in de url tegen komt wordt showUpdateGamePage() aangeroepen
													// en de id van de game meegestuurd.
			    	FED_APP.pages.showUpdateGamePage(id);
			    },

			    'ranking, *': function() { 	// Als routie 'ranking' in de url tegen komt wordt showrankingpage aangeroepen. Als er niets in de
			    							// url staat wordt deze functie ook aangeroepen.
			    	FED_APP.pages.showRankingPage();
			    }

			});
		}
	}

	// Hier wordt de variabele content van de pagina's gegenereerd.
	FED_APP.pages = {
		showSchedulePage : function() {
			FED_APP.pages.hideAllPages();

			FED_APP.data.getScheduleData( function(scheduleData) {
				(document.getElementById('scheduleData')).style.display = 'block' ;

				var directives = {
					id: {
						text: function(params){
							return "Update score"
						},
						href: function(params) {
							return "#updateGame/" + this.id;
						}
					},

					start_time: {
						text: function(params){
							return new Date(this.start_time).toString("dddd d MMMM HH:mm"); 
						}
					}
				};

				Transparency.render(document.getElementById('scheduleTable'), scheduleData, directives);
			});

		},
		
		showRankingPage : function() {
			FED_APP.pages.hideAllPages();	

			FED_APP.data.getGameData( function(rankingData) {
				(document.getElementById('rankingData')).style.display = 'block' ;
				Transparency.render(document.getElementById('rankingData'), rankingData);
			});
		},

		showUpdateGamePage : function(id) {
			FED_APP.pages.hideAllPages();	

			FED_APP.data.getGameScore( id, function(gameScore) {
				(document.getElementById('updateGame')).style.display = 'block' ;
				Transparency.render(document.getElementById('updateGame'), gameScore);
			});
				
		},

		hideAllPages : function() {
			(document.getElementById('scheduleData')).style.display = 'none' ; // Verander de (inline) css naar display none
			(document.getElementById('rankingData')).style.display = 'none' ;
			(document.getElementById('updateGame')).style.display = 'none' ;
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
		},
		
	}

	// DOM ready
	domready(function () {
		// Kickstart application
		FED_APP.init();
	});

})();