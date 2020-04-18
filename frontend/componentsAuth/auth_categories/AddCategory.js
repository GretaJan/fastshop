import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TextInput, Image, PushNotificationIOS } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { addCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20
    },
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    }
})

class AddCategory extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            image: null
        }
    }

    clearInputs = () => {
        this.textInputRef.clear();
    } 

    handleChoosePhoto = () => {
        const options = {
            noData: false,
            // storageOptions: {
            //     cameraRoll: true,
            //     waitUntilSaved: true,
            //   },
        };
        ImagePicker.launchImageLibrary(options, response => {
            // console.log("image response: ", response);
            // let source = 'data:image/jpeg;base64,' + response.data
            if (response.uri) {
                this.setState({image: response})
            }   
        })
    }

    addCategory = async () => {
        // const data = {
        //     name: this.state.name,
        //     image: this.state.image,
        // }

        const { image } = this.state;

        const getUri = image.type.split('/');
        const fileExtension = getUri[getUri.length - 1];

        // const data = new FormData();
        // data.append("image", 
        //     // uri: image.uri,
        //     // name: image.filename,
        //     // type: fileExtension
        //     // name: image.fileName,
        //     // uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
        //     // {uri: image.path}
        //     // type:  image.type,
        //     // uri: image.uri,
        //     // name: 'image.jpg'
        // );
        // data.append('image', {uri: image.uri,name: 'photo.png',filename :'imageName.png',type: 'image/png'});
        // const file = {
        //     uri: image.uri,
        //     name: image.fileName,
        //     type: image.type
        //   }
        // const file = {uri: image.uri, name: 'image', type: 'image/jpg'}

        // file = {
            // uri: this.state.image.path,
            // type: this.state.image.mime,
            // size: this.state.image.size,
            // name: image.fileName
        //     uri: image.uri, name: image.fileName, type: image.type
        // }
        // if (image.uri !== null) {
        //     let filename = image.uri.split("/").pop();
        //     // data.append("image", {
        //     //   uri: image.uri,
        //     //   name: image.fileName,
        //     //   type: "image/jpeg",
        //     // // type: 'multipart/form-data'
        //     //   data: image.data
        //     // });

        //     data.append("image", image);
        //   } else {
        //     data.append("image", null);
        //   }

// data.append("image", file);
// data.append('image', {
//     // uri: image.uri,
//     uri: "data:image/png;base64," + image.data,

// });
// let splitLength = this.state.image.path.split('/').length;
// let splitting = this.state.image.path.split('/');
// let newPath =splitting[splitLength-1];

// console.log("URI: ", newPath )

// data.append('image',{  type:image.type, uri : this.state.image.path , name:image.fileName});

let cleanURI = image.uri.replace("content://", "");

var realPath = null;
await RNFetchBlob.fs.stat(image.uri)
    .then((stats) => {
        realPath = stats.path;
    }
        )
    .catch((err) => {console.log("STATS: ", err)})

    let realPathBlob = RNFetchBlob.wrap(realPath).replace("///", "//");
// console.log("realPathBlob", realPathBlob)
// console.log("realPath: ", typeof(realPath));
    // let file = {type: image.type,  name: image.fileName, data: realPathBlob };

// data.append('image', image.data);
// data.append('name', this.state.name)

const data = {
    image: "data:" + image.type + ";base64," + image.data,
    name: this.state.name
}
console.log("data:" + image.type + ";base64," + image.data);
// data.append('image', { type: image.type, uri: image.uri,  filename: image.fileName });
// data.append('image', {  uri: "data:image/png;base64," + image.data });
// let file = {uri: image.uri };

// data.append('image',  JSON.stringify(file));
// data.append("image", JSON.stringify(null));
        // data.append("name",this.state.name);

// data.append('image', { uri: image.uri });
// let file = { name: 'image', filename: image.fileName, type: image.type, data: image.data };

// console.log("Array", [name, file]);
// console.log("TYPE: ", typeof(file));
        this.props.addCategory(data);
        // this.props.navigation.push("Dashboard")
        
        // console.log("data:", typeof(data));
        // RNFetchBlob.fetch('POST', 'http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/addCategory', 
        // {
        //     // Accept: 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //     body: data})
        // .then((response) => response.json())
        // .then((RetrievedData) => {
        //     console.log(RetrievedData);
        // }).catch((err, resp) =>console.log("Error:", err , " and " , resp, "data: ", data))

    //    fetch('POST', 'http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/addCategory', {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //        },  body: data})
    //     .then((response) => response.json())
    //     .then((RetrievedData) => {
    //         console.log(RetrievedData);
    //     }).catch((err, resp) =>console.log("Error:", err , " and " , resp, "data: ", data))

    // axios.post('http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/addCategory', data)
    //     .then((RetrievedData) => {
    //         console.log(RetrievedData);
    //     }).catch((err, resp) =>console.log("Error:", err , " and " , resp, "data: ", data))
    }

        render() {
            return (
                <View>
                    <Text>Add New Category</Text>
                        <TextInput type="text" autoCorrect={false}  placeholder="name" onChangeText={value => { this.setState({name: value})}} value={this.state.name} ref={ref => this.textInputRef = ref} />
                        {/* <Label>Add image</Label> */}
                        {this.state.image && (
                            <View>
                                <Image style={{width: 50, height: 50}} source={{ uri: this.state.image.uri }} />
                            </View>
                        )}
                        <Button title="Choose image" onPress={this.handleChoosePhoto} />
                        <Button title="Save" className="btn btn-primary" onPress={this.addCategory} />
                        <Button title="Cancel" className="btn btn-primary" />
                </View>
            )

    }

}

export default withNavigation(connect(null, { addCategory })(AddCategory))