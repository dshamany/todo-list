import React from "react";
import { StyleSheet, ImageBackground, View, StatusBar } from "react-native";
import Main from "./components/Main";

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            {/* <ImageBackground
                source={require("./images/background-main.jpg")}
                style={{ ...styles.backgroundImage }}
            > */}
            <Main />
            {/* </ImageBackground> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center",
        width: "100%",
    },
});
