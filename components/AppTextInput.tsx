import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors, { material_colors } from "../config/colors";




type InputProps = {
    icon: any;
};


const AppTextInput: React.FC<InputProps & TextInputProps> = ({icon, ...otherProps}) => {
    return (
        <View style={styles.container}>
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={colors.medium}
                    style={styles.icon}
                />
            )}
            <TextInput clearButtonMode='while-editing' style={styles.text} {...otherProps} />
        </View>
    );
}








const styles = StyleSheet.create({
    container: {
        backgroundColor: material_colors.grey.darken4,
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'Avenir',
        color: material_colors.grey.lighten2
    }
});


export default AppTextInput;

