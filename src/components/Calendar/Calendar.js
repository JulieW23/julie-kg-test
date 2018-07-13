import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {Segment, Accordion, Icon} from 'semantic-ui-react';

class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.handleDayClick = this.handleDayClick.bind(this);
		this.state = {
			selectedDate: null,
			activeIndex: -1
		}
	}
	handleDayClick(date) {
		this.setState({selectedDate: date});
		this.props.handleDayChange(date);
	}

	// handle accordion expand
	handleExpandClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
	}

	render() {
		const { activeIndex } = this.state
		return (
			<div>
				<Segment tertiary>
		          <Accordion fluid>
			        <Accordion.Title 
			        	active={activeIndex === 0} 
			        	index={0} 
			        	onClick={this.handleExpandClick}
			        >
			          	{this.state.selectedDate ? (
			                <p><Icon name='dropdown' />Date Selected: {this.state.selectedDate.toLocaleDateString()}</p>
			            ) : (
			                <p><Icon name='dropdown' />Select a Date</p>
			            )}
			        </Accordion.Title>
			        <Accordion.Content active={activeIndex === 0}>
			          	<DayPicker 
					        month={new Date(2014, 2)}
				            onDayClick={this.handleDayClick} 
				            selectedDays={this.state.selectedDate}
				        />
			        </Accordion.Content>
			     </Accordion>
			    </Segment>
			</div>
		);
	}
}

export default Calendar;