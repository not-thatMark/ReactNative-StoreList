import React from 'react';
import {View, TouchableOpacity, Text,StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from "react-native-elements";
//screens
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen"
import SearchScreen from '../screens/SearchScreen'
import EventScreen from "../screens/EventScreen"
import StoreScreen from "../screens/StoreScreen";
import AddItemScreen from '../screens/AddItemScreen';
import AddMenuItem from '../screens/AddMenuScreen';
import MenuScreen from'../screens/MenuScreen';
import GooglePlacesInput from'../components/googlePlaceInput';

const Stack=createStackNavigator();
const Tab =createBottomTabNavigator();

const HomeStack=({navigation})=>(
    <Stack.Navigator>
        <Stack.Screen
            name="Main"
            component={HomeScreen}
            options={{
                headerTitleStyle:{
                    color:'#eaad37',
                    fontSize:18,},
                headerStyle:{
                    shadowColor:'#fff',
                    elevation:0,
                },
                headerRight:()=>
                (
                    <View style={{alignItems:'center'}}>
                       <Icon
                       name='search'
                       type='ionicon'
                       color='#eaad37'
                       backgroundColor='#fff'
                       onPress={()=>navigation.navigate('Search')}
                       />
                    </View>
                ),
            }}
       />
       
        <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
            tille:'Search',
            headerTitleAlign:'center',
            headerStyle:{
                backgroundColor:'#eaad37',
                shadowColor:'#2e64e515',
                elevation:0
            },
            headerBackTitleVisble: false,
            headerRight:()=>
            (
                <View style={{alignItems:'center'}}>
                   <Icon
                   name='search'
                   type='ionicon'
                   color='#eaad37'
                   backgroundColor='#fff'
                   onPress={()=>navigation.navigate('Search')}
                   />
                </View>
            ),}} />
     <Stack.Screen
        name="Item"
        component={StoreScreen}
        options={{
            tille:'Search',
            headerTitleAlign:'center',
            headerStyle:{
                backgroundColor:'#eaad37',
                shadowColor:'#2e64e515',
                elevation:0
            },
            headerBackTitleVisble: false,
            headerRight:()=>
            (
                <View style={{alignItems:'center'}}>
                   <Icon
                   name='search'
                   type='ionicon'
                   color='#eaad37'
                   backgroundColor='#fff'
                   onPress={()=>navigation.navigate('Search')}
                   />
                </View>
            ),}} />
    </Stack.Navigator>)
const ProfileStack =({navigation})=>
{ return(<Stack.Navigator>
    <Stack.Screen
    name="Profile"
    component={ProfileScreen}
    options={{           
        headerTitleStyle:{
        color:'#eaad37',
        fontSize:18,
    },
    headerStyle:{
        shadowColor:'#fff',
        elevation:0,
    },
    headerRight:()=>
    (
        <View style={{alignItems:'center'}}>
           <Icon
           name='search'
           type='ionicon'
           color='#eaad37'
           backgroundColor='#fff'
           onPress={()=>navigation.navigate('AddItem')}
           />
        </View>
    ),
}} >
    </Stack.Screen>
    <Stack.Screen     
    name="AddItem"
    component={AddItemScreen}
    options={{           
        headerTitleStyle:{
        color:'#eaad37',
        fontSize:18,
    },
    headerStyle:{
        shadowColor:'#fff',
        elevation:0,
    },
}} >
    </Stack.Screen>
    <Stack.Screen     
    name="AddMenuItem"
    component={AddMenuItem}
    options={{           
        headerTitleStyle:{
        color:'#eaad37',
        fontSize:18,
    },
    headerStyle:{
        shadowColor:'#fff',
        elevation:0,
    },
}} >
    </Stack.Screen>
</Stack.Navigator>)
    
}
const EventStack =({navigation})=>{
          
     return(  <Stack.Navigator>
        <Stack.Screen
            name="Events"
            component={EventScreen}
            options={{
                headerTitleStyle:{
                    color:'#eaad37',
                    fontSize:18,
                },
                headerStyle:{
                    shadowColor:'#fff',
                    elevation:0,
                },
            }}
    />
<Stack.Screen
  name="Menu"
  component={MenuScreen}
  options={{
  headerTitleStyle:{
     color:'#eaad37',
     fontSize:18,},
     headerStyle:{
     shadowColor:'#fff',
     elevation:0,
 },
 headerRight:()=>
 (
     <View style={{alignItems:'center'}}>
        <Icon
        name='search'
        type='ionicon'
        color='#eaad37'
        backgroundColor='#fff'
        onPress={()=>navigation.navigate('Events')}
        />
     </View>
 ),
}}
/>
</Stack.Navigator>)
}
const SearchStack=({navigation})=>{
    return(
        <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="GoogleInput" component={GooglePlacesInput} />
      </Stack.Navigator>
    )
    
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
            component={HomeStack}
            options={({route})=>({
                tabBarLabel:'Home',
                //visible when chosen
                //tabBarVisible:route.state && route.state.index===0,
                tabBarIcon:({color,size})=>(
                    <Icon
                    name='home'
                    type='font-awesome'
                    color='#eaad37'
                    />
                ),
            })}>
            </Tab.Screen>
            <Tab.Screen
            name="Search"
            component={SearchStack}
            options={({route}) =>({
                tabBarVisible:getTabBarVisibility(route),
                //or it can be pushed back(hide)
                //tabBarVisible:route.state && route.state.index===0,
                //tabBarLabel:'Home'
            })}
            />
        <Tab.Screen
            name="Store"
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
            component={ProfileStack}
            options={{
                tabBarIcon:({color,size})=>
                {
                    <Ionicons 
                    name="calendar-outline"
                    color='#eaad37'
                    size={20}
                    />
                }
            }}
        >
        </Tab.Screen>
        </Tab.Navigator>
     );
 }
 export default AppStack;