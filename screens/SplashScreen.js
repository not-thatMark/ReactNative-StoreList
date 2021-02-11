import React from 'react';
import {View, Text, Image,TouchableOpacity,StyleSheet} from'react-native'
import Onboarding from 'react-native-onboarding-swiper'

//dots on bottom of slides
const Dots =({selected})=>
{
    let backgroudColor;
    backgroudColor=selected ?'rgba(0,0,0,0.8)':'rbga(0,0,0,0.3)'
return(
    <View
    style={{
        width:4,
        height:4,
        marginHorizontal:2,
        backgroudColor
    }}>
        
    </View>
)
}
//back, for, skip buttons
const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const SplashScreen =({navigation})=>{
return(<Onboarding
    SkipButtonComponent={Skip}
    NextButtonComponent={Next}
    DoneButtonComponent={Done}
    DotComponent={Dots}
    onSkip={()=>navigation.replace("Login")}
    onDone={()=>navigation.replace("Login")}
    
    ///pages for splash screens
    pages={[
    {
        backgroundColor:'#c2fcf7',
        image: <Image source={require('../assets/logo.png')}/>,    
        title:'Helping Local Business',
        subtitle:'I couldnt think of anything else to say'
    },
    {
        backgroundColor:'#fcb1a6',
        image: <Image source={require('../assets/logo.png')}/>,    
        title:'Helping Local Business',
        subtitle:'I couldnt think of anything else to say'
    },
    {
        backgroundColor:'#6ac888',
        image: <Image source={require('../assets/logo.png')}/>,    
        title:'Helping Local Business',
        subtitle:'I couldnt think of anything else to say'
    },
    ]}

    /> 
    )
}
export default SplashScreen;
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
// background colors
//#c2fcf7 blue
//#fcb1a6 pink
//#6ac888 green