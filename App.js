import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import Main from "./components/Main";

export default function App() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("./images/background-main.jpg")}
                style={{ ...styles.backgroundImage }}
            >
                <Main />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
    },
});
