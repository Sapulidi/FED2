
// Namespace voor de score app. Als de SCORE_APP nog niet bestaat maak 'm aan.
var SCORE_APP = SCORE_APP || {};

(function () { // Dit is een self-invoking function. D.w.z:
	// De routing zorgt ervoor dat als er op een link wordt geklikt de data wordt getoond die bij de link hoort. Het template wordt later in de code
	// gemaakt met transparency.
	SCORE_APP.routing = {
		init : function() {
			routie({

			    'schedule': function() { //methode van het object SCORE_APP.routing
			    	SCORE_APP.pages.showSchedulePage();
			    },

			    'ranking': function() {
			    	SCORE_APP.pages.showRankingPage();
			    },

			    'game, *' : function () { //Als geen toevoeging: laat de game page zien
			    	SCORE_APP.pages.showGamePage();
			    }

			});
		}
	}
	// Hier wordt de variabele content van de pagina's gegenereerd.
	SCORE_APP.pages = {
		showGamePage : function() { // Methode
			SCORE_APP.pages.hideAllPages();
			Transparency.render(document.getElementById('game-data'), SCORE_APP.data.game.tableData); //Render de data voor de corresponderende pagina
			Transparency.render(document.getElementById('heading'), SCORE_APP.data.game.heading); //Render de heading voor de corresponderende pagina
			(document.getElementById('game')).style.display = 'block' ; // Zet de display (css, inline) naar block om de 
		},
		showSchedulePage : function() {
			SCORE_APP.pages.hideAllPages();
			Transparency.render(document.getElementById('schedule-data'), SCORE_APP.data.schedule.tableData);
			Transparency.render(document.getElementById('heading'), SCORE_APP.data.schedule.heading);
			(document.getElementById('schedule')).style.display = 'block' ;
		},
		showRankingPage : function() {
			SCORE_APP.pages.hideAllPages();
			Transparency.render(document.getElementById('ranking-data'), SCORE_APP.data.ranking.tableData);
			Transparency.render(document.getElementById('heading'), SCORE_APP.data.ranking.heading);
			(document.getElementById('ranking')).style.display = 'block' ;
		},

		hideAllPages : function() {
			(document.getElementById('game')).style.display = 'none' ; // Verander de (inline) css naar display none
			(document.getElementById('schedule')).style.display = 'none' ;
			(document.getElementById('ranking')).style.display = 'none' ;
		}
	}

	SCORE_APP.data = { //Hier wordt de (nu nog) statische data opgehaald.
		game : {
			heading : [
				{ headingContent: "Pool A - Game" }
				],
			tableData :	[
			    { score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
			    { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
			    { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
			    { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
			    { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
			    { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
			    { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
			    { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
			    { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
			    { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
			    { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
			    { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
			    { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
			    { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
			    { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
			    { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
			    { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
			    { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
			    { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
			    { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
			    { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
			    { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
			    { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
			]
		},

	    schedule : {
	    	heading:  [
	    		{ headingContent: "Pool A - Schedule" }
	    		],
	    	tableData : [
			    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
			    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
			    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
			    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
			    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
			    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
			    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
			    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
			    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
			    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
		    ]
		},

		ranking : {
			heading:  [
				{ headingContent: "Pool A - Ranking" }
				],
			tableData : [
			    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
			    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
			    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
			    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
			    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
		    ]
		}
	}

	// DOM ready
	domready(function () {
		// Kickstart application
		SCORE_APP.routing.init();
		alert("werkt dit?");
	});

})();