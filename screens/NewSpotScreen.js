import React, { useState, useCallback } from 'react';
import { ScrollView, View, Button, Text, TextInput, StyleSheet, Picker } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as spotActions from '../store/spot-actions';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';

const NewSpotScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedValue, setSelectedValue] = useState("Nature");

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        //you could add validation
        setTitleValue(text);
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);

    const saveSpotHandler = () => {
        dispatch(spotActions.addSpot(titleValue, selectedValue, selectedImage, selectedLocation));
        props.navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <Text style={styles.categoryLabel}>Category:</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.categoryInput}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Nature" value="Nature" />
                    <Picker.Item label="Food" value="Food" />
                    <Picker.Item label="Monument" value="Monument" />
                    <Picker.Item label="Historical" value="Historical" />
                    <Picker.Item label="Entertainment" value="Entertainment" />
                    <Picker.Item label="Personal" value="Personal" />
                    <Picker.Item label="Health" value="Health" />
                    <Picker.Item label="Friend" value="Friend" />
                </Picker>
                <Text style={styles.label}>Image:</Text>
                <ImageSelector onImageTaken={imageTakenHandler} />
                <Text style={styles.label}>Location:</Text>
                <LocationSelector navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
                <Button
                    title="Save Spot"
                    color={Colors.primary}
                    onPress={saveSpotHandler}
                />
            </View>
        </ScrollView>
    );
};

NewSpotScreen.navigationOptions = {
    headerTitle: 'Add Spot'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    categoryLabel: {
        fontSize: 18,
        marginTop: 50
    },
    categoryInput: {
        marginBottom: 50
    }
});

export default NewSpotScreen;
