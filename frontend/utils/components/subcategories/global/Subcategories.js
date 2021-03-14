import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { getSubcategories } from '../../../redux/actions/subcategoryActions';
import { withNavigation } from 'react-navigation';
import { stylesGuest } from '../../../src/styles/SubcategoryStyles';
import { containerStyles } from '../../../src/styles/GeneralStyles';
import { backgroundForPages } from '../../../src/styles/AdditionalStyles';
import { colors } from '../../../src/styles/Colors';

//Components
import Header from '../../../utils/models/Header';
import Subcategory from './Subcategory';
import Loading from '../../../utils/models/Loading';
import EmptyList from '../../../utils/models/EmptyList';
import Modal from '../../../utils/models/Modal';
import SearchBar from '../../../utils/models/SearchBar';

class Subcategories extends Component {
    state = {
        loading: true,
        loadingNext: false,
        categoryId: this.props.route.params.categoryId,
        subcategories: [], 
        searchSubcategories: [], 
        error: '', 
        currentPage: 0, 
        lastPage: 0,
        searchName: '',
        inputTriggered: false,
        showSearchInput: false,
    }

   componentDidMount() {
        getSubcategories(this.state.categoryId, 0).then(response => {
            if(response){
                const subcategoriesResp = response.subcategories;
                this.setState({ 
                    subcategories: subcategoriesResp, 
                    searchSubcategories: subcategoriesResp,
                    lastPage: response.lastPage 
                })
            } else {
                this.setState({ error: 'Įvyko klaida' })
            }
            this.setState({ loading: false })
        })

    }

    loadMore = () => {
        this.setState({ loadingNext: true })
        const { categoryId, currentPage } = this.state;
        const nextPage = currentPage + 1;
        getSubcategories(categoryId, nextPage).then(response => {
            if(response){
                this.setState({ 
                    subcategories: [...this.state.subcategories, ...response],
                    searchSubcategories:  [...this.state.searchSubcategories, ...response],
                    currentPage: nextPage
                })
            } else {
                this.setState({ error: 'Įvyko klaida' })
            }
            this.setState({ loadingNext: false })
        })
    }

    renderFooter = () => {
        return (
            <Loading />
        )
    } 
    searchFunction = searchName => {
        this.setState({inputTriggered: true});
        const matchedData = this.state.subcategories.filter(item => {
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
                searchSubcategories: matchedData,
                searchName: searchName
            })
        }
    }
    
    goToProducts = (item) => {
        this.props.navigation.push("Products", {
            subcategoryId: item.id, 
            name: item.name, 
            background: item.background,
            categoryId: this.state.categoryId,
            categoryName: this.props.route.params.name
        });
  
    }

    render() {
        const { background, name } = this.props.route.params;
        const { loading, loadingNext, subcategories, searchSubcategories, error, inputTriggered, currentPage, lastPage } = this.state;
        return (
            loading ? (
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
                        <View style={ containerStyles().screenHeightContainerNoHeader }>
                            { error !== '' && (
                                <View>
                                    <Modal 
                                        title="Warning" 
                                        message={ error } 
                                        close={() => this.setState({ error: '' }) }
                                        ok="OK" color={colors.bordo} 
                                        borderColor={colors.bordoTransparent}
                                        horizontal={20} vertical={10}
                                    />
                                </View>
                            )}
                            {(subcategories.length === 0) ? (
                                <EmptyList message="The List is empty" background={background} />
                            ) : (
                                <>
                                    <FlatList 
                                        contentContainerStyle={ stylesGuest().horizontalWrap } numColumns={3} 
                                        keyExtractor={(item, index) => index.toString()}
                                        onEndReached={ currentPage < lastPage ? this.loadMore : null }
                                        onEndReachedThreshold={ 0.02 }
                                        ListFooterComponent={ loadingNext ? this.renderFooter : null } 
                                        data={ !inputTriggered ? subcategories : searchSubcategories } 
                                        renderItem={({ item, index }) => (
                                            <Subcategory 
                                                item={ item } 
                                                index={ index }
                                                goToProducts={ () => this.goToProducts(item) } 
                                            />
                                            
                                    )} />   
                                </>
                            )}  
                        </View>
                    </>
                )
            )
        }
    }

Subcategories.propTypes = {
    getSubcategories: PropTypes.func.isRequired,
    searchSubcategories: PropTypes.arrayOf(PropTypes.shape({
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
    currentPage: PropTypes.number,
    lastPage: PropTypes.bool,
    loading: PropTypes.bool,
    loadingNext: PropTypes.bool,
    error: PropTypes.string,
}

export default withNavigation(Subcategories)