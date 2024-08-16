import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import AppIcon from '../AppIcon';
import colors, { material_colors } from '../../config/colors';
import { screenWidth } from '../../config/dimensions';
import useModalStore from '../../store/modal';





type AppModalProps = {
    children: React.ReactNode;
};


const AppModal: React.FC<AppModalProps> = ({ children }) => {
    const { isOpen, toggleModal } = useModalStore();


    return (
        <Modal
          animationType='slide'
          transparent
          visible={isOpen}>
            <View style={styles.centeredView}>            
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                        <AppIcon name='window-close' iconColor={colors.black} size={80} backgroundColor={colors.blue} align='flex-end' />
                    </TouchableOpacity>

                    { children }
                </View>
            </View>
        </Modal>
    );
}




const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
        width: '95%',
        height: '80%',
        // backgroundColor: colors.light,
        backgroundColor: material_colors.grey.darken4,
        borderRadius: 20,
        padding: '5%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: screenWidth,
        elevation: 5,
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


