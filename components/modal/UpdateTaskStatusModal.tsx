import React from 'react';
import createAppModal from './AppModal';
import { appModals, UpdateTaskModal } from '../../store/modal';
import useModal from '../../hooks/useModal';
import UpdateTaskForm from '../form/UpdateTaskForm';
import { StyleSheet } from 'react-native';
import { screenWidth } from '../../config/dimensions';
import colors, { material_colors } from '../../config/colors';




const UpdateTaskStatusModal: React.FC = () => {
    const { isOpen } = useModal<UpdateTaskModal>(appModals['UpdateTask']);
    const UpdateTaskDropdownModal = createAppModal<UpdateTaskModal>();


    return (
        <>
			{ isOpen &&
				<UpdateTaskDropdownModal modal={appModals['UpdateTask']} passedStyles={styles}>
					<UpdateTaskForm />
				</UpdateTaskDropdownModal>
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
        backgroundColor: material_colors.blue_grey.darken4,
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





export default UpdateTaskStatusModal;

