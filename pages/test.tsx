import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

function WebToNative(props) {
    const webviewRef = React.useRef(null);
    function onMessage(data) {
        alert(data.nativeEvent.data);
        console.log(data.nativeEvent.data);
        props.navigation.navigate("Home");
    }

    function LoadingIndicatorView() {
        return (
            <ActivityIndicator
                color="#009b88"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }
    return (<WebView
        source={{ uri: "https://www.google.com" }}
        renderLoading={LoadingIndicatorView}
        startInLoadingState={true}
        ref={webviewRef}
        onMessage={onMessage}
    />
    );
}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: "center",
    },
    flexContainer: {
        flex: 1,
    },
});
export default WebToNative;
