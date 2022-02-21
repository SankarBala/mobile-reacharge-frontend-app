import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { RadioButton } from "react-native-paper";
import * as Storage from "./../controllers/Storage";
import api from "../api";

export default function Recharge({ navigation, route }) {
    const [formData, setFormData] = useState({
        mobileNumber: "",
        amount: "",
        accountType: "prepaid",
        rechargePin: "",
    });


    useEffect(() => {
        navigation.addListener("focus", () => {
            Storage.getData("token").then((token) => {
                if (token === undefined) {
                    navigation.navigate("Login", { from: "Recharge" });
                }
            });
        });
    }, [navigation]);

    const [message, setMessage] = useState("");



    const rechargeNow = (): void => {
        api().then((axios) => {
            axios
                .post("/recharge", formData)
                .then((res) => {
                    setMessage(res.data.message);
                    setFormData({
                        mobileNumber: "",
                        amount: "",
                        accountType: "prepaid",
                        rechargePin: "",
                    });
                })
                .catch((err) => {
                    setMessage(err.response.data.message);
                    // if (err.response.status === 401) {
                    //     Storage.removeData("token");
                    //     Storage.removeData("user");
                    //     navigation.navigate("Login", { from: "Recharge" });
                    // }
                });
        });
    };

    return (
        <View
            style={tw`w-full h-full bg-blue-300 p-4 flex items-center justify-center`}
        >
            <View style={tw`rounded-md px-2 pt-6 pb-8 mb-4 w-72`}>
                <View style={tw`mb-1`}>
                    <Text style={tw`text-black text-sm font-bold mb-1`}>
                        Mobile Number
                    </Text>
                    <TextInput
                        style={tw`border rounded px-2 text-gray-700 bg-blue-100`}
                        placeholder="Mobile number"
                        keyboardType="numeric"
                        autoCorrect={false}
                        value={formData.mobileNumber}
                        onChangeText={(value) => {
                            setFormData({ ...formData, mobileNumber: value });
                            setMessage("");
                        }}
                    />
                </View>

                <View style={tw`flex justify-between mb-1`}>
                    <View style={tw`flex flex-row`}>
                        <View style={tw`flex flex-row flex-1`}>
                            <Text style={tw`text-sm mt-2`}> Prepaid: </Text>
                            <RadioButton
                                color="purple"
                                value="prepaid"
                                status={
                                    formData.accountType == "prepaid" ? "checked" : "unchecked"
                                }
                                onPress={() => {
                                    setFormData({ ...formData, accountType: "prepaid" })
                                    setMessage("");
                                }
                                }
                            />
                        </View>
                        <View style={tw`flex flex-row justify-end flex-1`}>
                            <Text style={tw`text-sm mt-2`}> Postpaid: </Text>
                            <RadioButton
                                color="maroon"
                                value="prepaid"
                                status={
                                    formData.accountType == "postpaid" ? "checked" : "unchecked"
                                }
                                onPress={() => {
                                    setFormData({ ...formData, accountType: "postpaid" })
                                    setMessage("");
                                }
                                }
                            />
                        </View>
                    </View>
                </View>

                <View style={tw`mb-2`}>
                    <Text style={tw`text-black text-sm font-bold mb-1`}>Amount</Text>
                    <TextInput
                        style={tw`border rounded px-2 text-gray-700 bg-blue-100`}
                        placeholder="Minimum 10 tk"
                        keyboardType="numeric"
                        value={formData.amount}
                        onChangeText={(value) => {
                            setFormData({ ...formData, amount: value });
                            setMessage("");
                        }
                        }
                        autoCorrect={false}
                    />
                </View>
                <View style={tw`mb-6`}>
                    <Text style={tw`text-black text-sm font-bold mb-1`}>Pin</Text>
                    <TextInput
                        style={tw`border rounded  px-2 text-gray-700 mb-0 bg-blue-100`}
                        placeholder="Recharge pin"
                        keyboardType="numeric"
                        secureTextEntry={true}
                        value={formData.rechargePin}
                        autoCorrect={false}
                        onChangeText={(value) => {
                            setFormData({ ...formData, rechargePin: value })
                            setMessage("");
                        }
                        }
                    />
                    <Text style={tw`text-sm text-black`}>{message}</Text>
                </View>

                <View
                    style={tw`flex justify-around border border-2 border-purple-900 p-1 h-12`}
                >
                    <View style={tw`w-64 h-16 flex flex-row justify-center`}>
                        <View style={tw`w-full flex justify-center items-center`}>
                            <TouchableOpacity
                                style={tw`w-full bg-purple-900 h-8`}
                                onLongPress={() => rechargeNow()}
                                delayLongPress={2000}
                            >
                                <Text style={tw`text-white m-auto`}>Recharge</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
