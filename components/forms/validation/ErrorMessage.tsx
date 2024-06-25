import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../../AppText";




type ErorrMessageProps = {
    error: string;
};

const ErrorMessage: React.FC<ErorrMessageProps> = ({error}) => {
    if (!error) return null;

    return <AppText passedStyle={styles.error} text={error} />;
}




const styles = StyleSheet.create({
    error: { 
        color: "red" 
    },
});


export default ErrorMessage;
