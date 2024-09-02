import React from 'react';
import createAppModal from './AppModal';
import { appModals, UpdateTaskModal } from '../../store/modal';
import useModal from '../../hooks/useModal';
import UpdateTaskForm from '../form/UpdateTaskForm';




const UpdateTaskStatusModal: React.FC = () => {
    const { isOpen } = useModal<UpdateTaskModal>(appModals['UpdateTask']);
    const UpdateTaskDropdownModal = createAppModal<UpdateTaskModal>();


    return (
        <>
			{ isOpen &&
				<UpdateTaskDropdownModal modal={appModals['UpdateTask']}>
					<UpdateTaskForm />
				</UpdateTaskDropdownModal>
			}
        </>
    );
};



// const styles = StyleSheet.create({
//     centeredView: {
//       flex: 1,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//     },
//     modalView: {
//         width: '100%',
//         height: '90%',
//         backgroundColor: colors.modal,
//         borderRadius: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 1,
//         shadowRadius: screenWidth,
//         elevation: 5,
//     },
//     formContainer: {
//         padding: '2.5%',
//         height: '85%'
//     },
//     closeIcon: {
//         alignSelf: 'flex-end'
//     },
//     textStyle: {
//       color: colors.white,
//       fontFamily: 'Inter-Bold',
//       textAlign: 'center',
//     },
//     modalText: {
//       marginBottom: 15,
//       textAlign: 'center',
//     }
// });





export default UpdateTaskStatusModal;

