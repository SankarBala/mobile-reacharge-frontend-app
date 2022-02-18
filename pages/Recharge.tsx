import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import { RadioButton } from 'react-native-paper';
import * as Storage from "./../controllers/Storage";
import api from "../api";

export default function Recharge({ navigation, route }) {

    const [formData, setFormData] = useState({
        mobileNumber: "",
        amount: "",
        accountType: "prepaid",
        rechargePin: ""
    });


    useEffect(() => {
        navigation.addListener('focus', () => {
            Storage.getData('token').then((token) => {
                if (token === undefined) {
                    navigation.navigate('Login', { from: 'Recharge' });
                }
            });
        });

    }, [navigation]);


    const [message, setMessage] = useState("");

    const handleInputChange = (event: object): void => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const rechargeNow = (): void => {

        api().then((axios) => {
            axios.post("/recharge", formData)
                .then((res) => {
                    setMessage(res.data.message);
                    setFormData({
                        mobileNumber: "",
                        amount: "",
                        accountType: "prepaid",
                        rechargePin: ""
                    });
                })
                .catch((err) => {
                    setMessage(err.response.data.message);
                    // if (err.response.data.message == "Unauthenticated.") {
                    //     Storage.removeData("token");
                    //     Storage.removeData("user");
                    //     navigation.navigate('Login');
                    // }
                    if (err.response.status === 401) {
                        Storage.removeData("token");
                        Storage.removeData("user");
                        navigation.navigate("Login", { from: "Recharge"});
                      }
                });
        });


    }

    return (

        <View style={tw`w-full h-full bg-blue-300 p-4 flex items-center align-center justify-center`}>
            <form style={tw` shadow-md rounded-md px-2 pt-6 pb-8 mb-4 w-72 h-64`}>
                <View style={tw`mb-1`}>
                    <Text
                        style={tw`block text-green-700 text-md font-bold mb-2`}
                    >
                        Mobile Number
                    </Text>
                    <input
                        style={tw`shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="mobile number"
                        type="text"
                        placeholder="Mobile number"
                        inputMode="numeric"
                        value={formData.mobileNumber}
                        name="mobileNumber"
                        onChange={(e) => handleInputChange(e)}
                    />
                </View>
                <View>
                    <div style={tw`flex justify-between mb-2`}>
                        <label style={tw`text-md mt-2`}> Prepaid: </label>
                        <RadioButton
                            color="blue"
                            value="prepaid"
                            status={formData.accountType == "prepaid" ? 'checked' : 'unchecked'}
                            onPress={() => setFormData({ ...formData, accountType: "prepaid" })}
                        />
                        <label style={tw`text-md mt-2`}>
                            Postpaid:
                        </label>
                        <RadioButton
                            color="green"
                            value="postpaid"
                            status={formData.accountType == "postpaid" ? 'checked' : 'unchecked'}
                            onPress={() => setFormData({ ...formData, accountType: "postpaid" })}
                        />
                    </div>
                </View>
                <View style={tw`mb-6`}>
                    <Text
                        style={tw`block text-green-700 text-md font-bold mb-2`}
                    >
                        Amount
                    </Text>
                    <input
                        style={tw`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="amount"
                        type="number"
                        placeholder="Minimum 10 tk"
                        min={10}
                        max={1000}
                        inputMode="numeric"
                        value={formData.amount}
                        name="amount"
                        onChange={(e) => handleInputChange(e)}
                    />
                </View>
                <View style={tw`mb-6`}>
                    <Text
                        style={tw`block text-green-700 text-md font-bold mb-2`}
                    >
                        Pin
                    </Text>
                    <input
                        style={tw`shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-0 leading-tight focus:outline-none focus:shadow-outline`}
                        id="pin"
                        type="password"
                        placeholder="Recharge pin"
                        min={1000}
                        max={9999}
                        inputMode="numeric"
                        value={formData.rechargePin}
                        name="rechargePin"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <Text style={tw`text-sm text-black`}>{message}</Text>
                </View>
                <View style={tw`flex justify-around`}>
                    <button
                        style={tw`inline w-1/3 bg-blue-500 hover:bg-blue-700 border-0 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline`}
                        type="button"
                        onClick={() => rechargeNow()}
                    >
                        Recharge
                    </button>

                </View>
            </form>
        </View>
    );
}
