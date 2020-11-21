import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as parksData from "./assets/skateboard.json";
import mapStyle from "./mapStyle";

function Map(){
  const [selectedPark, setSelectedPark] = useState(null);
  return(
    <GoogleMap defaultZoom={10} defaultCenter={{lat:45.421532, lng:-75.697189}} 
      defaultOptions={{ styles: mapStyle}}
    >
      
      {parksData.features.map(park =>(
      <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng:park.geometry.coordinates[0]
          }}
          onClick={()=>{
            setSelectedPark(park);
          }}
          icon={{
            url:"https://upload.wikimedia.org/wikipedia/commons/3/37/Skateboarding_pictogram.svg",
            scaledSize: new window.google.maps.Size(25, 25)
          }}
      />
      ))}

      {selectedPark && (
        <InfoWindow
          position={{
            lat:selectedPark.geometry.coordinates[1], 
            lng:selectedPark.geometry.coordinates[0]
          }}     
          onCloseClick={() => setSelectedPark(null)}   
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
      </InfoWindow>
        
      )}


    
    </GoogleMap>

  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div style={{ width: "100vw", height:"100vh" }}>

      <WrappedMap 
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCMTH8Qd9kAWuTdZLKxziBracsztLa40tY"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />

    </div>
  );
}

export default App;
