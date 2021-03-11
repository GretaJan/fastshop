import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getCategories } from '../../redux/actions/categoryActions';
import { importAppData, closeErrorWarning } from '../../redux/actions/generalActions';
import { stylesGuest } from '../../components_additional/styles/CategoryStyles';
import { containerStyles } from '../../components_additional/styles/GeneralStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import Category from './Category';
import Loading from '../../components_additional/models/Loading';
import EmptyList from '../../components_additional/models/EmptyList';
import Modal from '../../components_additional/models/Modal';
import ConfirmModal from '../../components_additional/models/ModalCrud';
import Header from '../../components_additional/models/Header';

export class Categories extends Component {

    dataTransferModelMsg(){
        if(this.props.loadingData) return "Loading data...";
        else return "Load new data?";
    }

    goToSubcategories = (item) => {
        this.props.navigation.push("Subcategories", {categoryId: item.id, name: item.name, background: item.background});
    }

    render() {
       
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages().backgroundContainer} >
                    { openDataModel ? (
                        <ConfirmModal message={ dataTransferModelMsg() }
                            confirm={() =>  this.props.importAppData()}
                            title="Clear list"
                            close={() => this.setState({openDataModel: false})}
                            background={colors.mainWhiteYellow}
                            iconColor={colors.lightBurgundy}
                            borderColor={colors.bordoTransparent}
                            colorOne={colors.lightBurgundy}
                            colorTwo={colors.mediumGreen}
                            horizontal={20} vertical={15}
                        /> 
                    ) : (
                        <Loading />
                    )}
                </View>
                ) : (
                    <>
                        <Header 
                            title="Nutritase"
                            navigate={ null }
                        />
                        <View style={ containerStyles().screenHeightContainerNoHeader }>
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
                                    <Text style={stylesGuest().descriptionText }>Find the best product match for preferred nutrition criteria.</Text>
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
                            </View>
                        </>
                    )
                )
            }
        }

Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.any,
        background: PropTypes.string
    }))
}

const mapStateToProps = (state) => ({
    // token: state.auth.token,
    // loadingData: state.dataUpload.loadingData,
    // dataUploaded: state.dataUpload.dataUploaded,
    categories: state.dataUpload.categories,
    loading: state.categories.loading,
    error: state.categories.error,
});

export default withNavigation(connect(mapStateToProps, { importAppData, getCategories, closeErrorWarning })(Categories))
