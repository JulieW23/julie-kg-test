import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import GameDetails from '../GameDetails/GameDetails';

class Game extends Component {
	constructor(props){
		super(props);
		this.state = {
			favourites: props.favourites
		}
	}

	componentDidUpdate(prevProps){
		if (this.props.favourites !== prevProps.favourites){
			this.setState({favourites: this.props.favourites});
		}
	}

	render(){
		const {homeTeam, awayTeam, status, linescore, boxscoreURL} = this.props;
		let homeScoreElement, awayScoreElement = undefined;
		let homeTeamElement = homeTeam;
		let awayTeamElement = awayTeam;
		if (linescore){
			homeScoreElement = linescore.r.home;
			awayScoreElement = linescore.r.away;
		}

		if (homeScoreElement && awayScoreElement) {
            if (Number(homeScoreElement) > Number(awayScoreElement)) {
                homeTeamElement = <b>{homeTeam}</b>;
                homeScoreElement = <b>{homeScoreElement}</b>;
            }
            else if (Number(awayScoreElement) > Number(homeScoreElement)) {
                awayTeamElement = <b>{awayTeam}</b>;
                awayScoreElement = <b>{awayScoreElement}</b>
            }
        }
		return (
			<Card fluid>
				<Card.Content>
					<Card.Description>
						<Grid>
							<Grid.Column width={8}>
								<p>{homeTeamElement}</p>
								<p>{awayTeamElement}</p>
								<p>{status}</p>
							</Grid.Column>
							<Grid.Column width={8}>
								<p>{homeScoreElement}</p>
								<p>{awayScoreElement}</p>
							</Grid.Column>
						</Grid>
					</Card.Description>
				</Card.Content>
				<Card.Content>
					<GameDetails status={status} boxscoreURL={boxscoreURL}/>
				</Card.Content>
			</Card>
		);
	}
}

export default Game;