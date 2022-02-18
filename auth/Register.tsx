import axios from "axios";
import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { host } from "../config";
import * as Storage from './../controllers/Storage';



const Register = ({ navigation, route }) => {

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", password: "", password_confirmation: "", remember: false });

    const handleInputChange = (e: object): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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
            <form style={tw` shadow-md rounded-md px-2 pt-6 pb-8 mb-4 w-72 h-64`}>
                <View style={tw`mb-4`}>
                    <Text
                        style={tw`block text-green-700 text-md font-bold mb-2`}
                    >
                        Name
                    </Text>
                    <input
                        style={tw`shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="name"
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleInputChange}
                    />
                </View>
                <View style={tw`mb-4`}>
                    <Text
                        style={tw`block text-green-700 text-md font-bold mb-2`}
                    >
                        Email
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
                </View>
                <View style={tw`mb-6`}>
                    <Text
                        style={tw`block text-green-700 text-md font-bold mb-2`}
                    >
                        Confirm Password
                    </Text>
                    <input
                        style={tw`shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password_confirmation"
                        type="password"
                        placeholder="******************"
                        name="password_confirmation"
                        onChange={handleInputChange}
                    />
                    <Text style={tw`text-red-700 text-xs italic`}>{error}</Text>
                </View>
                <View style={tw`flex justify-around`}>
                    <div style={tw`flex justify-between`}>
                        <button
                            style={tw`inline w-1/3 bg-yellow-500 hover:bg-blue-700 border-0 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline`}
                            type="button"
                            onClick={signUp}
                        >
                            Register
                        </button>
                        <button
                            style={tw`inline w-1/3 bg-blue-500 hover:bg-blue-700 border-0 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline`}
                            type="button"
                            onClick={() => navigation.navigate("Login")}
                        >
                            Login
                        </button>
                    </div>
                </View>
                <Text style={tw`text-center text-gray-500 text-md w-full my-3 flex justify-center`} onPress={() => { navigation.navigate("Home") }}>Go to home page</Text>
            </form>

        </View>

    );
};

export default Register;
