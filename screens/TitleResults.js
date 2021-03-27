import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Picker } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import SpotItem from '../components/SpotItem';
import * as spotActions from '../store/spot-actions';

import Swipeout from 'react-native-swipeout';

const TitleResults = props => {
    const title = props.navigation.getParam('titleData');
    const spots = useSelector(state => state.spots.spots);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(spotActions.filterTSpots(title));
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

TitleResults.navigationOptions = navData => {
    return {
        headerTitle: 'Search By Title',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Back'
                    onPress={() => {
                        navData.navigation.navigate('Search')
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default TitleResults;
