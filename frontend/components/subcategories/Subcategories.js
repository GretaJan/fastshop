import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getSubcategories, deleteSubcategory } from '../../src/actions/subcategoryActions';
import { getCategory } from '../../src/actions/categoryActions';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/SubcategoryStyles';
import { searchBar } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';

//Components
import Subcategory from './SubcategoryList';
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';
import Modal from '../../components_additional/Modal';

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
        this.props.navigation.push("Products", {subcategoryId: item.id, backgroundColor: item.background_color});
  
    }

    render() {
        return (
            (this.props.loading) ? (
                <Loading />
            ) : (
                (this.props.error !== '') ? (
                    <Modal title="Warning" 
                        message={this.props.error} 
                        close={() => this.props.navigation.goBack()} 
                        ok="OK" color={colors.bordo} 
                        borderColor={colors.bordoTransparent}
                        horizontal={20} vertical={10}/>
                ) : (
                    <View style={stylesGuest().container}>
                    {this.getInput()}
                        {(this.props.subcategories.length == 0) ? (
                            <Modal title="Warning" 
                                message="The list is empty. PLease go back." 
                                close={() => this.props.navigation.goBack()} 
                                ok="OK" color={colors.mainYellow} 
                                borderColor={colors.mainYellowTransparent}
                                horizontal={20} vertical={10}/>
                        ) : (
                            !this.state.inputTriggered ? (
                                <FlatList contentContainerStyle={stylesGuest().horizontalWrap} data={this.props.subcategories} renderItem={({item}) => (
                                    <Subcategory item={item} goToProducts={() => this.goToProducts(item)} />
                                )} />
                            ) : (
                                <FlatList contentContainerStyle={stylesGuest().horizontalWrap} data={this.state.tempArray} renderItem={({item}) => (
                                    <Subcategory key={item} item={item} goToProducts={() => this.goToProducts(item)} />
                                )} />
                            )    
                        )}  
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

export default withNavigation(connect(mapStateToProps, {getSubcategories, deleteSubcategory})(Subcategories))