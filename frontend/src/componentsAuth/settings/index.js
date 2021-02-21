import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';

function settingsIndex({ navigation: { navigate } }){

    return (
        <View style={ backgroundForPages().backgroundContainer }>
            <TouchableOpacity onPress={ () => navigate("Calendar") }>
                <Text>Calendar</Text>
            </TouchableOpacity>
        </View>
    )

}

export default withNavigation(settingsIndex)