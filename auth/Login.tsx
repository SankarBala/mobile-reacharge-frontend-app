import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
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



    const handleInputChange = (e: object): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function signIn() {
        axios.post(`${host}/api/login`, formData).then(res => {
            Storage.storeData('token', res.data.token);
            Storage.storeData('user', JSON.stringify(res.data.user));
            console.log(navigation, route);
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
            <form style={tw` shadow-md rounded-md px-2 pt-6 pb-8 mb-4 w-72 h-64`}>
                <View style={tw`mb-4`}>
                    <Text
                        style={tw`block text-green-700 text-md font-bold mb-2`}
                    >
                        Username
                    </Text>
                    <input
                        style={tw`shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="email"
                        onChange={handleInputChange}
                    />
                </View>
                <View style={tw`mb-6`}>
                    <Text
                        style={tw`block text-green-700 text-md font-bold mb-2`}
                    >
                        Password
                    </Text>
                    <input
                        style={tw`shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder="******************"
                        name="password"
                        onChange={handleInputChange}
                    />
                    <Text style={tw`text-red-700 text-xs italic`}>{error}</Text>
                </View>
                <View style={tw`flex justify-around`}>
                    <div style={tw`flex justify-between`}>
                        <button
                            style={tw`inline w-1/3 bg-blue-500 hover:bg-blue-700 border-0 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline`}
                            type="button"
                            onClick={signIn}
                        >
                            Sign In
                        </button>
                        <button
                            style={tw`inline w-1/3 bg-yellow-500 hover:bg-blue-700 border-0 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline`}
                            type="button"
                            onClick={() => navigation.navigate("Register")}
                        >
                            Register
                        </button>
                    </div>
                    <Text
                        style={tw`inline font-bold text-sm text-blue-500 hover:text-blue-800 `}
                    >
                        Forgot Password?
                    </Text>
                </View>
            </form>
            <Text style={tw`text-center text-gray-500 text-md`} onPress={() => { navigation.navigate("Home") }}>Go to home page</Text>
        </View>

    );
};

export default Login;
