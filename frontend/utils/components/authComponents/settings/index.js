import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { logOut } from '../../../redux/actions/authActions';
import { containerStyles } from '../../../src/styles/GeneralStyles';
import { stylesGuest } from '../../../src/styles/SubcategoryStyles';

//Components
import Header from '../../../utils/models/Header';

function settingsIndex({ logOut, token, navigation: { navigate } }){

    return (
        <>
            <Header 
                title='Kalendorius'
                navigate={ null }
            />
            <View style={ containerStyles().screenHeightContainerNoHeader }>
                <View style={ containerStyles().topContainer }>
                    <View style={stylesGuest().horizontalWrap}>
                        <TouchableOpacity onPress={ () => navigate("Calendar") } style={stylesGuest().itemWrap}>
                            <Text>Kalendorius</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => logOut(token) } style={stylesGuest().itemWrap}>
                            <Text>Atsijungti</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default withNavigation(connect(mapStateToProps, { logOut })(settingsIndex))