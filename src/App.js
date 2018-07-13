import React, { Component } from 'react';
import {Segment, Grid} from 'semantic-ui-react';
import Calendar from './components/Calendar/Calendar';
import Favourites from './components/Favourites/Favourites';
import ListView from './components/ListView/ListView';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.handleDayChange = this.handleDayChange.bind(this);
    this.updateFavourites = this.updateFavourites.bind(this);
    this.state = {
      selectedDate: null,
      favourites : ["Blue Jays"] 
      // note: started but did not complete bonus for favouriting other teams
    }
  }

  handleDayChange(date) {
    this.setState({selectedDate: date});
  }

  updateFavourites(favs) {
    this.setState({favs})
  }

  render() {
    const {selectedDate, favourites} = this.state;
    return (
      <div className="App">
      <Segment><h1>MLB Scores</h1></Segment>
      
        <Grid>
          <Grid.Column width={5}></Grid.Column>
          <Grid.Column width={6}>
            <Calendar handleDayChange={this.handleDayChange}/>
            <br />
            <Favourites />
            <br />
            <ListView 
              selectedDate={selectedDate} 
              favourites={favourites} 
              updateFavourites={this.updateFavourites}/>
          </Grid.Column>
          <Grid.Column width={5}></Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
