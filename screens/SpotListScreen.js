import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Picker, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import SpotItem from '../components/SpotItem';
import * as spotActions from '../store/spot-actions';

import Swipeout from 'react-native-swipeout';

const SpotListScreen = props => {
    const spots = useSelector(state => state.spots.spots);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.loadSpots());
    }, [dispatch]);

    return (
        <View>
            <FlatList
                data={spots}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <SpotItem
                        image={itemData.item.imageUri}
                        category={itemData.item.category}
                        title={itemData.item.title}
                        address={itemData.item.address}
                        onSelect={() => {
                            props.navigation.navigate('SpotDetail', {
                                spotTitle: itemData.item.title,
                                spotId: itemData.item.id
                            });
                        }}
                    />
                )}
            />
        </View>
    );
};

SpotListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Spots',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Map'
                    onPress={() => {
                        navData.navigation.navigate('CommunityMap')
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
    searchTitle:{
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50
    }
});

export default SpotListScreen;
