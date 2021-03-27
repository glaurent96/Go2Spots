
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button, Image, Picker, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { SearchBar } from 'react-native-elements';
import * as spotActions from '../store/spot-actions';

const SearchScreen = props => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState("All");

    const spots = useSelector(state => state.spots.spots);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.loadSpots());
    }, [dispatch]);

    const buttonHandler = () => {
        props.navigation.navigate('CategoryResults',{categoryData:selectedValue})
    };

    const searchChangeHandler = text => {
        setSearchValue(text);
    };

    const buttonPressHandler = () => {
        props.navigation.navigate('TitleResults',{titleData:searchValue})
    }

    return(
        <View style={{flex:1}}>
            <Text style={styles.titleSearch}>Search by Title:</Text>
            <SearchBar
                placeholder="Type Here..."
                value={searchValue}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                round={true}
                lightTheme={false}
                onChangeText={searchChangeHandler}
            />
            <TouchableOpacity
                onPress={buttonPressHandler}
                style={styles.submitBtn}
            >
                <Text style={styles.textBtn}>Submit Title</Text>
            </TouchableOpacity>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.categorySearch}>Search by Category:</Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.categoryInput}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Nature" value="Nature" />
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Monument" value="Monument" />
                <Picker.Item label="Historical" value="Historical" />
                <Picker.Item label="Entertainment" value="Entertainment" />
            </Picker>
            <TouchableOpacity
                onPress={buttonHandler}
                style={styles.submitBtn}
            >
                <Text style={styles.textBtn}>Submit Category</Text>
            </TouchableOpacity>
        </View>
    );
};

SearchScreen.navigationOptions = {
    headerTitle: 'Search'
};

const styles = StyleSheet.create({
    titleSearch:{
        fontSize: 20,
        marginTop: 50,
        marginBottom: 40,
        textAlign: 'center',
        color: 'black',
        textDecorationLine: 'underline'
    },
    categorySearch:{
        fontSize: 20,
        marginTop: 50,
        textAlign: 'center',
        color: 'black',
        textDecorationLine: 'underline'
    },
    or:{
        fontSize: 20,
        marginTop: 70,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fc9208'
    },
    submitBtn:{
        marginRight:70,
        marginLeft:70,
        marginTop:30,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    textBtn:{
        textAlign: 'center'
    }
});

export default SearchScreen;
