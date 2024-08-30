import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors, { material_colors } from "../config/colors";
import { screenWidth } from "../config/dimensions";




type NewTaskButtonProps = {
	onPress: () => void;
};


const NewTaskButton: React.FC<NewTaskButtonProps> = ({ onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={{alignSelf: 'center'}}>
			<View style={styles.container}>
				<MaterialCommunityIcons
					name="plus-circle"
					color={material_colors.cyan.accent3}
					size={screenWidth * .25}
				/>
			</View>
		</TouchableOpacity>
	);
}




const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: 'transparent',
		shadowOpacity: 0.7,
		shadowRadius: 10,
		shadowColor: material_colors.cyan.accent3,
		bottom: 20,
		height: screenWidth * .25,
		justifyContent: "center",
		alignSelf: 'center',
		width: screenWidth * .25,
	},
});


export default NewTaskButton;

