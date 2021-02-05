import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getCategories } from '../../redux/actions/categoryActions';
import { closeErrorWarning } from '../../redux/actions/generalActions';
import { stylesGuest } from '../../components_additional/styles/CategoryStyles';
import { backgroundForPages, modalZIndex } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';
import  NetInfo  from '@react-native-community/netinfo';
// import { checkInternetConnection, offlineActionCreators } from 'react-native-offline';

//Components
import Category from './Category';
import Loading from '../../components_additional/Loading';
import EmptyList from '../../components_additional/EmptyList';
import Modal from '../../components_additional/Modal';

export class Categories extends Component {
    // constructor(props){
    //     (props);
    //     this.state = {
            // isConnected: checkInternetConnection(),
            // connectionChange: offlineActionCreators,
    //     }
    // }
    // async checkOnlineStatus(dispatch){
    //     const isConnected = await checkInternetConnection();
    //     const { connectionChange } = offlineActionCreators;
    //     dispatch(connectionChange(isConnected))
    // }
    componentDidMount() {
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                this.props.getCategories();
            }
        })
    }

    goToSubcategories = (item) => {
        this.props.navigation.push("Subcategories", {categoryId: item.id, name: item.name, background: item.background});
    }

    render() {
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages().backgroundContainer} >
                    <Loading />
                </View>
                ) : (
                    <>
                    { this.props.error !== '' && (
                        <Modal 
                            title="Warning" 
                            message={this.props.error} 
                            close={() => this.props.closeErrorWarning('REMOVE_GET_CATEGORIES_ERR') }
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            horizontal={20} vertical={10}
                        />
                    )}
                        <View style={stylesGuest().container} >
                            {(this.props.categories === undefined || this.props.categories.length == 0) ? (
                                <EmptyList message="The List is empty" />
                            ) : (
                                <FlatList 
                                    contentContainerStyle={stylesGuest().flatList} 
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.props.categories} 
                                    renderItem={({item}) => (
                                    <Category 
                                        item={item} 
                                        goToSubcategories={() => this.goToSubcategories(item)}         
                                    />
                                )} />
                            )}
                        </View>
                        </>
                    )
                )
            }
        }

Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.any,
        background: PropTypes.string
    }))
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error,
    
});

export default withNavigation(connect(mapStateToProps, { getCategories, closeErrorWarning })(Categories))
