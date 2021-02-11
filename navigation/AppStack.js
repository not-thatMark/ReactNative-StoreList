import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBar from 'react-native-elements'
//screens
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen"
import SearchScreen from '../screens/SearchScreen'
import EventScreen from "../screens/EventScreen"

const Stack=createStackNavigator();
const Tab =createBottomTabNavigator();

const HomeStack=({navigation})=>(
    <Stack.Navigator>
        <Stack.Screen
            name="Main"
            component={HomeScreen}
            options={{
                headerTitleStyle:{
                    color:'#2e64e5',
                    fontFamily:'Kufam-SemiBoldItalic',
                    fontSize:18,
                },
                headerStyle:{
                    shadowColor:'#fff',
                    elevation:0,
                },
                headerRight:()=>
                (
                    <View style={{alignItems:'center'}}>
                       <FontAwesome5.Button
                       name="fa-search"
                       size={22}
                       backgroundColor='#fff'
                       color="#2e64e5"
                       onPress={()=>navigation.navigate('SearchScreen')}
                       />
                    </View>
                ),
            }}
       />
        <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
            tille:'Search',
            headerTitleAlign:'center',
            headerStyle:{
                backgroundColor:'#2e64e515',
                shadowColor:'#2e64e515',
                elevation:0
            },
            headerBackTitleVisble: false,
            headerBackImage:()=>(
                <View style={{marginLeft: 11}}>
                    <Ionicon name='arrow-back' size={25} color ='#2e64e5'/>
                </View>
            ) }} />
    
    </Stack.Navigator>
)

 const EventStack =({navigation})=>
 {
     <Stack.Navigator>
         <Stack.Screen 
         name="Event" 
         component={EventScreen}
         options={{
             headerTitleAlign:'center',
             headerTitleStyle:{
                 color:'#2e64e5',
                 fontFamily:'Kufam-SemiBoldItalic',
                 fontSize:18,
             },
             headerStyle:{
                 shadowColor:'#fff',
                 elevation:0,
             },
             headerRight:()=>{
                 <View style={{marginRight:10}}>
                     <FontAwesome5.Button 
                     name="fa-search"
                     size={22}
                     backgroundColor="#fff"
                     color="#2e64e5"
                     onPress={()=> navigation.navigate('SearchScreen')}/>
                 </View>
             }
         }}>

         </Stack.Screen>
     </Stack.Navigator>
 }

 const AppStack=()=>{
     const getTabBarVisibility=(route)=>{
         const routeName=route.state?
         route.state.routes[route.state.index].name
         :'';
         if (routeName === 'Search'){return false;}
         return true;
     };
     return(
         <Tab.Navigator
            tabBarOptions={{activeTintColor:'#2e64e5'}}>
            <Tab.Screen
            name="Home"
            component={Home}
            options={({route})=>({
                tabBarLabel:'Home',
                //visible when chosen
                //tabBarVisible:route.state && route.state.index===0,
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons
                        name="home-outline"
                        color={colors}
                        size={size}
                    />
                ),
            })}>
            </Tab.Screen>
            {/* <Tab.Screen
            name="Search"
            component={SearchStack}
            options={({route}) =>({
                tabBarVisible:getTabBarVisibility(route),
                //or it can be pushed back(hide)
                //tabBarVisible:route.state && route.state.index===0,
                //tabBarLabel:'Home'
                    tabBarIcon:({color,size})=>(
                        <Ionicons
                        name="search-outline"
                        color={color}
                        size={size}
            />
                ),
            })}
            /> */}
        <Tab.Screen
            name="Event"
            component={EventStack}
            options={({route}) =>({
                //as above
                tabBarVisible:getTabBarVisibility(route),
                    tabBarIcon:({color,size})=>(
                        <Ionicons 
                        name="calendar-outline"
                        color={color}
                        size={size}
                        />
                    )
            })}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarIcon:({color,size})=>
                {
                    <Ionicons name="person-outline" color={color} size={size}/>
                }
            }}
        >
        </Tab.Screen>
        </Tab.Navigator>
     );
 }
 export default AppStack;