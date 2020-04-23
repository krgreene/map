/** Uses react-native-mapbox-gl to display a map centered on Bridgetown, Barbados. 
*   When pressed, displays the latitude, longitude of the pressed position.
*/

import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1Ijoid3JpdGUyayIsImEiOiJjazR4c2owa2owNDhwM2xtYm1obmVoMjNrIn0.sXOqGlRgdTmNV6nAlAX6WQ");
MapboxGL.setConnected(true);

const App = () => {

  const map = React.createRef();
  const textField = React.createRef();
  const [geolocation, setGeolocation] = useState('');

  const handlePress = (event) => {
    setGeolocation(event.geometry.coordinates[1] + ", " + event.geometry.coordinates[0]);
    textField.current.setNativeProps({
      style: {
        backgroundColor: "dodgerblue"
      }
    });
  }

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <View style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text style={styles.title}>My Map in React Native and MapBox</Text>
      </View>
      <View>
        <Text style={styles.intro}>Makes use of react-native-mapbox-gl</Text>
        {/* displays lat, lng of pressed position */}
        <Text ref={textField} style={styles.data}>{geolocation}</Text> 
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>

        <View style={styles.mapContainer}>
          <MapboxGL.MapView 
            ref={map}
            style={styles.map}
            attributionEnabled={true}
            compassEnabled={true}
            compassViewPosition={2}
            onPress={handlePress}
            styleURL={MapboxGL.StyleURL.SatelliteStreet}
          >
          <MapboxGL.Camera 
            centerCoordinate={[-59.6132, 13.1060]}
            zoomLevel={13}
          />
          </MapboxGL.MapView>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    
  },
  body: {
    backgroundColor: "lemonchiffon",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  data: {
    alignContent: "center",
    borderRadius: 5,
    fontWeight: "bold",
    marginTop: 10,
    paddingVertical: 5,
    textAlign: "center",
  },
  intro: {
    fontStyle: "italic",
    textAlign: "center",
    paddingTop: 10
  },
  mapContainer: {
    borderColor: "blue",
    borderWidth: 2,
    marginTop: 20,
    backgroundColor: "black",
    height: 500
  },
  map: {
    flex: 1
  },
  title: {
    color: "blue",
    fontSize: 20,
    textAlign: "center"
  }
  
});

export default App;
