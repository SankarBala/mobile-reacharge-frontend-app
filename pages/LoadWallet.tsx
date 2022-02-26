import React, { useState, useEffect } from 'react'
import { Button, Text, TextInput, View, WebView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import api from '../api';
import * as Storage from "./../controllers/Storage";
import Spinner from 'react-native-loading-spinner-overlay';

const LoadWallet = ({ navigation, route }) => {

    const [amount, setAmount] = useState("100");
    const [spin, setSpin] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            Storage.getData('token').then((token) => {
                if (token === undefined) {
                    navigation.navigate('Login', { from: 'Recharge' });
                }
            });
        });

    }, [navigation]);


    const rechargeWallet = () => {
        if (Number(amount) > 5000 || Number(amount) < 100) {
            return alert('Amount should be between 10 and 1000');
        }
        setSpin(true);
        api().then((axios) => {
            axios.get(`pay/${amount}`).then((res) => {
                // payNow(res.data.paymentUrl);
                navigation.navigate('Payment', { url: res.data.paymentUrl });
            }).catch((err) => {
                console.log(err);
                // if (err.response.status === 401) {
                //     Storage.removeData("token");
                //     Storage.removeData("user");
                //     navigation.navigate("Login", { from: "LoadWallet" });
                // }
            }).finally(() => {
                setSpin(false);
            });
        });
    }

    return (
        <View>
            {spin ? <Spinner visible={true} /> : null}
            <Text style={tw`w-full text-center text-3xl text-blue-500 mt-5`}>Recharge your wallet</Text>
            <TextInput
                style={tw`border border-2 border-black p-2 m-5`}
                placeholder="Type amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={(value) => setAmount(value)}
            />
            <View style={tw` m-5 flex flex-row justify-between`}>
                <Button color="purple" onPress={() => setAmount("100")} title="100" />
                <Button color="purple" onPress={() => setAmount("200")} title="200" />
                <Button color="purple" onPress={() => setAmount("300")} title="300" />
                <Button color="purple" onPress={() => setAmount("400")} title="400" />
                <Button color="purple" onPress={() => setAmount("500")} title="500" />
                <Button color="purple" onPress={() => setAmount("1000")} title="1000" />
                <Button color="purple" onPress={() => setAmount("5000")} title="5000" />
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
