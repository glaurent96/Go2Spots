import React, { useEffect } from 'react';
import MapView from 'react-native-map-clustering';
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Platform, TouchableOpacity, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import SpotItem from '../components/SpotItem';
import firebase from '../helpers/firebase';
import * as spotActions from '../store/spot-actions';
import { useSelector, useDispatch } from 'react-redux';

const CommunityMapScreen = props => {

    //const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const spots = useSelector(state => state.spots.spots);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.loadSpots());
    }, [dispatch]);

    const mapRegion = {
        latitude: 39.728493,
        longitude: -121.837479,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    signOut = () => {
      firebase.auth().signOut().then(() => {
        props.navigation.navigate('Login')
      })
    }

    const renderSpot = () => {
        console.log(spots)
        return spots.map(p=>{
            return(
                <Marker
                    coordinate={{latitude: p.lat, longitude: p.lng}}
                    key={p.id}
                    onSelect={() => {
                        props.navigation.navigate('SpotDetail', {
                            spotTitle: p.title,
                            spotId: p.id
                        });
                    }}
                >
                    <Image source={require('../assets/marker1.png')} styles={{height:50, width:50}}/>
                </Marker>
            )
        })
    };

    return (
      <View style={styles.container}>
        <MapView
            style={styles.mapStyle}
            initialRegion={mapRegion}
            animationEnabled={false}
            maxZoom={15}
            provider={MapView.PROVIDER_GOOGLE}
            /*customMapStyle={mapStyle}*/
            /*onRegionChangeComplete={(x)=>this.recordEvent(x)}*/
        >
        {renderSpot()}
        </MapView>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.signOut()}
          style={styles.TouchableOpacityStyle}>
          <Image
             source={require('../assets/logout.png')}
             style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('Search')}
          style={styles.TouchableOpacityStyleSearch}>
          <Image
             source={require('../assets/search.png')}
             style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    );
}

CommunityMapScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Go2Spots',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='My Spots'
                    onPress={() => {
                        navData.navigation.navigate('Spots')
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add Spot'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewSpot')
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  TouchableOpacityStyleSearch: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30,
  }
});

export default CommunityMapScreen;
