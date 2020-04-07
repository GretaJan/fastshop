import React, { Component } from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { getProduct, editProduct, deleteProduct } from '../../src/actions/productActions';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
//Components:
import Loading from '../../components_additional/Loading';
import Error from '../../components_additional/Error';

const styles = {
    container: {
        marginTop: 8,
        // marginLeft: 10,
        // marginRight: 10
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        height: 50
    },
    itemText: {
        width: 'auto',
        fontSize: 20
    },
    itemInput: {
        backgroundColor: '#fff',
        width: '75%',
        fontSize: 20
    },
    itemButton: {
        flexBasis: '40'
    },
    iconItem: {
        paddingRight: 10
    }

}

class Product extends Component {
    state = {
        productId: this.props.match.params.productId,
        subcategoryId: this.props.match.params.subcategoryId,
        name: this.props.product.name,
        energy: this.props.product.energy,
        fat: this.props.product.fat,
        saturated: this.props.product.saturated,
        carbs: this.props.product.carbs,
        sugar: this.props.product.sugar,
        fiber: this.props.product.fiber,
        protein: this.props.product.protein,
        salt: this.props.product.salt,
        vitamins: this.props.product.vitamins,
        image: this.props.product.image,
        nameInput: false,
        energyInput: false,
        fatInput: false,
        saturatedInput: false,
        carbsInput: false,
        sugarInput: false,
        fiberInput: false,
        proteinInput: false,
        saltInput: false,
        vitaminsInput: false,
    }


     async componentDidMount() {

        await this.props.getProduct(this.props.match.params.subcategoryId, this.props.match.params.productId);
        // this.setState({
        //     name: this.props.product.name,
        //     energy: this.props.product.energy,
        //     fat: this.props.product.fat,
        //     saturated: this.props.product.saturated,
        //     carbs: this.props.product.carbs,
        //     sugar: this.props.product.sugar,
        //     fiber: this.props.product.fiber,
        //     protein: this.props.product.protein,
        //     salt: this.props.product.salt,
        //     vitamins: this.props.product.vitamins,
        //     image: this.props.product.image,
        // });
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if(prevState.name !== nextProps.product.name && prevState.edited) {
    //         console.log("EDTIED: ", nextProps.product.name)
    //         return {
    //             name: nextProps.product.name,
    //         }
    //     } 
        //  if (prevState.edited) {
        //     console.log("prev: ", prevState.edited, " ", nextProps.product.name)
        //     return {
        //         name: nextProps.name,
        //         edited: false
        //     }
        // } 
    //     else {
    //         return null
    //     }
    // }

    nameInput = () => {
        this.setState({nameInput: true});
    }

    energyInput = () => {
        this.setState({energyInput: true});
    }

    fatInput = () => {
        this.setState({fatInput: true});
    }

    saturatedInput = () => {
        this.setState({saturatedInput: true});
    }

    carbsInput = () => {
        this.setState({carbsInput: true});
    }

    sugarInput = () => {
        this.setState({sugarInput: true});
    }

    fiberInput = () => {
        this.setState({fiberInput: true});
    }

    proteinInput = () => {
        this.setState({proteinInput: true});
    }

    saltInput = () => {
        this.setState({saltInput: true});
    }

    vitaminsInput = () => {
        this.setState({vitaminsInput: true});
    }
    cancelNameEdit = () => {
        this.setState({nameInput: false});
    }
    cancelEnergyEdit = () => {
        this.setState({energyInput: false});
    }
    cancelFatEdit = () => {
        this.setState({fatInput: false});
    }
    cancelSaturatedEdit = () => {
        this.setState({saturatedInput: false});
    }
    cancelNameEdit = () => {
        this.setState({nameInput: false});
    }
    cancelCarbsEdit = () => {
        this.setState({carbsInput: false});
    }
    cancelSugarEdit = () => {
        this.setState({sugarInput: false});
    }
    cancelFiberEdit = () => {
        this.setState({fiberInput: false});
    }
    cancelProteinEdit = () => {
        this.setState({proteinInput: false});
    }
    cancelSaltEdit = () => {
        this.setState({saltInput: false});
    }
    cancelVitaminsEdit = () => {
        this.setState({vitaminsInput: false});
    }

    validation() {
        if(this.state.name == null) {
            this.setState({name: this.props.product.name})
        }
        if(this.state.energy == '') {
            this.setState({energy: this.props.product.energy})
        }
        if(this.state.fat == '') {
            this.setState({fat: this.props.product.fat})
        }
        if(this.state.saturated == '') {
            this.setState({saturated: this.props.product.saturated})
        }
        if(this.state.carbs == '') {
            this.setState({carbs: this.props.product.carbs})
        }
        if(this.state.sugar == '') {
            this.setState({sugar: this.props.product.sugar})
        }
        if(this.state.fiber == '') {
            this.setState({fiber: this.props.product.fiber})
        }
        if(this.state.protein == '') {
            this.setState({protein: this.props.product.protein})
        }
        if(this.state.salt == '') {
            this.setState({salt: this.props.product.salt})
        }
        if(this.state.vitamins == '') {
            this.setState({vitamins: this.props.product.vitamins})
        }
        if(this.state.image == null) {
            this.setState({image: this.props.product.image})
        }
    }

    getInputValue = (props) => {
        if(props == 'undefined') {
            return (
            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={props} />
            )
        } else if (props == null) {
            return <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} placeholder="No value"/>
 
        }
    }

    deleteProduct = async() => {
        console.log(this.props.product.id)
        await this.props.deleteProduct(this.props.product.id);
        this.props.history.push(`/products_auth/${this.props.match.params.subcategoryId}`);
    }

    editProduct = async() => {
        // this.validation();
        const data = {
            name: this.state.name,
            energy: this.state.energy,
            fat: this.state.fat,
            saturated:  this.state.saturated,
            carbs: this.state.carbs,
            sugar: this.state.sugar,
            fiber: this.state.fiber,
            protein: this.state.protein,
            salt: this.state.salt,
            vitamins: this.state.vitamins,
            image: this.state.image,
            "_method": "put"
        }
        console.log("Name: ", this.state.name);
        await this.props.editProduct(this.props.match.params.subcategoryId, this.props.match.params.productId, data); 
        this.props.getProduct(this.props.match.params.subcategoryId, this.props.match.params.productId);
        this.setState({edited: true})
        this.cancelNameEdit();
        this.cancelEnergyEdit();
        this.cancelFatEdit();
        this.cancelSaturatedEdit();
        this.cancelNameEdit();
        this.cancelCarbsEdit();
        this.cancelSugarEdit();
        this.cancelFiberEdit();
        this.cancelProteinEdit();
        this.cancelSaltEdit();
        this.cancelVitaminsEdit();
    }

    render() {
        // const { name, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, image } = this.props;
        // const { name, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, image, triggerEdit } = this.state;
        return (
                <View style={styles.container}>
                    {(this.props.loading) ? (
                        <Loading />
                    ) : (
                    (this.props.error !== '') ? (
                        <Error message={this.props.error} />
                    ) : (
                        <View>
                            <Text>Auth Product</Text>
                            {(!this.state.nameInput) &&
                                <View style={styles.itemWrap}>
                                    <Text style={styles.itemText}>{this.props.product.name}</Text>
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.nameInput}/>
                                </View>
                            }{(this.state.nameInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => this.setState({name: value})} defaultValue={this.props.product.name} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelNameEdit} />
                                    </View>
                                </View>
                            }
                            <View>                            
                                <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.deleteProduct} />
                            </View>
                            {(!this.state.energyInput) &&
                                <View style={styles.itemWrap}>
                                    { (this.props.product.energy) && <Text style={styles.itemText}>{this.props.product.energy}</Text>}
                                    { (!this.props.product.energy) && <Text style={styles.itemText}>No value</Text>}
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.energyInput}/>
                                </View>
                            }{(this.state.energyInput) &&
                                <View style={styles.itemWrap}>  
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => this.setState({energy: value})} defaultValue={this.props.product.energy} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelEnergyEdit} />
                                    </View>
                                </View>  
                            }{(!this.state.fatInput) &&
                                <View style={styles.itemWrap}>
                                    { (this.props.product.fat) && <Text style={styles.itemText}>{this.props.product.fat}</Text>}
                                    { (!this.props.product.fat) && <Text style={styles.itemText}>No value</Text>}
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.fatInput} />
                                </View>
                            }{(this.state.fatInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => { this.setState({fat: value})}} defaultValue={this.props.product.fat} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelFatEdit} />
                                    </View>
                                </View>
                            }{(!this.state.saturatedInput) &&
                                <View style={styles.itemWrap}>
                                    {(this.props.product.saturated) && <Text style={styles.itemText}>{this.props.product.saturated}</Text>}
                                    {(!this.props.product.saturated) && <Text style={styles.itemText}>No value</Text>}
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.saturatedInput} /> 
                                </View>
                            }{(this.state.saturatedInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput  style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => { this.setState({saturated: value})}}  defaultValue={this.props.product.saturated} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelSaturatedEdit} />
                                    </View>
                                </View>
                            }{(!this.state.carbsInput) &&
                                <View style={styles.itemWrap} >
                                    {(this.props.product.carbs) && <Text style={styles.itemText}>{ this.props.product.carbs }</Text>}
                                    {(!this.props.product.carbs) && <Text style={styles.itemText}>No value</Text>}
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.carbsInput} />
                                </View>
                            }{(this.state.carbsInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => { this.setState({carbs: value})}} defaultValue={this.props.product.carbs} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelCarbsEdit} />
                                    </View>
                                </View>
                            }{(!this.state.sugarInput) &&
                                <View style={styles.itemWrap}>
                                    {(this.props.product.sugar) && <Text style={styles.itemText}>{this.props.product.sugar}</Text>}
                                    {(!this.props.product.sugar) && <Text style={styles.itemText}>No value</Text>}
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.sugarInput} /> 
                                </View>
                            }{(this.state.sugarInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => { this.setState({sugar: value})}} defaultValue={this.props.product.sugar} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelSugarEdit} />
                                    </View>
                                </View>
                            }{(!this.state.fiberInput) &&
                                <View style={styles.itemWrap}>
                                    {(this.props.product.fiber) && <Text style={styles.itemText}>{this.props.product.fiber }</Text>}
                                    {(!this.props.product.fiber) && <Text style={styles.itemText}>No value</Text>}
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.fiberInput} /> 
                                </View>
                            }{(this.state.fiberInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => { this.setState({fiber: value})}} defaultValue={this.props.product.fiber} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelFiberEdit} />
                                    </View>
                                </View>
                            }{(!this.state.proteinInput) &&
                                <View style={styles.itemWrap}>
                                    {(this.props.product.protein) && <Text style={styles.itemText}>{this.props.product.protein}</Text> }
                                    {(!this.props.product.protein) && <Text style={styles.itemText}>No value</Text> }
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.proteinInput} /> 
                                </View>
                            }{(this.state.proteinInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => { this.setState({protein: value})}} defaultValue={this.props.product.protein} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelProteinEdit} />
                                    </View>
                                </View>
                            }{(!this.state.saltInput) &&
                                <View style={styles.itemWrap}>
                                    {(this.props.product.salt) && <Text style={styles.itemText}>{this.props.product.salt}</Text>}
                                    {(!this.props.product.salt) && <Text style={styles.itemText}>No value</Text>}
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.saltInput} /> 
                                </View>
                            }{(this.state.saltInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => { this.setState({salt: value})}} defaultValue={this.props.product.salt} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelSaltEdit} />
                                    </View>
                                </View>
                            }{(!this.state.vitaminsInput) &&
                                <View style={styles.itemWrap}>
                                    {(this.props.product.vitamins) && <Text style={styles.itemText}>{this.props.product.vitamins}</Text>}
                                    {(!this.props.product.vitamins) && <Text style={styles.itemText}>No value</Text>}
                                    <Icon name="edit" size={35} color="firebrick" onPress={this.vitaminsInput} /> 
                                </View>
                            }{(this.state.vitaminsInput) &&
                                <View style={styles.itemWrap}>
                                    <TextInput style={styles.itemInput} type="text" autoCorrect={false} onChangeText={value => { this.setState({vitamins: value})}} defaultValue={this.props.product.vitamins} />
                                    <View style={styles.itemWrap}>
                                        <Icon style={styles.iconItem} name="check" size={35} color="firebrick" onPress={this.editProduct} />
                                        <Icon name="file-cancel-outline" size={35} color="firebrick" onPress={this.cancelVitaminsEdit} />
                                    </View>
                                </View>
                            }{(this.props.image && (
                                <Image source={{ uri: this.state.image}}/>
                            ))}
                        </View>
                    ))}
               </View>
        )
    }
}

const mapStateToProps = (state) => (console.log("New: ", state.products.product),{
    product: state.products.product,
    loading: state.products.loading, 
    error: state.products.error
})

export default connect(mapStateToProps, {getProduct, editProduct, deleteProduct})(Product)