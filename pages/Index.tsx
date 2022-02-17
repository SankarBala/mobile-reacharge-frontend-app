import React, { useState, useEffect } from "react";
import { View } from "react-native";
import tw from 'tailwind-react-native-classnames';
import * as Storage from "../controllers/Storage";

export default function Index({ navigation }) {

    const [logged, setLogged] = useState(true);

    useEffect(() => {
        navigation.addListener('focus', () => {
            Storage.getData('token').then((token) => {
                if (token === undefined) {
                    setLogged(false);
                }
            });
        });

    }, [navigation]);

    return (
        <View>
            <div style={tw`flex overflow-hidden justify-around items-center my-4`}>

                <div style={
                    tw` 
                        w-5/12
                        h-32
                        bg-blue-500
                        overflow-hidden 
                        flex 
                        justify-center
                        items-center
                        rounded-lg
                    `}

                    onClick={() =>
                        navigation.navigate('Recharge')
                    }
                >
                    New Recharge
                </div>
                <div style={
                    tw` 
                        w-5/12
                        h-32
                        bg-purple-700
                        overflow-hidden 
                        flex 
                        justify-center
                        items-center
                        rounded-lg
                    `}
                    onClick={() =>
                        navigation.navigate('History')
                    }
                >
                    Recharge History
                </div>
            </div>

            <div style={tw`flex overflow-hidden justify-around items-center`}>

                <div style={
                    tw` 
                        w-5/12
                        h-32
                        bg-green-500
                        overflow-hidden 
                        flex 
                        justify-center
                        items-center
                        rounded-lg
                    `}
                    onClick={() =>
                        navigation.navigate('Profile')
                    }
                >
                    Profile
                </div>
                {logged || (
                    <div style={
                        tw` 
                        w-5/12
                        h-32
                        bg-green-500
                        overflow-hidden 
                        flex 
                        justify-center
                        items-center
                        rounded-lg
                    `}
                        onClick={() =>
                            navigation.navigate('Login')
                        }
                    >
                        Login
                    </div>

                )}
            </div>

        </View>
    );

}

