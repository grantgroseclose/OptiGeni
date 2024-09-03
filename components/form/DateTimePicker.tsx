import React from "react";
import { CalendarModal, appModals } from "../../store/modal";
import AppTextInput from "../AppTextInput";
import useModal from "../../hooks/useModal";
import AddDateTimeModal from "../modal/AddDateTimeModal";
import { useDateStore } from "../../store/date";
import extractDay from "../../utility/extractDay";
import extractMonth from "../../utility/extractMonth";




const DateTimePicker: React.FC = () => {
    const { toggleModal } = useModal<CalendarModal>(appModals['Calendar']);
    const date = useDateStore((state) => state.date);
    
    const extractedDate = date.getUTCDate().toString();
    const extractedDay = extractDay(date.getUTCDay());
    const extractedMonth = extractMonth(date.getUTCMonth());

    const deadline = `${extractedDay}, ${extractedMonth} ${extractedDate}`;

    return (
        <>
            <AddDateTimeModal name='deadline' />

            <AppTextInput editable={false} placeholder='deadline' placeholderTextColor={'gray'} value={deadline} icon='calendar-month' onPress={toggleModal} />
        </>
    );
};




export default DateTimePicker;