import { ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import React, { useRef } from 'react'
import tw from 'tailwind-react-native-classnames';


const LoadingIndicatorView = () => {
    return (
        <ActivityIndicator
            color="#009b88"
            size="large"
            style={tw`flex flex-1 flex-row`}
        />
    );
}

const Payment = ({ navigation, route }) => {

    const paymentStatus = useRef(null);
    function onMessage() {
        navigation.navigate("Profile");
    }

    return (
        <WebView
            source={{ uri: route.params.url }}
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
            ref={paymentStatus}
            onMessage={onMessage}
        />
    )
}


export default Payment;