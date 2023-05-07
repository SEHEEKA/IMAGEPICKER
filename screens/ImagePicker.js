import React from 'react';
import { Button, Image, View, Platform, ToastAndroid,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';

export default class PickImage extends React.Component{
    constructor(){
        super();
        this.state={
            image:null,
            caption:""
           
        }
    }
    pickImage=async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            this.setState({
                image:result.uri
            })
          }
    }
    upload = async() => {
    //if you want to use storage, then uncomment these lines .works fine without this too!
     /*   const uri=this.state.image;
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref('/UploadedImages/').child(new Date().toString());
        ref.put(blob);

       
        ref.getDownloadURL().then((url)=>{
        this.setState({
            images:[...this.state.images,url]
        })
        })
*/
         console.log(this.state.caption)
          console.log(this.state.image)
        let notePost={
          caption:this.state.caption,
         image:this.state.image
        }
      await firebase
        .database()
        .ref(
          "/posts/" +
            Math.random()
              .toString(36)
              .slice(2)
        )
        .set(notePost)
      }

    render(){
            return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Button 
                    title="Pick an image from camera roll" 
                    onPress={this.pickImage} 
                    />

                   
                     {this.state.image?
                      <View>
                     <Image source={{ uri: this.state.image }} 
                     style={{ width: 200, height: 200 }} />
                     
                     <TextInput
                         // style={styles.captionBox}
                          placeholder={"Caption..."}
                          placeholderTextColor={"#111634"}
                          multiline={true}
                          numberOfLines={4}
                          onChangeText={caption => this.setState({caption})}
                      />
                     
                     <Button title='Upload' color='green' onPress={()=>{
                       this.upload()
                       this.props.navigation.navigate("Gallery")
                     }}/>
                     </View>
                     :undefined}
                     
    </View>
            )
    }
}