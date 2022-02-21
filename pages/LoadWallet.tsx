import React, { useState, useEffect } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import api from '../api';
import * as Storage from "./../controllers/Storage";
import * as WebBrowser from 'expo-web-browser';

const LoadWallet = ({ navigation, route }) => {

    const [amount, setAmount] = useState("10");
  

    useEffect(() => {
        navigation.addListener('focus', () => {
            Storage.getData('token').then((token) => {
                if (token === undefined) {
                    navigation.navigate('Login', { from: 'Recharge' });
                }
            });
        });

    }, [navigation]);



    const payNow = async (url: string) => {
        let result = await WebBrowser.openBrowserAsync(url);
        if (result.type == "opened") {
            navigation.navigate("Profile");
        }
    };

    const rechargeWallet = () => {
        if (Number(amount) > 1000 || Number(amount) < 10) {
            return alert('Amount should be between 10 and 1000');
        }
        api().then((axios) => {
            axios.get(`pay/${amount}`).then((res) => {
                payNow(res.data.paymentUrl);
            }).catch((err) => {
                console.log(err);
                // if (err.response.status === 401) {
                //     Storage.removeData("token");
                //     Storage.removeData("user");
                //     navigation.navigate("Login", { from: "LoadWallet" });
                // }
            });
        });
    }

    return (
        <View>
            <Text style={tw`w-full text-center text-3xl text-blue-500 mt-5`}>Recharge your wallet</Text>
            <TextInput
                style={tw`border border-2 border-black p-2 m-5`}
                placeholder="Type amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={(value) => setAmount(value)}
            />
            <View style={tw` m-5 flex flex-row justify-between`}>
                <Button color="purple" onPress={() => setAmount("10")} title="10" />
                <Button color="purple" onPress={() => setAmount("20")} title="20" />
                <Button color="purple" onPress={() => setAmount("30")} title="30" />
                <Button color="purple" onPress={() => setAmount("50")} title="50" />
                <Button color="purple" onPress={() => setAmount("100")} title="100" />
                <Button color="purple" onPress={() => setAmount("500")} title="500" />
                <Button color="purple" onPress={() => setAmount("1000")} title="1000" />
            </View>
            <View style={tw`w-full mt-4 flex flex-row justify-center`}>
                <Button
                    onPress={rechargeWallet}
                    title="Recharge Wallet"
                />
            </View>
        </View>
    )
}

export default LoadWallet
