/*import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api'; 
import ReactDOM from 'react-dom';
import * as Map from './constants';

const mapOptions = {
  center: Map.COORDINATES,
  zoom: 16,
  mapTypeControlOptions: {
      mapTypeIds: [ 'roadmap', 'satellite', 'hybrid', 'terrain', 'Retro' ]
  }
};

const markerOptions = ( googleMaps, map ) => {
  return {
    position: Map.COORDINATES,
    map: map,
    title: 'Direccion',
    animation: googleMaps.Animation.BOUNCE
  }
};


// Tamaño del mapa!!!
const MAP_STYLES = {
  height: '450px',
  width: '100%'
}
//TAMAÑO DEL MAPA

const OPTIONS = {
  center: {
    lat: 41.4054682,
    lng: 2.12373473
  },
  zoom: 16
}


const API_CONFIG = {
  key:'AIzaSyDZe2RFmYyvc54Lt6ZOxG7Inow5OGB6IgA',
  language: 'es'
}

export default class ErgosMap extends Component {
    componentWillUnmount() {
      const allScripts = document.getElementsByTagName( 'script' );
      [].filter.call(
        allScripts,
        ( scpt ) => scpt.src.indexOf( 'key=AIzaSyDE2XTOO3mc5CnZSdVG0xVfs8L9DidM__0' ) >= 0
      )[ 0 ].remove();
      window.google = {};
    }
    componentDidMount() {
      loadGoogleMapsAPI( Map.API_CONFIG ).then( googleMaps => {
        const maps = new googleMaps.Map( this.refs.map, mapOptions );
  
        const newStyleMap = new googleMaps.StyledMapType( Map.STYLES, {name: 'Retro'});
        const marker = new googleMaps.Marker( markerOptions( googleMaps, maps ));
  
        maps.mapTypes.set( 'Retro', newStyleMap );
        maps.setMapTypeId( 'Retro' );
  
        Map.resetMarkerAnimation( marker );
  
      }).catch( err => {
        console.warning( 'error al cargar el mapa', err );
      });
    }
}
/*
render() {
        return (
            <div ref="map" className="map-google"></div>
          );
}


*/