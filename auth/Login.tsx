import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { host } from "../config";
import * as Storage from './../controllers/Storage';


const Login = ({ navigation, route }) => {

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: "", password: "", remember: false });

    useEffect(() => {
        navigation.addListener('focus', () => {
            Storage.getData('token').then((token) => {
                if (token !== undefined) {
                    navigation.navigate('Home');
                }
            });
        });

    }, [navigation]);


    function signIn() {
        axios.post(`${host}/api/login`, formData).then(res => {
            Storage.storeData('token', res.data.token);
            Storage.storeData('user', JSON.stringify(res.data.user));
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
        <View style={tw`w-full h-full bg-blue-300 p-4 flex items-center justify-center`}>
            <View style={tw`rounded-md px-2 pt-6 pb-8 mb-4 w-72 h-64`}>
                <View style={tw`mb-4`}>
                    <Text
                        style={tw`text-black  font-bold mb-2`}
                    >
                        Username
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
                <View style={tw`mb-0`}>
                    <Text
                        style={tw`text-black font-bold mb-2`}
                    >
                        Password
                    </Text>
                    <TextInput
                        style={tw`border rounded  py-0 px-2 text-gray-700 mb-1`}
                        placeholder="******************"
                        secureTextEntry={true}
                        keyboardType="default"
                        onChangeText={(value: string) => { setFormData({ ...formData, password: value }) }}
                    />
                    <Text style={tw`text-red-700 text-xs italic mb-3`}>{error}</Text>
                </View>
                <View style={tw`flex flex-row justify-between`}>
                    <Button
                        title="Sign In"
                        color="black"
                        onPress={signIn}
                    />

                    <Button
                        title="Sign Up"
                        color="green"
                        onPress={() => navigation.navigate("Register")}
                    />

                </View>
                <Text
                    style={tw`my-2 italic text-sm text-yellow-600 `}
                    onPress={() => navigation.navigate("Forget")}
                >
                    Forgot Password?
                </Text>

            </View>
            <Text style={tw`text-center text-gray-500`} onPress={() => { navigation.navigate("Home") }}>Go to home page</Text>
        </View>

    );
};

export default Login;
