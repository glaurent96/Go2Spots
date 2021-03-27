import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';
import * as spotActions from '../store/spot-actions';

const SpotDetailScreen = props => {

    const dispatch = useDispatch();

    const spotId = props.navigation.getParam('spotId');

    const selectedSpot = useSelector(state =>
        state.spots.spots.find(spot => spot.id === spotId)
    );
    if (typeof(selectedSpot)==='undefined') {
        props.navigation.navigate('Spots');
        return(<Text>Deleting Spot...</Text>);
    }
    const selectedLocation = {lat: selectedSpot.lat, lng: selectedSpot.lng};

    const showMapHandler = () => {
        props.navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        });
        console.log(selectedLocation);
    };

    const deleteSpotHandler = () => {
        dispatch(spotActions.removeSpot(spotId));
        props.navigation.navigate('Spots');
    };

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Image source={{uri: selectedSpot.imageUri}} style={styles.image} />
            <Text style={styles.fancyText}>Category: {selectedSpot.category}</Text>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}><Text style={styles.address}>{selectedSpot.address}</Text></View>
                <MapPreview
                    style={styles.mapPreview}
                    location={selectedLocation}
                    onPress={showMapHandler}
                />
            </View>
            <Button title='Delete Spot' onPress={deleteSpotHandler} />
        </ScrollView>
    );
};

SpotDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('spotTitle')
    };
};

const styles = StyleSheet.create({
    image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  fancyText: {
      fontSize: 20,
  }
});

export default SpotDetailScreen;
