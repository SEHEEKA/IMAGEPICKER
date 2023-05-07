import React from 'react';
import { Button, Image, Text,View, Platform, ToastAndroid,FlatList } from 'react-native';

import firebase from 'firebase';
export default class Gallery extends React.Component{
    constructor(){
        super();
         this.state={
             images:[],
             posts:[]
         }
    }
    componentDidMount(){
       // this.fetchImages()
       this.fetchPosts()
    }

    fetchPosts = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let posts = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              posts.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
         
          this.setState({ posts: posts});
           console.log("state value"+this.state.posts);
           console.log(posts)
          
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };







/*
  
    fetchImages(){
      var images=[]
let imageRef = firebase.storage().ref('/UploadedImages/');

imageRef
.listAll()
.then((result)=>{
  result.items.forEach((imageRef)=>{
      imageRef.getDownloadURL().then((url)=>{
        this.setState({
            images:[...this.state.images,url]
        })
          
      })
    
      .catch(function(error){})
      
  })
})
.catch((e)=>
console.log(e))
  
  
      }
*/
      renderItem=({item})=>{
        console.log("I am here")
        console.log(item)
         return( <View>
         <Image source={{uri:item.value.image}} 
          style={{marginTop:150,width:300,height:300}}>

          </Image>
         
          <Text>{item.value.caption}</Text>
          </View>)
      }
      keyExtractor=(index,item)=>index.toString()
  

    render(){
            return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

{
    !this.state.posts[0]?
    <Text>No images available</Text>
    :
    <FlatList
    data={this.state.posts}
    renderItem={this.renderItem}
    keyExtractor={this.keyExtractor}
    />
}

                  
                       

                   
                     
    </View>
            )
    }
}




