import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

function HOC(WrapperComponent) {
    class NoAuthorization extends Component {

        componentDidMount() {
            if(this.props.isAuthorized) {
                navigation.push('/dashboard')
            }
        }

        componentDidUpdate(nextProps) {
            if(nextProps.isAuthorized) {
                navigation.push('/dashboard')
            }
        }

        render() {
            return (
                <View>
                    <WrapperComponent {...this.props} />
                </View>
            )
        }
    }

    const mapStateToProps = (state) => ({
        isAuthorized: state.auth.isAuthorized
    })

    return connect(mapStateToProps, {})(NoAuthorization)
}

export default HOC