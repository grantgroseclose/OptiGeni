import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
                    <View>
                      <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                          <AppIcon name='window-close' iconColor={material_colors.grey.darken1} size={70} backgroundColor={'transparent'} align='flex-end' />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>
                      { children }
                    </View>
                </View>
            </View>
        </Modal>
    );
}




const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalView: {
        width: '100%',
        height: '90%',
        backgroundColor: material_colors.grey.darken4,
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


