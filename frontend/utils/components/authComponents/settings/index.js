import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { logOut } from '../../../redux/actions/authActions';
import { containerStyles } from '../../../src/styles/GeneralStyles';

//Components
import Header from '../../../utils/models/Header';
import CalendarItem from './CalendarItem';

function settingsIndex({ logOut, token, 
    navigation: { navigate } }){

    return (
        <>
            <Header 
                title='Settings'
                navigate={ null }
            />
            <View style={ containerStyles().screenHeightContainerNoHeader }>
                <View style={ containerStyles().topContainer }>
                    <CalendarItem 
                        navigation={ (link) => navigate(link) } 
                        logOut={ logOut }
                        token={ token }
                    />
                </View>
            </View>
        </>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default withNavigation(connect(mapStateToProps, { logOut })(settingsIndex))