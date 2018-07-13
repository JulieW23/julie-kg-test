import React from 'react';
import { Segment, Accordion, Icon, List } from 'semantic-ui-react'

class Favourites extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	activeIndex: -1,
            favourites : ["Blue Jays"]
        }
    }

    // accordion expand
    handleExpandClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
  	}

  	// generate display for favs list
  	displayFav(){
  		const {favourites} = this.state;
  		let favouritesList = favourites.map((fav, i) => {
  			return <List.Item key={i}>
                <List.Icon name='favorite' />
                <List.Content>{fav}</List.Content>
            </List.Item>
  		})
  		return favouritesList;
  	}

	render() {
		const { activeIndex } = this.state
		const favDisplay = this.displayFav();
		return (
			<Segment tertiary>
		      	<Accordion fluid>
		        	<Accordion.Title 
		        		active={activeIndex === 0} 
		        		index={0} 
		        		onClick={this.handleExpandClick}>
		          		<Icon name='dropdown' />
		          		Favourites
		        	</Accordion.Title>
		        	<Accordion.Content active={activeIndex === 0}>
		          		<List>
		          			{favDisplay}
		          		</List>
		        	</Accordion.Content>
		      	</Accordion>
	    </Segment>
		);
	}
}

export default Favourites;