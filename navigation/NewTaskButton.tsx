import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";




type NewTaskButtonProps = {
  onPress: () => void;
};


const NewTaskButton: React.FC<NewTaskButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{alignSelf: 'center'}}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={colors.blue}
          size={80}
        />
      </View>
    </TouchableOpacity>
  );
}




const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: 'transparent',
    borderColor: colors.blue,
    // borderRadius: 40,
    // borderWidth: 10,
    bottom: 20,
    height: 80,
    justifyContent: "center",
    alignSelf: 'center',
    width: 80,
  },
});


export default NewTaskButton;

