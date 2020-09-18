import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getCategories } from '../../redux/actions/categoryActions';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { stylesGuest } from '../../components_additional/styles/CategoryStyles';
import { backgroundForPages } from '../../components_additional/styles/AdditionalStyles';
import { colors } from '../../components_additional/styles/Colors';
// import  NetInfo  from '@react-native-community/netinfo';

//Components
import CategoryList from './CategoryList';
import Loading from '../../components_additional/Loading';
import EmptyList from '../../components_additional/EmptyList';
import Modal from '../../components_additional/Modal';

export class Categories extends Component {
    state = {
        tempArray: this.props.categories,
        searchName: '',
        showSearchInput: false
    }
  
    componentDidMount() {
        // NetInfo.fetch().then(state => {
            // if(state.isConnected)
                this.props.getCategories();
                // console.log(this.props.categories)
        // })
    }

    findFunction = searchName => {
        const matchedData = this.props.categories.filter(item => {
            const itemData = item.name ? item.name.toLowerCase() : '';
            const textData = searchName.toLowerCase();
            return itemData.indexOf(textData) > -1; 
        });
        if(searchName == '') {
            this.setState({
                tempArray: this.props.categories,
                searchName: searchName
            });
        } else {
            this.setState({
                tempArray: matchedData,
                searchName: searchName
            });
        }
       
    }

    getInput = () => {
        return (
            <View style={stylesGuest().searchBarContainer} >
                <Icon style={stylesGuest().searchBarIcon} name="search" size={25} onPress={() => this.setState({showSearchInput: !this.state.showSearchInput }) }/>
                { this.state.showSearchInput && 
                    <TextInput style={stylesGuest().searchBarInput} placeholder={"Search by name"} onChangeText={value => this.findFunction(value)} value={this.state.searchName} />}
            </View>
        )
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
                (this.props.error !== '') ? (
                    <View style={backgroundForPages().backgroundContainer} >
                        <Modal title="Warning" 
                            message={this.props.error} 
                            close={() => this.props.navigation.navigate("Login")} 
                            ok="OK" color={colors.bordo} 
                            borderColor={colors.bordoTransparent}
                            horizontal={20} vertical={10}/>
                    </View>
                ) : (
                    <View style={stylesGuest().container} >
                        {(this.props.categories === undefined || this.props.categories.length == 0) ? (
                            <EmptyList message="The List is empty" />
                        ) : (
                            <FlatList contentContainerStyle={stylesGuest().flatList} keyExtractor={(item, index) => index.toString()} data={this.props.categories} renderItem={({item}) => (
                                <CategoryList item={item} 
                                            goToSubcategories={() => this.goToSubcategories(item)}         
                                />
                                )} >
                            </FlatList>
                        )}
                    </View>
                )
            )
        )
       
    }
}
Categories.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array,
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error,
    
});

export default withNavigation(connect(mapStateToProps, { getCategories })(Categories))
// export default connect(mapStateToProps, { getCategories })(Categories)
