import React, { Component } from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { getProduct, editProduct } from '../../src/actions/productActions';

const styles = {
    container: {
        marginTop: 10
    },
    show: {
        display: "inline-block"
    },
    hide: {
        display: "none"
    }
}

class Product extends Component {
    state = {
        productId: this.props.match.params.productId,
        subcategoryId: this.props.match.params.subcategoryId,
        name: '',
        energy: '',
        fat: '',
        saturated: '',
        carbs: '',
        sugar: '',
        fiber: '',
        protein: '',
        salt: '',
        vitamins: '',
        image: null,
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

    // static getDerivedStateFromProps(props) {
    //     if  (prevProp.product.name !== this.props.product.name ||
    //         prevProp.product.energy !== this.props.product.energy ||
    //         prevProp.product.fat !== this.props.product.fat ||
    //         prevProp.product.saturated !== this.props.product.saturated ||
    //         prevProp.product.carbs !== this.props.product.carbs ||
    //         prevProp.product.sugar !== this.props.product.sugar ||
    //         prevProp.product.fiber !== this.props.product.fiber ||
    //         prevProp.product.protein !== this.props.product.protein || 
    //         prevProp.product.salt !== this.props.product.salt ||
    //         prevProp.product.vitamins !== this.props.product.vitamins ||
    //         prevProp.product.image !== this.props.product.image) {
    //             console.log("changed");
    //             this.props.getProduct( this.state.subcategoryId, this.state.productId);
    //     } 
    // }

    componentDidMount() {
        this.props.getProduct( this.state.subcategoryId, this.state.productId);
    }

    // componentDidUpdate(prevProp){
    //     return (prevProp.product.name !== this.props.product.name ||
    //         prevProp.product.energy !== this.props.product.energy ||
    //         prevProp.product.fat !== this.props.product.fat ||
    //         prevProp.product.saturated !== this.props.product.saturated ||
    //         prevProp.product.carbs !== this.props.product.carbs ||
    //         prevProp.product.sugar !== this.props.product.sugar ||
    //         prevProp.product.fiber !== this.props.product.fiber ||
    //         prevProp.product.protein !== this.props.product.protein || 
    //         prevProp.product.salt !== this.props.product.salt ||
    //         prevProp.product.vitamins !== this.props.product.vitamins ||
    //         prevProp.product.image !== this.props.product.image)   
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

    removeInput = () => {
        this.setState({triggerInput: false});
    }

    validation() {
        if(this.state.name == null) {
            this.setState({name: this.props.product.name})
        }
        if(this.state.energy == null) {
            this.setState({energy: this.props.product.energy})
        }
        if(this.state.fat == null) {
            this.setState({fat: this.props.product.fat})
        }
        if(this.state.saturated == null) {
            this.setState({saturated: this.props.product.saturated})
        }
        if(this.state.carbs == null) {
            this.setState({carbs: this.props.product.carbs})
        }
        if(this.state.sugar == null) {
            this.setState({sugar: this.props.product.sugar})
        }
        if(this.state.fiber == null) {
            this.setState({fiber: this.props.product.fiber})
        }
        if(this.state.protein == null) {
            this.setState({protein: this.props.product.protein})
        }
        if(this.state.salt == null) {
            this.setState({salt: this.props.product.salt})
        }
        if(this.state.vitamins == null) {
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

    editProduct = () => {

        // this.validation();
        if(this.state.name == null) {
            this.setState({name: this.props.product.name})
        }
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
        console.log("value: ", this.props.energy)
        this.props.editProduct(this.state.productId, this.state.subcategoryId, data);
        this.removeEdit();
        console.log()
        this.forceUpdate();
    }

    render() {
        // const { name, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, image } = this.props;
        // const { name, energy, fat, saturated, carbs, sugar, fiber, protein, salt, vitamins, image, triggerEdit } = this.state;
        return (
                <View style={styles.container}>
                    <Text>Auth Product</Text>
                    {(!this.state.nameInput) &&
                        <View style={styles.container}>
                            <Text>{ this.props.product.name }</Text>
                            <Button title="Edit" onPress={this.nameInput} /> 
                        </View>
                    }{(this.state.nameInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.name} />
                         </View>
                    }{(!this.state.energyInput) &&
                        <View>
                            { (this.props.product.energy) && <Text>{ this.props.product.energy }</Text> }
                            { (!this.props.product.energy) && <Text>No value</Text> }
                            <Button title="Edit" onPress={this.energyInput} /> 
                        </View>
                    }{(!this.state.energyInput) &&
                        <View>                  
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.energy} />
                        </View>  
                    }{(!this.state.fatInput) &&
                        <View>
                            { (this.props.product.fat) && <Text>{ this.props.product.fat }</Text> }
                            { (!this.props.product.fat) && <Text>No value</Text> }
                            <Button title="Edit" onPress={this.fatInput} /> 
                        </View>
                    }{(this.state.fatInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.fat} />
                        </View>
                    }{(!this.state.saturatedInput) &&
                        <View>
                            {(this.props.product.saturated) && <Text>{ this.props.product.saturated }</Text> }
                            {(!this.props.product.saturated) && <Text>No value</Text> }
                            <Button title="Edit" onPress={this.saturatedInput} /> 
                        </View>
                    }{(this.state.saturatedInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.saturated} />
                        </View>
                    }{(!this.state.carbsInput) &&
                        <View>
                            {(this.props.product.carbs) && <Text>{ this.props.product.carbs } </Text> }
                            {(!this.props.product.carbs) && <Text>No value</Text> }
                            <Button title="Edit" onPress={this.saturatedInput} />  
                        </View>
                    }{(!this.state.carbsInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.carbs} />
                        </View>
                    }{(!this.state.sugarInput) &&
                        <View>
                            {(this.props.product.sugar) && <Text>{ this.props.product.sugar }</Text> }
                            {(!this.props.product.sugar) && <Text>No value</Text> }
                            <Button title="Edit" onPress={this.sugarInput} /> 
                        </View>
                    }{(this.state.sugarInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.sugar} />
                        </View>
                    }{(!this.state.fiberInput) &&
                            <View>
                                {(this.props.product.fiber) && <Text>{ this.props.product.fiber }</Text> }
                                {(!this.props.product.fiber) && <Text>No value</Text> }
                                <Button title="Edit" onPress={this.fiberInput} /> 
                            </View>
                    }{(this.state.fiberInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.faber} />
                        </View>
                    }{(!this.state.proteinInput) &&
                            <View>
                                {(this.props.product.protein) && <Text>{ this.props.product.protein }</Text> }
                                {(!this.props.product.protein) && <Text>Value</Text> }
                                <Button title="Edit" onPress={this.proteinInput} /> 
                            </View>
                    }{(this.state.proteinInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.protein} />
                        </View>
                    }{(!this.state.saltInput) &&
                            <View>
                                {(this.props.product.salt) && <Text>{ this.props.product.salt }</Text> }
                                {(!this.props.product.salt) && <Text>No value</Text> }
                                <Button title="Edit" onPress={this.saltInput} /> 
                            </View>
                    }{(this.state.saltInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.salt} />
                        </View>
                    }{(!this.state.vitaminsInput) &&
                            <View>
                                {(this.props.product.vitamins) && <Text>{ this.props.product.vitamins }</Text> }
                                {(!this.props.product.vitamins) && <Text>No value</Text> }
                                <Button title="Edit" onPress={this.vitaminsInput} /> 
                            </View>
                    }{(this.state.vitaminsInput) &&
                        <View>
                            <TextInput type="text" autoCorrect={false} onChangeText={value => { this.setState({state: value})}} defaultValue={this.props.product.vitamins} />
                        </View>
                    }{(this.props.image && (
                        <Image source={{ uri: this.props.image}} />
                    ))}
               </View>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product
})

export default connect(mapStateToProps, {getProduct, editProduct})(Product)