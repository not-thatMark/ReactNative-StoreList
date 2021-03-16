import React, { useState,useEffect } from 'react';
import { FlatList,TouchableOpacity  } from 'react-native';
import storage from'@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';
import {View,Text,ActivityIndicator,Image} from 'react-native'

const MenuScreen=({route})=>{
    const [loading,setLoading]=useState(true)
    const[items,setItems]=useState([]);
    const [imageUrl, setImageUrl] = useState(undefined);
    const [storeImageUrl,setStoreImageUrl] =useState(undefined)
   
    useEffect(()=>{
      const subscriber=firestore().collection('storesList').doc('store 1').collection('menu').onSnapshot(querySnapshot=>{
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
          .ref('photos/'+'vegetables.jpg')
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
          })
          .catch((e) => console.log('Errors while downloading => ', e));
      });
      const subscriberstore=firestore().collection('storesList').onSnapshot(querySnapshot=>{
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
            .then((url1) => {
              setStoreImageUrl(url1);
            })
            .catch((e) => console.log('Errors while downloading => ', e));
        });
       return ()=>subscriber,subscriberstore();
     },[]);
    
     if(loading)
     {
       return <ActivityIndicator/>
     }
 return(
   
    
<FlatList
  data={items}
  renderItem={({item})=>(
    
    <TouchableOpacity>
    <View>
    <Text style={{backgroundColor:"#eaad37",alignItems:'center',justifyContent:'center',fontSize:22}}>Store Name:{item.storeName}</Text>
    </View>
    <View 
    styles={{height:200,flex:2,alignItems:'center',justifyContent:'center',backgroundColor:'#eaad37'}}>
    <View>
    <Text style={{fontSize:20}}>Item name: {item.itemName}</Text>
    
    <Image style={{height: 100,width:100, marginBottom:20}} source={{uri: imageUrl}} />

    </View>
   
  </View>
  </TouchableOpacity>
   
  )}/>

  
 )
}
export default MenuScreen;
