
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';

//auth screens 
import SignUpScreen from "../screens/SignUpScreen"
import SignInScreen from "../screens/SignInScreen"
import SplashScreen from "../screens/SplashScreen"

const Stack = createStackNavigator();
const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;
  
    useEffect(() => {
      AsyncStorage.getItem('alreadyLaunched').then((value) => {
        if (value == null) {
          AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
    
      GoogleSignin.configure({
        webClientId: 'AIzaSyBay02Z-DF3FwahKkqpYcA73CWKvFWCVK4',
      });
    
    }, []);
  
    if (isFirstLaunch === null) {
      return null; } 
    else if (isFirstLaunch == true) {
      routeName = 'Splash';
    } else {
      routeName = 'Login';
    }
  
    return (
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={({navigation}) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#f9fafd',
              shadowColor: '#f9fafd',
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <FontAwesome.Button 
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate('SignIn')}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };
  
  export default AuthStack;