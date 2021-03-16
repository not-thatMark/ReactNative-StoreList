import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image,TextInput,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import {ListItem,Icon} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


const EventScreen = ({navigation}) =>{
 const [loading,setLoading]=useState(true)
 const[items,setItems]=useState([]);
 const [imageUrl, setImageUrl] = useState(undefined);
const [image,setImage]=useState(null);

 useEffect(()=>{
  const subscriber=firestore().collection('storesList').onSnapshot(querySnapshot=>{
  const items=[];
  querySnapshot.forEach(documentSnapshot=>{
    items.push({
      ...documentSnapshot.data(),
      key:documentSnapshot.id,
    });
  });
  setItems(items);
  setLoading(false)
  storage()
      .ref('photos/'+'Park-Hyatt-The-Dining-Room.jpg')
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  });
   return ()=>subscriber();
 },[]);

 if(loading)
 {
   return <ActivityIndicator/>
 }
//  

  return(
  <FlatList
  data={items}
  renderItem={({item})=>(
    <TouchableOpacity
    onPress={()=>navigation.navigate('Menu', {userId: item.storeName})}
    >
    <View 
    styles={{height:200,flex:2,alignItems:'center',justifyContent:'center',backgroundColor:'#eaad37'}}>
    
    <Text style={{backgroundColor:"#eaad37",alignItems:'center',justifyContent:'center',fontSize:18}}>Store Name:{item.store}</Text>
    <Text>Store description: {item.store}</Text>
    <Text>Store Name: {item.storeName}</Text>
    <Text>Store address: {item.storeAddress}</Text>
    <Image style={{height: 200, marginBottom:20}} source={{uri: imageUrl}} />

  </View>
  
    
  
    </TouchableOpacity>
   
  )}/>


 )
}
export default EventScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchBox: {
      marginTop: Platform.OS === 'ios' ? 40 : 20, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '90%',
      alignSelf:'center',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
})