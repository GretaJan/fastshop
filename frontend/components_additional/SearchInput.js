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
                // matchArray.filter()
                // setNameArray(nameArray => [...nameArray, matchArray]); 
               
                console.log('matchArray:', item.name.indexOf(name) !== -1);
                
            }
            setNameArray(nameArray.concat(matchArray));
            console.log('nameArray:', nameArray);
        })
   
        // array.map((item) =>
        // console.log("find: ", item)
        // )

        // array.array.filter(item => {
        //     item.name.toLowerCase().includes(name.toLowerCase()),
        //     console.log(item.name)
        // })

    }

    return (
        <View>
            {/* <TextInput placeholder={"Search in" + {title}} onKeyPress={findFunction} onChangeText={value => setName(value)} defaultValue={name} /> */}
            <TextInput placeholder={"Search in" + {title}} onChangeText={(value) => {setName(value), findFunction(name, array)}} value={name} />
            <FlatList data={nameArray} renderItem={({item}) => (
                <Text>{item}</Text>
            )}>

            </FlatList> 
        </View>
    )
}

export default Rearch