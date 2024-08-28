import React from "react";
import {
  StyleSheet
} from "react-native";

import colors from "../../config/colors";
import { CalendarModal, appModals } from "../../store/modal";
import AppTextInput from "../AppTextInput";
import useModal from "../../hooks/useModal";
import AddDateTimeModal from "../modal/AddDateTimeModal";




const DateTimePicker: React.FC = () => {
    const { toggleModal } = useModal<CalendarModal>(appModals['Calendar']);
        

    return (
        <>
            <AddDateTimeModal name='deadline' />

            <AppTextInput editable={false} icon='calendar-month' onPress={toggleModal} />
        </>
    );
};



const styles = StyleSheet.create({
});


export default DateTimePicker;