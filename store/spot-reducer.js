import { ADD_SPOT, SET_SPOT, REMOVE_SPOT } from './spot-actions';
import Spot from '../models/spot';

const initialState = {
    spots: []
};

export default (state = initialState, action) => {
    switch (action.type){
        case SET_SPOT:
            return{
                spots: action.spots.map(
                    pl =>
                        new Spot(
                            pl.id.toString(),
                            pl.title,
                            pl.category,
                            pl.imageUri,
                            pl.address,
                            pl.lat,
                            pl.lng
                        )
                )
            };
        case ADD_SPOT:
            const newSpot = new Spot(
                action.spotData.id.toString(),
                action.spotData.title,
                action.spotData.category,
                action.spotData.image,
                action.spotData.address,
                action.spotData.coords.lat,
                action.spotData.coords.lng
            );
            return {
                spots: state.spots.concat(newSpot)
            };
        case REMOVE_SPOT:
            const arr = [...state.spots];
            for( var i = 0; i < arr.length; i++){
                if ( arr[i].id === action.cid) {
                    arr.splice(i, 1);
                }
            }
            console.log(arr);
            //delete updatedSpots[action.spotData.id];
            return {
                spots: arr
            };
        default:
            return state;
    }
};
