import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';

function HOC(WrapperComponent) {
    class NoAuthorization extends Component {

        componentDidMount() {
            if(this.props.isAuthorized) {
                this.props.history.push('/dashboard')
            }
        }

        componentDidUpdate(nextProps) {
            if(nextProps.isAuthorized) {
                this.props.history.push('/dashboard')
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

    return withRouter(connect(mapStateToProps, {})(NoAuthorization))
}

export default HOC