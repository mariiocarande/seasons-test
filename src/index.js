import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './components/SeasonDisplay';
import Spinner from './components/Spinner';

class App extends React.Component {
  constructor(props){
    super();
      // THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT
      // TO this.state
      this.state = {lat: null , errorMessage: '' };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({ lat: position.coords.latitude }),
      err =>
        this.setState({errorMessage: err.message})
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div>
          Error:{this.state.errorMessage}
        </div>
      );
    }

    if (!this.state.errorMessage && this.state.lat) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }

    return (
      <Spinner message="Please accept location request" />
    );
  }

  render() {
    return(
      <div className="border red">
        {this.renderContent()}
      </div>
    );
  }
};

ReactDOM.render(
  <App />,document.querySelector('#root')
);


