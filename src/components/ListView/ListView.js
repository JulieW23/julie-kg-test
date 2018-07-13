import React, { Component } from 'react'
import Game from '../Game/Game';
// import { Accordion, Icon, Segment } from 'semantic-ui-react'

class ListView extends Component {

	constructor(props){
		super(props);
		this.setFavourites = this.setFavourites.bind(this);
		this.state = {
			gameExists: false,
			data: null,
			favourites: ["Blue Jays"]
		}
	}

	componentDidUpdate(prevProps){
		if (this.props.favourites !== prevProps.favourites){
			this.setState({favourites: this.props.favourites});
		}
		if (this.props.selectedDate !== prevProps.selectedDate){
			const url = this.getDateURL(this.props.selectedDate);
			fetch(url)
			.then(response => response.json())
			.then(data => {
				if (data.data.games.game === undefined) {
		          this.setState({gameExists : false})
		        } else {
		          this.setState({gameExists : true, data : data})
		      	}
			})
		}
	}

	setFavourites(favourites) {
	    this.setState({favourites});
	    this.props.updateFavourites(favourites);
	}

	getDateURL(date){
		const {selectedDate} = this.props;
		const year = selectedDate.getFullYear().toString();
		const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
		const day = selectedDate.getDate().toString().padStart(2, "0");
		return `http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`;
	}

	// generate games to display
	displayGames(){
		const {data, favourites} = this.state;
		if(data){
			let favouritesOrder = [];

			let games = data.data.games.game;
			if (!(games instanceof Array)) {
		    	games = [games];
		    }
		    let gameInfo = games.map((g, i) => {
		    	if (favourites && 
		    		(favourites.includes(g.home_team_name) 
		    		|| favourites.includes(g.away_team_name))) {
		          favouritesOrder[favouritesOrder.length] = i;
		        }
		    	const boxscoreURL = `http://gd2.mlb.com${g.game_data_directory}/boxscore.json`;
		    	return(
		    		<Game 
		    			key={i}
			    		homeTeam={g.home_team_name}
			    		awayTeam={g.away_team_name}
			    		status={g.status.status}
			    		linescore={g.linescore}
			    		boxscoreURL={boxscoreURL}
			    		favourites={favourites}
			    		setFavourites={this.setFavoufites}
		    		/>
		    	);
		    })
		    favouritesOrder.forEach((fav, i) => {
		        const temp = gameInfo[i];
		        gameInfo[i] = gameInfo[fav];
		        gameInfo[fav] = temp;
		    });

		    return gameInfo;
		}
	}

  	render() {
  		const gameDisplay = this.displayGames();
  		if (!this.state.gameExists) {
	      return (<p>No games to display.</p>);
	    }
    	return (
    		<div>
        		{gameDisplay}
      		</div>
    	);
  	}
}

export default ListView;