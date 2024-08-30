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
import { appModals, CategoryModal } from "../../../store/modal";
import useModal from "../../../hooks/useModal";
import AppText from "../../AppText";




export type CategoryDropdownData = {
	label: string;
	value: string; 
	color: string;
};

type DropdownComponentProps = {
    data: CategoryDropdownData[];
} & FormInputFieldProps;




const CategoryDropdown: React.FC<DropdownComponentProps> = ({
	data,
	...otherProps
}) => {
	const { toggleModal } = useModal<CategoryModal>(appModals['Category']);
	const { setFieldValue } = useFormikContext();
	const [ field ] = useField(otherProps);

	const handleSelect = (item: CategoryDropdownData) => (item.value === 'add-new') ? toggleModal() : setFieldValue(field.name, item.label);


	return (
		<Dropdown
			style={styles.dropdown}
			placeholderStyle={styles.placeholderStyle}
			selectedTextStyle={styles.selectedTextStyle}
			inputSearchStyle={styles.inputSearchStyle}
			containerStyle={styles.container}
			iconStyle={styles.iconStyle}
			data={data ? data : []}
			search
			maxHeight={300}
			labelField="label"
			valueField="value"
			placeholder="Select category"
			searchPlaceholder="Search..."
			value={field.value}
			onChange={handleSelect}
			activeColor={material_colors.grey.darken4}
			renderItem={(item: CategoryDropdownData) => (
				<View style={{borderLeftWidth: 3, borderRadius: 10, borderColor: item.color, height: 48, justifyContent: 'center'}}>
					<AppText passedStyle={{paddingLeft: 8, fontFamily: 'Inter-Thin'}} text={item.label} />
				</View>
			)}
			renderLeftIcon={() => (
				<MaterialCommunityIcons style={styles.icon} color="gray" name="view-dashboard-edit-outline" size={20} />
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


export default CategoryDropdown;