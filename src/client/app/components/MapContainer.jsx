// from https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import apiKey from '../config.js'
import React from 'react';

export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }

    // binding this to event-handler functions 
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked (props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const style = {
      width: '50vw',
      height: '50vh'
    }

    return (
      <div>
        <Map 
          google={this.props.google}
          style={style}
          zoom={16} 
          initialCenter={this.props.location}
          onClick={this.onMapClicked}
        >

          {this.props.restaurants.map((restaurant, ind) => {
            return (            
            <Marker
              onClick={this.onMarkerClick}
              label={{text: ind.toString(), color:'black'}}
              title={restaurant.name}
              name={restaurant.name}
              rating={restaurant.rating}
              address={restaurant.location.display_address}
              position={{lat: restaurant.coordinates.latitude, lng: restaurant.coordinates.longitude}} />
            )
          }
          )}
          <Marker
              onClick={this.onMarkerClick}
              name={'Current Location'}
              icon={{
                scaledSize: {height: 20, width: 20},
                url: "http://bluedot.ca/wp-content/themes/dsf-blue-dot-campaign-theme/src/images/marker-circle.png"
              }}
              position={this.props.location} 
          />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
                <div>{this.state.selectedPlace.rating + ' stars'}</div>
                <div>{this.state.selectedPlace.address}</div>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

var thing = GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)

export default thing;