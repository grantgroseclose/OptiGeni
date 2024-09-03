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
import { screenWidth } from "../../config/dimensions";
import { useDateStore } from "../../store/date";



const AddDateTimeModal: React.FC<FormInputFieldProps> = ({
    ...otherProps
}) => {
    const { isOpen, toggleModal } = useModal<CalendarModal>(appModals['Calendar']);
    const { setDate } = useDateStore();

    const { setFieldValue } = useFormikContext();
    const [ field ] = useField(otherProps);

    const CalendarDropdownModal = createAppModal<CalendarModal>();

    const handleSelect = async (day: DateData) => {
        const date = new Date(day.timestamp);
        await setFieldValue(field.name, date);
        setDate(date);
        toggleModal();
    }
        

    return (
        <>
            { isOpen && 
                <CalendarDropdownModal modal={appModals['Calendar']} passedStyles={styles} >
                    <Calendar 
                        onDayPress={handleSelect} 
                        hideExtraDays
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    modalView: {
        width: '95%',
        height: 'auto',
        backgroundColor: colors.modal,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: screenWidth,
        elevation: 5,
    },
    formContainer: {
        padding: '2.5%',
        height: 'auto'
    },
    closeIcon: {
        alignSelf: 'flex-end'
    },
    textStyle: {
        color: colors.white,
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
});


export default AddDateTimeModal;