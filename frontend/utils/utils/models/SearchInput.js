import React, { useState }from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';

const Rearch = (array, title) => {
    const [name, setName] = useState('');
    const [nameArray, setNameArray] = useState([]);

    const findFunction = (name, array) => {
        var matchArray=[];
        array.array.map(item =>{
            if(item.name.indexOf(name) !== -1) {
                matchArray.push(item.name)
            }
            setNameArray(nameArray.concat(matchArray));
        })
    }

    return (
        <View>
            <TextInput placeholder={"Search in" + {title}} onChangeText={(value) => {setName(value), findFunction(name, array)}} value={name} />
            <FlatList data={nameArray} renderItem={({item}) => (
                <Text>{item}</Text>
            )}>

            </FlatList> 
        </View>
    )
}

export default Rearch