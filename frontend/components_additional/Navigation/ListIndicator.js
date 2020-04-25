import React  from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';


const ListIndicator = ({selectedProducts, style}) => {
   
    return ( 
        <Text style={style} >{selectedProducts.length}</Text>
    )
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts.comparisonArray
})

export default connect(mapStateToProps)(ListIndicator)
