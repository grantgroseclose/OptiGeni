import React from 'react';
import { FlexAlignType, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';




type AppIconProps = {
    name: any;
    size: number;
    backgroundColor: string;
    iconColor: string;
    align: FlexAlignType;
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
};


const AppIcon: React.FC<AppIconProps> = ({ name, size = 40, backgroundColor = colors.blue, iconColor = colors.light, align, justify }) => {
    const jfy = justify ? justify : 'center';

    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: jfy,
            alignItems: 'center',
            alignSelf: align
        }}>
            <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5}/>
        </View>
    );
}




export default AppIcon;

