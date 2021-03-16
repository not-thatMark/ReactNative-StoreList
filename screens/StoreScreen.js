import React from 'react';
import {View,Text,Image} from 'react-native';

const StoreScreen=()=>{
    return 
    (
        <View>
            <Image source={require('../assets/imagePlaceholder/food1.jpg')}></Image>
            <Text>this is the single item screen.</Text>
        </View>
    )
}
export default StoreScreen;