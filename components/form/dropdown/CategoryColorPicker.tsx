import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useField, useFormikContext } from "formik";
import FormInputFieldProps from "../../../types/form/FormInputFieldProps";

import colors, { material_colors } from "../../../config/colors";
import AppText from "../../AppText";
import extractCategoryColorDropdownData, { CategoryColorDropdownData } from "../../../utility/extractCategoryColorDropdownData";




const CategoryColorPicker: React.FC<FormInputFieldProps> = ({
	...otherProps
}) => {
	const { setFieldValue } = useFormikContext();
	const [ field ] = useField(otherProps);

    const categoryColorDropdownData = extractCategoryColorDropdownData();

	const handleSelect = (item: CategoryColorDropdownData) => setFieldValue(field.name, item.value);


	return (
		<Dropdown
			style={styles.dropdown}
			placeholderStyle={styles.placeholderStyle}
			selectedTextStyle={styles.selectedTextStyle}
			inputSearchStyle={styles.inputSearchStyle}
			containerStyle={styles.container}
			iconStyle={styles.iconStyle}
			data={categoryColorDropdownData}
			search
			maxHeight={300}
			labelField="label"
			valueField="value"
			placeholder="Select color"
			searchPlaceholder="Search..."
			value={field.value}
			onChange={handleSelect}
			activeColor={material_colors.grey.darken4}
			renderItem={(item: CategoryColorDropdownData) => (
				<View style={{borderLeftWidth: 3, borderRadius: 10, borderColor: item.color, height: 48, justifyContent: 'center'}}>
					<AppText passedStyle={{paddingLeft: 8, fontFamily: 'Inter-Thin'}} text={item.label} />
				</View>
			)}
			renderLeftIcon={() => (
				<MaterialCommunityIcons style={styles.icon} color="gray" name="format-color-fill" size={20} />
			)}
		/>
	);
};





const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.dark,
		borderWidth: 0,
		borderRadius: 15,
		shadowColor: material_colors.shades.black,
		shadowOpacity: 1,
		shadowRadius: 5,
		elevation: 5
	},
    dropdown: {
        backgroundColor: material_colors.grey.darken4,
		shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: material_colors.shades.black,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 25,
        width: '100%',
        padding: 15,
        marginVertical: 10
    },
    icon: {
    	marginRight: 5,
    },
    placeholderStyle: {
		fontSize: 16,
		color: 'gray'
    },
    selectedTextStyle: {
		color: material_colors.grey.lighten2,
		fontFamily: 'Inter-Medium',
    	fontSize: 16,
    },
    iconStyle: {
		width: 20,
		height: 20,
		color: 'gray'
    },
    inputSearchStyle: {
		height: 40,
		fontSize: 16,
		color: material_colors.grey.lighten2,
		backgroundColor: material_colors.grey.darken4,
		borderWidth: 0,
		borderRadius: 10
    }
});


export default CategoryColorPicker;