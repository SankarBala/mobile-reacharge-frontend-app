import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { host } from "../config";
import * as Storage from './../controllers/Storage';



const Register = ({ navigation, route }) => {

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", password: "", password_confirmation: "", remember: false });


    function signUp() {
        axios.post(`${host}/api/register`, formData).then(res => {
            Storage.storeData('token', res.data.token);
            Storage.storeData('user', JSON.stringify(res.data.user));
            setError("");
            if (route.params !== undefined) {
                navigation.navigate(route.params.from)
            } else {
                navigation.navigate("Home");
            }
        }).catch(err => {
            setError(err.response.data.message);
        });
    }


    return (
        <View style={tw`w-full h-full bg-blue-300 p-4 flex items-center align-center justify-center`}>
            <View style={tw`rounded-md px-2 pt-6 pb-8 mb-4 w-72 `}>
                <View style={tw`mb-2`}>
                    <Text
                        style={tw`text-black font-bold`}
                    >
                        Name
                    </Text>
                    <TextInput
                        style={tw`border rounded  py-0 px-2 text-black mb-1`}
                        placeholder="Name"
                        onChangeText={(value: string) => { setFormData({ ...formData, name: value }) }}
                    />
                </View>
                <View style={tw`mb-2`}>
                    <Text
                        style={tw`text-black font-bold`}
                    >
                        Email
                    </Text>
                    <TextInput
                        style={tw`border rounded  py-0 px-2 text-black mb-1`}
                        placeholder="Username"
                        onChangeText={(value: string) => { setFormData({ ...formData, email: value }) }}
                    />
                </View>
                <View style={tw`mb-2`}>
                    <Text
                        style={tw`text-black font-bold`}
                    >
                        Password
                    </Text>
                    <TextInput
                        style={tw`border rounded  py-0 px-2 text-black mb-1`}
                        placeholder="******************"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(value: string) => { setFormData({ ...formData, password: value }) }}
                    />
                </View>
                <View style={tw`mb-0`}>
                    <Text
                        style={tw`text-black font-bold`}
                    >
                        Confirm Password
                    </Text>
                    <TextInput
                        style={tw`border rounded  py-0 px-2 text-black mb-1`}
                        placeholder="******************"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(value: string) => { setFormData({ ...formData, password_confirmation: value }) }}
                    />
                    <Text style={tw`text-red-700 text-xs italic mb-3`}>{error}</Text>
                </View>
                <View style={tw`flex flex-row justify-between`}>
                        <Button
                            title="Register"
                            color="black"
                            onPress={signUp}
                        />
                        <Button
                            title="Login"
                            color="green"
                            onPress={() => navigation.navigate("Login")}
                        />
                </View>
                <Text style={tw`text-center text-gray-900 text-md w-full mt-5 flex justify-center`} onPress={() => { navigation.navigate("Home") }}>Go to home page</Text>
            </View>

        </View>

    );
};

export default Register;
