import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// import {
//   InputField,
//   InputWrapper,
//   AddImage,
//   SubmitBtn,
//   SubmitBtnText,
//   StatusWrapper,
// } from '../styles/AddItemStyle';

import { AuthContext } from '../navigation/AuthProvider';


const AddMenuItem = () => {
   
  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [itemName, setItemName]=useState(null);
  const [storeName, setStoreName]=useState(null);
 
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async (store) => {
    const imageUrl = await uploadImage();

    firestore()
    .collection("storesList").doc(storeName).collection("menu")
    .add({
      userId: user.uid,
      itemName:itemName,
      storeName:storeName,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),

    })
    .then(() => {
      console.log('Item Added!');
      Alert.alert(
        'Item published!',
        'Your item has been published Successfully!',
      );
      setItemName(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added item to firestore.', error);
    });
  }

  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);
    

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, marginBottom:20}}>Add store info</Text>
      <View >
        {image != null ? <Image source={{uri: image}} /> : null}

        <TextInput
          style={{width:300,marginBottom:5, borderWidth:1,borderRadius:15,borderColor:"#000",justifyContent:"center",alignItems:"center"}}
          placeholder="Menu item name"
          multiline

          numberOfLines={1}
          value={itemName}
          onChangeText={(itemcontent) => setItemName(itemcontent)}
        />   
        <TextInput
        style={{width:300,marginBottom:5, borderWidth:1,borderRadius:15,borderColor:"#000",justifyContent:"center",alignItems:"center"}}
        placeholder="Store name"
        multiline

        numberOfLines={1}
        value={storeName}
        onChangeText={(storecontent) => setStoreName(storecontent)}
      />
       
        {uploading ? (
          <View>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <TouchableOpacity onPress={submitPost} style={{justifyContent:'center', alignItems:"center", backgroundColor:"#eaad38", padding:20, borderRadius:10}}>
            <Text>Add</Text>
          </TouchableOpacity>
        )}
      </View>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddMenuItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});