import React from "react";
import {
  StyleSheet
} from "react-native";
import { useField, useFormikContext } from "formik";
import FormInputFieldProps from "../../types/form/FormInputFieldProps";

import colors, { material_colors } from "../../config/colors";
import { CalendarModal, appModals } from "../../store/modal";
import createAppModal from '../modal/AppModal';
import { Calendar, DateData } from "react-native-calendars";
import useModal from "../../hooks/useModal";



const AddDateTimeModal: React.FC<FormInputFieldProps> = ({
    ...otherProps
}) => {
    const { isOpen, toggleModal } = useModal<CalendarModal>(appModals['Calendar']);

    const { setFieldValue } = useFormikContext();
    const [ field ] = useField(otherProps);

    const CalendarDropdownModal = createAppModal<CalendarModal>();

    const handleSelect = async (day: DateData) => {
        const date = new Date(day.timestamp);
        await setFieldValue(field.name, date);
        console.log(field.value);
        toggleModal();
    }
        

    return (
        <>
            { isOpen && 
                <CalendarDropdownModal modal={appModals['Calendar']} >
                    <Calendar onDayPress={handleSelect} 
                        theme={{
                            monthTextColor: material_colors.grey.lighten3,
                            backgroundColor: 'transparent',
                            calendarBackground: 'transparent',
                            textSectionTitleColor: material_colors.grey.grey,
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: material_colors.cyan.accent3,
                            todayTextColor: material_colors.cyan.accent3,
                            arrowColor: material_colors.cyan.accent3,
                            dayTextColor: '#2d4150',
                            textDisabledColor: 'transparent',

                            textDayFontFamily: 'Inter-Regular',
                            textMonthFontFamily: 'Inter-Regular',
                            textDayHeaderFontFamily: 'Inter-Regular',
                            textDayFontSize: 18,
                            textMonthFontSize: 24,
                            textDayHeaderFontSize: 12,
                        }}
                    />
                </CalendarDropdownModal>
            }
        </>
    );
};



const styles = StyleSheet.create({
});


export default AddDateTimeModal;