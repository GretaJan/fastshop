import React from 'react';
import { View, Text, Image } from 'react-native';

function ResultProduct({ subcategoryId, productId, name, image, likeProduct, selectProduct, putToCart }){

    const nameSlice = (name) => {
        if(name.length > 33) {
           var newName = name.slice(0, 33);
            return (
                <Text style={diagram().text}>{ newName }...</Text>
            )
        } else {
            return (
                <Text style={diagram().text}>{ name }</Text>
            )
        }
    }

    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => navigate("Product", { subcategoryId: subcategoryId, productId: productId })}>
                    {image ? (
                        <Image source={{ uri: image }} />
                        ) : (
                            <Image source={require('../../rc/images/noimage.jpeg')}  />
                    )}
                    <View >
                        <Text style={ textStyle().h4 }>{ nameSlice(name) }</Text>
                    </View>
                </TouchableOpacity>
                <AnimatedIonIcon name="md-close" color='#ff7725' style={ diagram(null, translateMismatch).iconTranslation } />
            </View>
        </View>
    )
}

export default ResultProduct