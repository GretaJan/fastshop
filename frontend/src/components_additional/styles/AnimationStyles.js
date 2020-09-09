import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import {Dimensions} from 'react-native';

export const animations = (scale) => StyleSheet.create({
    diagramScale: {
        transform: [
            { scaleX: scale }
        ]
    },
    
})
