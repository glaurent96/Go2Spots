import * as FileSystem from 'expo-file-system';

import { insertSpot, fetchSpots, lookUpSpot, deleteSpot, fetchFSpots, fetchTSpots } from '../helpers/db';
import env from '../environment';

export const ADD_SPOT = 'ADD_SPOT';
export const SET_SPOT = 'SET_SPOT';
export const REMOVE_SPOT = 'REMOVE_SPOT';

export const addSpot = (title, category, image, location) => {
    return async dispatch => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
                location.lat
            },${location.lng}&key=${env.googleApiKey}`
        );

        if (!response.ok){
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        if (!resData.results){
            throw new Error('Something went wrong!');
        }

        const address = resData.results[0].formatted_address;
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try{
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertSpot(
                title,
                category,
                newPath,
                address,
                location.lat,
                location.lng
            );
            console.log(dbResult);
            dispatch({
                type: ADD_SPOT,
                spotData: {
                    id: dbResult.insertId,
                    title: title,
                    category: category,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadSpots = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchSpots();
            console.log(dbResult);
            dispatch({ type: SET_SPOT, spots: dbResult.rows._array });
        } catch (err){
            throw err;
        }
    };
};

export const removeSpot = (id) => {
    return async dispatch => {
        try{
            const dbResult = await deleteSpot(
                id
            );
            console.log(dbResult);

            //const dbResult3 = await fetchSpots();
            //dispatch({ type: SET_SPOT, spots: dbResult3.rows._array });

            dispatch({ type: REMOVE_SPOT, cid: id });

        } catch (err){
            throw err;
        }
    };
};

export const filterSpots = (category) => {
    return async dispatch => {
        try{
            const dbResult = await fetchFSpots(category);
            console.log(dbResult);
            dispatch({ type: SET_SPOT, spots: dbResult.rows._array });
        } catch (err){
            throw err;
        }
    };
};

export const filterTSpots = (title) => {
    return async dispatch => {
        try{
            const dbResult = await fetchTSpots(title);
            console.log(dbResult);
            dispatch({ type: SET_SPOT, spots: dbResult.rows._array });
        } catch (err){
            throw err;
        }
    };
};
