import React from 'react';
import { Modal, Button, Table } from 'semantic-ui-react';
import './GameDetails.css';

class GameDetails extends React.Component {
	constructor(props){
		super(props);
		this.getBoxscore = this.getBoxscore.bind(this);
		this.handleTeamToggle = this.handleTeamToggle.bind(this);
		this.state = {
			data: null,
			homeActive: true
		}
	}

	// get data from http://..../boxscore.json
	getBoxscore(){
		fetch(this.props.boxscoreURL)
			.then(response => response.json())
			.then(data => {
				this.setState({data})
				console.log(data);
			})
			.catch(console.log)
	}

	// generate inning table display
	displayInnings(linescore, htc, atc){
		const headerValues = ['1','2','3','4','5','6','7','8','9','R','H','E'];
        let headerDisplay = headerValues.map((element) => {
            return <Table.HeaderCell>{element}</Table.HeaderCell>
        });

		const inningLineScore = Array.from(linescore.inning_line_score);
		const homeInningScoreDisplay = inningLineScore.map((score) => {
            return <Table.Cell>{score.home}</Table.Cell>
        });
        const awayInningScoreDisplay = inningLineScore.map((score) => {
            return <Table.Cell>{score.away}</Table.Cell>
        });

        const homeRHE = [linescore.home_team_runs, 
                linescore.home_team_hits,
                linescore.home_team_errors];
        const homeRHEDisplay = homeRHE.map((num) => {
            return <Table.Cell>{num}</Table.Cell>
        });

        const awayRHE = [linescore.away_team_runs, 
            linescore.away_team_hits,
            linescore.away_team_errors];
        const awayRHEDisplay = awayRHE.map((num) => {
            return <Table.Cell>{num}</Table.Cell>
        });

        return(
	        <Table definition>
	            <Table.Header>
	                <Table.Row>
	                    <Table.HeaderCell />
	                    {headerDisplay}
	                </Table.Row>
	            </Table.Header>

	            <Table.Body>
	                <Table.Row>
	                    <Table.Cell>{htc}</Table.Cell>
	                    {homeInningScoreDisplay}
	                    {homeRHEDisplay}
	                </Table.Row>
	                <Table.Row>
	                    <Table.Cell>{atc}</Table.Cell>
	                    {awayInningScoreDisplay}
	                    {awayRHEDisplay}
	                </Table.Row>
	            </Table.Body>
	        </Table>
	    );
	}

	// display the correct team's info
	displayTeamToggle(home, away, homeActive){
		return(
			<div className='teamButton'>
				<Button.Group>
					<Button onClick={this.handleTeamToggle} active={homeActive}>{home}</Button>
					<Button.Or />
					<Button onClick={this.handleTeamToggle} active={!homeActive}>{away}</Button>
				</Button.Group>
			</div>
		);
	}

	// toggle this.state
	handleTeamToggle(){
		this.setState({homeActive: !this.state.homeActive});
	}

	// generate batting display
	displayBatters(batting, homeActive){
		const headerValues = ['Name', 'AB', 'R', 'H', 'RBI', 'BB', 'SO', 'AVG'];
		let headerDisplay = headerValues.map((element) => {
            return <Table.HeaderCell>{element}</Table.HeaderCell>
        });

        let homeBatters, awayBatters = [];

        if (batting[0].team_flag === "home") {
            homeBatters = batting[0].batter;
            awayBatters = batting[1].batter;
        } else {
            homeBatters = batting[1].batter;
            awayBatters = batting[0].batter;
        }

        // which team to display
        let batters = homeBatters;
        if (!homeActive) {batters = awayBatters};

        const battersDisplay = batters.map((num) => { 
            return <Table.Row>
                <Table.Cell>{num.name_display_first_last}</Table.Cell>
                <Table.Cell>{num.ab}</Table.Cell>
                <Table.Cell>{num.r}</Table.Cell>
                <Table.Cell>{num.h}</Table.Cell>
                <Table.Cell>{num.rbi}</Table.Cell>
                <Table.Cell>{num.bb}</Table.Cell>
                <Table.Cell>{num.so}</Table.Cell>
                <Table.Cell>{num.avg}</Table.Cell>
            </Table.Row>
        });

        return (<Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            {headerDisplay}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {battersDisplay}
                    </Table.Body>
                </Table>);
	}

	render() {
		const {data, homeActive} = this.state;
		const {status} = this.props;
		let homeTeamCode, 
			awayTeamCode, 
			inningDisplay, 
			battersDisplay, 
			teamToggleDisplay = '';
		let gameDetailDisplay = 'No details available.';
		if (data && status !== 'Cancelled' && status !== 'Postponed'){
			const {boxscore} = data.data;
			gameDetailDisplay = '';
			homeTeamCode = boxscore.home_team_code.toUpperCase();
            awayTeamCode = boxscore.away_team_code.toUpperCase();
            inningDisplay = this.displayInnings(boxscore.linescore, homeTeamCode, awayTeamCode);
            battersDisplay = this.displayBatters(boxscore.batting, homeActive);
            teamToggleDisplay = this.displayTeamToggle(boxscore.home_sname, boxscore.away_sname, homeActive);
		}
		return (
			<Modal basic 
				trigger={<Button fluid primary>More Information</Button>}
				onOpen={this.getBoxscore}
			>
				<Modal.Header>
					Game Details
				</Modal.Header>
				<Modal.Content>
					{gameDetailDisplay}
					{inningDisplay}
					{teamToggleDisplay}
					{battersDisplay}
				</Modal.Content>
			</Modal>
		);
	}
}

export default GameDetails;