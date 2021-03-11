import React, { Component } from 'react';
import { View, FlatList, TextInput, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSubcategories } from '../../redux/actions/subcategoryActions';
import { closeErrorWarning } from '../../redux/actions/generalActions';
import { withNavigation } from 'react-navigation';
import { stylesGuest } from '../../components_additional/styles/SubcategoryStyles';
import { containerStyles } from '../../components_additional/styles/GeneralStyles';
// import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import Header from '../../components_additional/models/Header';
import Subcategory from './Subcategory';
import Loading from '../../components_additional/models/Loading';
import EmptyList from '../../components_additional/models/EmptyList';
import Modal from '../../components_additional/models/Modal';
import SearchBar from '../../components_additional/models/SearchBar';

class Subcategories extends Component {
    state = {
        id: this.props.route.params.categoryId,
        tempArray: this.props.subcategories,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false,
    }

   componentDidMount() {
        this.props.getSubcategories(this.props.allSubcategories, this.state.id, 0);
    }

    loadMore = () => {
        this.props.getSubcategories(this.props.allSubcategories, this.state.id, this.props.nextPage);
    }

    renderFooter = () => {
        return (
             <Loading />
        )
    } 
    searchFunction = searchName => {
        this.setState({inputTriggered: true});
        const matchedData = this.props.subcategories.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const textInput = searchName.toLowerCase();
            return itemData.indexOf(textInput) > -1;
        });
        if(searchName == '') {
            this.setState({
                inputTriggered: false,
                searchName: searchName
            })
        } else {
            this.setState({
                tempArray: matchedData,
                searchName: searchName
            })
        }
    }
    
    goToProducts = (item) => {
        this.props.navigation.push("Products", {
            subcategoryId: item.id, 
            name: item.name, 
            background: item.background,
            categoryId: this.state.id,
            categoryName: this.props.route.params.name
        });
  
    }

    render() {
        const { background, name } = this.props.route.params;
        return (
            this.props.loading ? (
                <View style={backgroundForPages(background).backgroundContainer} >
                    <Loading />
                </View>
                ) : (
                    <>
                        <Header 
                            title={ name }
                            navigate={ () => this.props.navigation.push("Categories") }
                        />
                        <SearchBar 
                            func={ (value) => this.searchFunction(value) }
                            parentValue={ this.state.searchName }
                        />
                        <View style={ containerStyles().simpleContainer }>
                        { this.props.error !== '' && (
                            <View>
                                <Modal 
                                    title="Warning" 
                                    message={this.props.error} 
                                    close={() => this.props.closeErrorWarning('REMOVE_GET_SUBCATEGORIES_ERR') }
                                    ok="OK" color={colors.bordo} 
                                    borderColor={colors.bordoTransparent}
                                    horizontal={20} vertical={10}
                                />
                            </View>
                        )}
                            {(this.props.subcategories.length === 0) ? (
                                <EmptyList message="The List is empty" background={background} />
                            ) : (
                                <FlatList 
                                        contentContainerStyle={stylesGuest().horizontalWrap} numColumns={3} 
                                        onEndReached={!this.props.lastPage ? this.handleLoadMore : null}
                                        onEndReachedThreshold={0.01}
                                        ListFooterComponent={this.props.loadingNext ? this.renderFooter : null} 
                                        data={!this.state.inputTriggered ? this.props.subcategories : this.state.tempArray } 
                                        renderItem={({item, index}) => (
                                    <Subcategory 
                                        item={item} 
                                        index={ index }
                                        goToProducts={() => this.goToProducts(item) } 
                                    />
                                )} />  
                            )}  
                            { this.props.nextPage < this.props.lastPage && (
                                <TouchableOpacity onPress={this.loadMore} ><Text>More</Text></TouchableOpacity>
                            ) }
                        </View>
                    </>
                )
            )
        }
    }

Subcategories.propTypes = {
    getSubcategories: PropTypes.func.isRequired,
    tempArray: PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string,
        image: PropTypes.any,
    })),
    inputTriggered: PropTypes.bool,
    showSearchInput: PropTypes.bool,
    subcategories: PropTypes.arrayOf(PropTypes.shape({
        name:  PropTypes.string.isRequired,
        image: PropTypes.any,
        background: PropTypes.string
    })),
    nextPage: PropTypes.number,
    lastPage: PropTypes.bool,
    loading: PropTypes.bool,
    loadingNext: PropTypes.bool,
    error: PropTypes.string,
}

const mapStateToProps = (state) => {
   return {
    allSubcategories: state.dataUpload.allSubcategories,
    subcategories: state.subcategories.subcategories,
    nextPage: state.subcategories.nextPage,
    lastPage: state.subcategories.lastPage,
    loading: state.subcategories.loading,
    loadingNext: state.subcategories.loadingNext,
    error: state.subcategories.error
   }
}

export default withNavigation(connect(mapStateToProps, { getSubcategories, closeErrorWarning })(Subcategories))