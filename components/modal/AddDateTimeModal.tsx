import React from "react";
import {
  StyleSheet
} from "react-native";
import { useField, useFormikContext } from "formik";
import FormInputFieldProps from "../../types/form/FormInputFieldProps";

import colors from "../../config/colors";
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
                <CalendarDropdownModal modal='Calendar'>
                    <Calendar onDayPress={handleSelect} />
                </CalendarDropdownModal>
            }
        </>
    );
};



const styles = StyleSheet.create({
});


export default AddDateTimeModal;