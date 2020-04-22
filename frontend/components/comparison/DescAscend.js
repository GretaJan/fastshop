import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = {
    container: {
        marginTop: 8,
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    itemText: {
        width: 'auto',
        fontSize: 20
    },
    itemButton: {
        flexBasis: '40'
    },
    iconItem: {
        paddingRight: 10
    }

}

const DescAscend = ({funcDesc, funcAsc, energyDescend, energyAscend, fatDescend, fatAscend, saturatedDescend, saturatedAscend,
                        carbsDescend, carbsAscend, sugarDescend, sugarAscend, fiberDescend, fiberAscend, proteinDescend, 
                        proteinAscend, saltDescend, saltAscend, vitaminsDescend, vitaminsAscend, goBack }) => {

        return (
         <View style={stylesGuestSingle().container} >
             <ScrollView style={stylesGuestSingle().listContainer} >
                <TouchableOpacity onPress={funcDesc(energyDescend)}>
                    <Text>Energy from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(energyAscend)}>
                    <Text>Energy from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcDesc(fatDescend)}>
                    <Text>Fat from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(fatAscend)}>
                    <Text>Fat from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcDesc(saturatedDescend)}>
                    <Text>Saturated fat from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(saturatedAscend)}>
                    <Text>Saturated fat from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcDesc(carbsDescend)}>
                    <Text>Carbohidrates from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(carbsAscend)}>
                    <Text>Carbohidrates from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcDesc(sugarDescend)}>
                    <Text>Sugar from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(sugarAscend)}>
                    <Text>Sugar from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcDesc(fiberDescend)}>
                    <Text>Fiber from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(fiberAscend)}>
                    <Text>Fiber from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcDesc(proteinDescend)}>
                    <Text>Protein from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(proteinAscend)}>
                    <Text>Protein from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcDesc(saltDescend)}>
                    <Text>Salt from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(saltAscend)}>
                    <Text>Salt from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcDesc(vitaminsDescend)}>
                    <Text>Vitamins from largest</Text>
                    <Icon name="arrow-circle-up" />
                </TouchableOpacity>
                <TouchableOpacity onPress={funcAsc(vitaminsAscend)}>
                    <Text>Vitamins from smallest</Text>
                    <Icon name="arrow-circle-down" />
                </TouchableOpacity>
            </ScrollView>
            <Button title="Clear results" onPress={goBack} />
        </View>
        )
}

export default DescAscend