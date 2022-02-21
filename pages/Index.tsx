import React, { useState, useEffect } from "react";
import {TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import * as Storage from "../controllers/Storage";

export default function Index({ navigation }) {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        navigation.addListener("focus", () => {
            Storage.getData("token").then((token) => {
                if (token !== undefined) {
                    setLogged(true);
                } else {
                    setLogged(false);
                }
            });
        });
    }, [navigation]);

    return (
        <ScrollView style={tw`h-full`}>
            <View style={tw`flex flex-row`}>
                <TouchableOpacity
                    style={tw`bg-blue-500 h-32 m-2 flex-1 justify-center rounded-lg`}
                    onPress={() => navigation.navigate("Recharge")}
                >
                    <Image style={tw`m-auto`} source={require("../assets/images/topup.png")} />
                    <Text style={tw`w-full text-center`}>New Recharge</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`bg-pink-500 h-32 m-2 flex-1 justify-center rounded-lg`}
                    onPress={() => navigation.navigate("History")}
                ><Image
                        style={tw`m-auto`}
                        source={require('../assets/images/history.png')}
                    />
                    <Text style={tw`w-full text-center`}>History</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`flex flex-row `}>
                <TouchableOpacity
                    style={tw`bg-yellow-500 h-32 m-2 flex-1 justify-center rounded-lg`}
                    onPress={() => navigation.navigate("Profile")}
                >
                   <Image
                        style={tw`m-auto`}
                        source={require('../assets/images/profile.png')}
                    />
                    <Text style={tw`w-full text-center`}>Profile</Text>
                </TouchableOpacity>
                {logged || (<TouchableOpacity
                    style={tw`bg-purple-500 h-32 m-2 flex-1 justify-center rounded-lg`}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={tw`w-full text-center`}>Login</Text>
                </TouchableOpacity>)
                }
            </View>
        </ScrollView>
    );
}
