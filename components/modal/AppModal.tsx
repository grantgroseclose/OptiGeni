import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AppIcon from '../AppIcon';
import colors, { material_colors } from '../../config/colors';
import { screenWidth } from '../../config/dimensions';
import { Modals } from '../../store/modal';

import useModal from '../../hooks/useModal';
import { MaterialColor } from '../../types/config/colors';





export type AppModalProps<TModal extends Modals> = {
	modal: TModal;
	children: React.ReactNode;
	passedStyles?: {
		centeredView?: object;
		modalView?: object;
		formContainer?: object;
		closeIcon?: object;
		textStyle?: object;
		modalText?: object;
		iconColor?: MaterialColor;
	}
};




const AppModalElement = <TModal extends Modals>({
	modal,
	passedStyles,
	children
}: AppModalProps<TModal>) => {
	const { isOpen, toggleModal } = useModal<TModal>(modal);

	return (
		<Modal
      animationType='slide'
			transparent
			visible={isOpen}
		>
			<View style={[styles.centeredView, passedStyles?.centeredView ? passedStyles.centeredView : {}]}>            
				<View style={[styles.modalView, passedStyles?.modalView ? passedStyles.modalView : {}]}>
					<View>
						<TouchableOpacity onPress={toggleModal} style={[styles.closeIcon, passedStyles?.closeIcon ? passedStyles.closeIcon : {}]}>
							<AppIcon name='window-close' iconColor={passedStyles?.iconColor ? passedStyles.iconColor : material_colors.grey.darken1} size={70} backgroundColor={'transparent'} align='flex-end' />
						</TouchableOpacity>
					</View>

					<View style={[styles.formContainer, passedStyles?.formContainer ? passedStyles.formContainer : {}]}>
						{ children }
					</View>
				</View>
			</View>
		</Modal>
	);
}


const AppModal = <TModal extends Modals>() => {
	const WrappedAppElement: React.FC<AppModalProps<TModal>> = (props) => <AppModalElement {...props} />;
	return WrappedAppElement;
};






const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalView: {
        width: '100%',
        height: '90%',
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
        height: '85%'
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




export default AppModal;

