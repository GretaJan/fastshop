import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/SubcategoryStyles';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';

//Components
import Subcategory from './SubcategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

class Subcategories extends Component {
    state = {
        // id: this.props.navigation.state.params.categoryId,
        id: this.props.route.params.categoryId,
        // id:  this.props.navigation.getParam('categoryId', null),
        tempArray: this.props.subcategories,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false
    }

    componentDidMount() {
        this.props.getSubcategories(this.props.route.params.categoryId);
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     this.state.tempArray.map(item) {
    //         if (nextPr. !== prevState.route.params.categoryId) {
    //             console.log("prevProps: ", prevState.route.params.categoryId, " nesProps: ", nextProps.route.params.categoryId )
    //           }
    //     }

    //   }

    goToProducts = (id) => {
        this.props.navigation.push("Products", {subcategoryId: id});
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

    render() {
        // const { navigation } = this.props;
        // const categoryId = this.props.navigation.getParam('categoryId');
        // console.log('nav id: ', categoryId);
        return (
            (this.props.loading) ? (
                <Loading />
            ) : (
                (this.props.error !== '') ? (
                    <Error message={this.props.error} />
                ) : (
                    <View style={stylesGuest().container}>
                    {/* {this.getInput()}
                        {!this.state.inputTriggered ? (
                            <FlatList contentContainerStyle={stylesGuest().horizontalWrap} data={this.props.subcategories} renderItem={({item}) => (
                                <Subcategory item={item} goToProducts={(item) => this.goToProducts(item)} />
                            )} />
                        ) : (
                            <FlatList contentContainerStyle={stylesGuest().horizontalWrap} data={this.state.tempArray} renderItem={({item}) => (
                                <Subcategory key={item} item={item} goToProducts={(items) => this.goToProducts(item)} />
                            )} />
                            
                        )}   */}
                        <Text>one</Text>
                    </View>
                )
            )
        )
    }

}

const mapStateToProps = (state) => {
   return {
    subcategories:state.subcategories.subcategories,
    loading: state.subcategories.loading,
    error: state.subcategories.error
   }
}

export default withNavigation(connect(mapStateToProps, {getSubcategories, getCategory})(Subcategories))