import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

injectTapEventPlugin();

class Tech extends React.Component {
	render() {
		const style = {
			marginBottom: 10
		}

		return(
			<Card style={style} >
			<CardHeader
			title={this.props.name} />
			<CardText>
			{this.props.description}
			</CardText>
			</Card>
			);
	}
}

class Main extends React.Component {
	render() {
		return(
			<div>
			<AppBar
			title="snwfdhmp's Developer RoadMap"
			iconElementRight={
				<FlatButton icon={<NavigationRefresh />} />
			}
			onClick={this.fetchCurrents}
			/>

			<Tabs>
			<Tab label='Current'>
			<Current />
			</Tab>
			<Tab label='Incomming'>
			<Incomming />
			</Tab>
			</Tabs>
			</div>
			)
	}
}

class Incomming extends React.Component {
	constructor() {
		super();
		this.state = {
			data:null
		};
		this.fetchCurrents = this.fetchCurrents.bind(this);
	}

	fetchCurrents() {
		APICall(this, {
			'action':'get',
			'what':'incommings'
		} )
	}

	render() {
		let listItems = null;
		if(this.state.data == null) {
			this.fetchCurrents();
		}

		const style = {
			padding:20,
			marginBottom:10
		};

		if(this.state.data != null) {
			listItems = this.state.data.map((tech) =>
				<Tech key={tech.id} name={tech.name} description={tech.description} />
				);
		}

		return(
			<div>
			{listItems}
			</div>);
	}
}

class Current extends React.Component {
	constructor() {
		super();
		this.state = {
			data:null
		};
		this.fetchCurrents = this.fetchCurrents.bind(this);
	}

	fetchCurrents() {
		APICall(this, {
			'action':'get',
			'what':'currents'
		} )
	}

	render() {
		let listItems = null;
		if(this.state.data == null) {
			this.fetchCurrents();
		}

		const style = {
			padding:20,
			marginBottom:10
		};

		if(this.state.data != null) {
			listItems = this.state.data.map((tech) =>
				<Tech key={tech.id} name={tech.name} description={tech.description} />
				);
		}

		return(
			<div>
			{listItems}
			</div>);
	}
}

function APICall(obj, params) {
	var APILocation = 'http://localhost:8888/RoadMapAPI/';

	var request = new XMLHttpRequest();
	request.onreadystatechange = (e) => {
		if (request.readyState !== 4)
			return;
		if (request.status === 200) {
			obj.setState({
				data: JSON.parse(request.response)
			})
		} else {
			console.warn('Error');
		}
	};
	let paramString='';
	for(var k in params) {
		if(paramString == '')
			paramString+='?';
		else
			paramString+='&';
		paramString+=k+'='+params[k];
	}

	console.log('Querying : '+paramString);

	request.open('GET', APILocation+paramString);
	request.send();
}

const App = () => (
	<MuiThemeProvider>
	<Main />
	</MuiThemeProvider>
	);

ReactDOM.render(
	<App />,
	document.getElementById('root')
	);