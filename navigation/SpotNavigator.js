import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import SpotListScreen from '../screens/SpotListScreen';
import SpotDetailScreen from '../screens/SpotDetailScreen';
import NewSpotScreen from '../screens/NewSpotScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import CommunityMapScreen from '../screens/CommunityMapScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoryResults from '../screens/CategoryResults';
import TitleResults from '../screens/TitleResults';

const SpotNavigator = createStackNavigator(
  {
    //SignUp: SignUp,
    //Login: Login,
    CommunityMap: CommunityMapScreen,
    Spots: SpotListScreen,
    SpotDetail: SpotDetailScreen,
    NewSpot: NewSpotScreen,
    Map: MapScreen,
    Search: SearchScreen,
    CategoryResults: CategoryResults,
    TitleResults: TitleResults
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(SpotNavigator);
