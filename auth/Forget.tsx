import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { host } from "../config";
import Spinner from 'react-native-loading-spinner-overlay';

const Login = ({ navigation }) => {

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: "" });
    const [spin, setSpin] = useState(false);


    function recover() {
        if (formData.email === "") {
            setError("Please fill the email address");
            return;
        }
        setSpin(true);
        axios.post(`${host}/api/password-reset`, formData).then(res => {
            alert(res.data.message);
            navigation.navigate("OTP Submit", { email: formData.email });
        }).catch(err => {
            console.log(err);
            setError(err.response.data.message);
        }).finally(() => {
            setSpin(false);
        });
    }


    return (
        <View style={tw`w-full h-full bg-blue-300 p-4 flex items-center justify-center`}>
            {spin ? <Spinner visible={true} /> : null}
            <View style={tw`rounded-md px-2 pt-6 pb-8 mb-4 w-72 h-64`}>
                <View style={tw`mb-0`}>
                    <Text
                        style={tw`text-black  font-bold mb-2`}
                    >
                        Email
                    </Text>
                    <TextInput
                        style={tw`border rounded py-0 px-2 text-gray-700`}
                        placeholder="Username"
                        keyboardType="default"
                        onChangeText={(value: string) => {
                            setFormData({ ...formData, email: value })
                        }}
                    />
                </View>
                <Text style={tw`text-sm text-red-900 italic`}>{error}</Text>
                <View style={tw`flex justify-between mt-3`}>
                    <Button
                        title="Send recover request"
                        color="#841584"
                        onPress={() => recover()}
                    />
                </View>

            </View>
            <Text style={tw`text-center text-gray-500`} onPress={() => { navigation.navigate("Home") }}>Go to home page</Text>
        </View>

    );
};

export default Login;
