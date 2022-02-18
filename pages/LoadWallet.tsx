import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import api from '../api';
import * as Storage from "./../controllers/Storage";
import * as WebBrowser from 'expo-web-browser';

const LoadWallet = ({ navigation, route }) => {

    const [amount, setAmount] = useState(10);
    const [result, setResult] = useState("");


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
        if (amount > 1000 || amount < 10) {
            return alert('Amount should be between 10 and 1000');
        }
        api().then((axios) => {
            axios.get(`pay/${amount}`).then((res) => {
                payNow(res.data.paymentUrl);
            }).catch((err) => {
                if (err.response.status === 401) {
                    Storage.removeData("token");
                    Storage.removeData("user");
                    navigation.navigate("Login", { from: "LoadWallet" });
                }
            });
        });
    }

    return (
        <View>
            <Text style={tw`w-full text-center text-3xl text-green-600 mt-5`}>Recharge your wallet</Text>
            <input
                style={tw`border border-1 border-black p-2 m-5 outline-none focus:outline-none focus:shadow-outline`}
                inputMode="numeric"
                type="number"
                min="10"
                max="1000"
                placeholder="Type amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                name="amount" />
            <div style={tw` m-5 flex justify-between`}>
                <button onClick={() => setAmount(10)} style={tw`bg-purple-800 text-white py-1 px-1 outline-none border-0 rounded w-12`} type="button">10</button>
                <button onClick={() => setAmount(20)} style={tw`bg-purple-800 text-white py-1 px-1 outline-none border-0 rounded w-12`} type="button">20</button>
                <button onClick={() => setAmount(30)} style={tw`bg-purple-800 text-white py-1 px-1 outline-none border-0 rounded w-12`} type="button">30</button>
                <button onClick={() => setAmount(50)} style={tw`bg-purple-800 text-white py-1 px-1 outline-none border-0 rounded w-12`} type="button">50</button>
                <button onClick={() => setAmount(100)} style={tw`bg-purple-800 text-white py-1 px-1 outline-none border-0 rounded w-12`} type="button">100</button>
                <button onClick={() => setAmount(500)} style={tw`bg-purple-800 text-white py-1 px-1 outline-none border-0 rounded w-12`} type="button">500</button>
                <button onClick={() => setAmount(1000)} style={tw`bg-purple-800 text-white py-1 px-1 outline-none border-0 rounded w-12`} type="button">1000</button>
            </div>
            <div style={tw`w-full mt-4 flex justify-center`}>
                <button
                    onClick={rechargeWallet}
                    style={tw`bg-green-800 text-white py-2 px-3 outline-none border-0 rounded`}
                    type="button"
                >
                    Recharge Wallet
                </button>
            </div>
        </View>
    )
}

export default LoadWallet
