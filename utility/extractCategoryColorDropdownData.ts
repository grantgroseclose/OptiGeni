import { material_colors } from "../config/colors";




export type CategoryColorDropdownData = {
	label: string;
	value: string; 
	color: string;
};


const extractCategoryColorDropdownData = () => {
    const dropdownData: CategoryColorDropdownData[] = [] as CategoryColorDropdownData[];

    Object.entries(material_colors).forEach(([colorKey, colorVariants]) => {
        Object.entries(colorVariants).forEach(([variantKey, hexCode]) => {
            if (variantKey.includes('accent')) {
                const label = `${colorKey.replace('_', ' ')} ${variantKey}`;
                dropdownData.push({
                    label: label,
                    value: hexCode,
                    color: hexCode,
                });
            }
        });
    });

    return dropdownData;
}


export default extractCategoryColorDropdownData;