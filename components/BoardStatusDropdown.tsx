import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import colors, { material_colors } from "../config/colors";
import AppText from "./AppText";

import { statusColorMap } from "../types/data/Status";
import { StatusDropdownData } from "./form/dropdown/StatusDropdown";
import { useBoardStore } from "../store/statusBoard";




const BoardStatusDropdown: React.FC = () => {
    const status = useBoardStore((state) => state.status);
    const setStatus = useBoardStore((state) => state.setStatus);

    const dropdownData: StatusDropdownData[] = [
        {
            label: 'Not started',
            value: 'Not started',
            color: statusColorMap['Not started']
        },
        {
            label: 'In-progress',
            value: 'In-progress',
            color: statusColorMap['In-progress']
        },
        {
            label: 'Complete',
            value: 'Complete',
            color: statusColorMap['Complete']
        }
    ]

	const handleSelect = (item: StatusDropdownData) => {
        setStatus(item.value);
    }


	return (
		<Dropdown
			style={[styles.dropdown, {backgroundColor: statusColorMap[status]}]}
			selectedTextStyle={styles.selectedTextStyle}
            renderInputSearch={() => null}
			containerStyle={styles.container}
			iconStyle={styles.iconStyle}
			data={dropdownData}
			maxHeight={300}
			labelField="label"
			valueField="value"
			value={status}
			onChange={handleSelect}
			activeColor={material_colors.grey.darken4}
			renderItem={(item: StatusDropdownData) => (
				<View style={{borderLeftWidth: 3, borderRadius: 10, borderColor: item.color, height: 48, justifyContent: 'center'}}>
					<AppText passedStyle={{paddingLeft: 8, fontFamily: 'Inter-Thin'}} text={item.label} />
				</View>
			)}
		/>
	);
};





const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: material_colors.grey.darken4,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: '100%',
        padding: 12,
        color: material_colors.grey.darken4,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: material_colors.shades.black,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        position: 'absolute',
        top: '-12.5%'
    },
	container: {
		backgroundColor: colors.dark,
		borderWidth: 0,
		borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
		shadowColor: material_colors.shades.black,
		shadowOpacity: 1,
		shadowRadius: 5
	},
    icon: {
    	marginRight: 5,
    },
    selectedTextStyle: {
		color: material_colors.shades.black,
		fontFamily: 'Inter-Black',
    	fontSize: 32,
        textAlign: 'center',
        marginLeft: 16
    },
    iconStyle: {
		width: 32,
		height: 32
    }
});


export default BoardStatusDropdown;