/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1Ijoid3JpdGUyayIsImEiOiJjazR4c2owa2owNDhwM2xtYm1obmVoMjNrIn0.sXOqGlRgdTmNV6nAlAX6WQ");
MapboxGL.setConnected(true);

const App = () => {

  const map = React.createRef();
  const [geolocation, setGeolocation] = useState('');

  const handlePress = (event) => {
    setGeolocation(event.geometry.coordinates[1] + ", " + event.geometry.coordinates[0]);
    console.log('Target', event.geometry.coordinates)
  }

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <View style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <Text style={styles.title}>My Map in React Native and MapBox</Text>
          </View>
          <View>
            <Text style={styles.intro}>Makes use of react-native-mapbox-gl</Text>
            <Text style={styles.data}>{geolocation}</Text>
          </View>
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    
  },
  body: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 20,
    marginVertical: 40,
  },
  data: {
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center"
  },
  intro: {
    fontStyle: "italic",
    textAlign: "center",
    paddingTop: 10
  },
  mapContainer: {
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
