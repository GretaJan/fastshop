import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories, deleteSubcategory } from '../../redux/actions/subcategoryActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/SubcategoryStyles';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import Subcategory from './Subcategory';
import Loading from '../../components_additional/Loading';
import EmptyList from '../../components_additional/EmptyList';
import Modal from '../../components_additional/Modal';

class Subcategories extends Component {
    state = {
        id: this.props.route.params.categoryId,
        tempArray: this.props.subcategories,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false
    }

   componentDidMount  () {
        this.props.getSubcategories(this.props.route.params.categoryId, 1);
    }

    componentWillUnmount(){
    }

    loadMore = () => {
        setTimeout(() => {
            this.props.getSubcategories(this.props.route.params.categoryId, this.props.currentPage + 1);
        })
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
                // tempArray: this.props.subcategories,
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
    
    getInput = () => {
        return (
            <View style={searchBar().searchBarContainer} >
                <Icon style={searchBar().searchBarIcon} name="search" onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput style={searchBar().searchBarInput} placeholder={"Search by name"} onChangeText={value => this.searchFunction(value)} value={this.state.searchName} />}
            </View>
        )
    }
    
    goToProducts = (item) => {
        this.props.navigation.push("Products", {subcategoryId: item.id, name: item.name, background: item.background});
  
    }

    render() {
        const { background } = this.props.route.params;
        return (
            (this.props.loading) ? (
                <View style={backgroundForPages(background).backgroundContainer} >
                    <Loading />
                </View>
                ) : (
                (this.props.error !== '') ? (
                    <View style={backgroundForPages(background).backgroundContainer} >
                        <Modal title="Warning" 
                            message={this.props.error} 
                            close={() => this.props.navigation.goBack()} 
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            horizontal={20} vertical={10}/>
                    </View>
                ) : (
                    <View style={stylesGuest(background).container}>
                    {this.getInput()}
                        {(this.props.subcategories.length == 0) ? (
                            // <View style={backgroundForPages(background).backgroundContainer} >
                                <EmptyList message="The List is empty" background={background} />
                            // </View>
                        ) : (
                            <FlatList contentContainerStyle={stylesGuest().horizontalWrap} numColumns={3} 
                                    onEndReached={!this.props.lastPage ? this.handleLoadMore : null}
                                    onEndReachedThreshold={0.01}
                                    ListFooterComponent={this.props.loadingNext ? this.renderFooter : null} 
                                    data={!this.state.inputTriggered ? this.props.subcategories : this.state.tempArray } 
                                    renderItem={({item}) => (
                                <Subcategory item={item} goToProducts={() => this.goToProducts(item) } />
                            )} />  
                        )}  
                    </View>
                )
            )
        )
    }

}

const mapStateToProps = (state) => {
   return {
    subcategories: state.subcategories.subcategories,
    currentPage: state.subcategories.currentPage,
    lastPage: state.subcategories.lastPage,
    loading: state.subcategories.loading,
    loadingNext: state.subcategories.loadingNext,
    error: state.subcategories.error
   }
}

export default withNavigation(connect(mapStateToProps, {getSubcategories, deleteSubcategory})(Subcategories))