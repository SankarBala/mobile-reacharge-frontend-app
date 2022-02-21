import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import api from "../api";
import * as Storage from "../controllers/Storage";

export default function Profile({ navigation }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    balance: "",
    email_verified_at: "",
    created_at: "",
    updated_at: ""
  });


  useEffect(() => {
    navigation.addListener('focus', () => {
      Storage.getData('user').then((user) => {
        if (user === undefined) {
          navigation.navigate("Login", { from: "Profile" });
        } else {
          setUser(JSON.parse(user));
          refresh();
        }
      });
    });

  }, [navigation]);


  const logout = () => {
    Storage.removeData("user");
    Storage.removeData("token");
    setUser({
      id: "",
      name: "",
      email: "",
      balance: "",
      email_verified_at: "",
      created_at: "",
      updated_at: ""
    });
    navigation.navigate("Login");
  }


  const refresh = () => {
    api().then((axios) => {
      axios.get("/user")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            Storage.removeData("token");
            Storage.removeData("user");
            navigation.navigate("Login", { from: "Profile" });
          }
        });
    })
  }

  return (
    <View style={tw`bg-blue-200 p-3 h-full`}>
      <View style={tw`text-gray-700`}>
        <View style={tw`py-4`}>
          <Text style={tw`text-sm py-2`}>Name : {user.name}</Text>
          <Text style={tw`text-sm py-2`}>Email : {user.email}</Text>
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text>Balance : {user.balance} </Text>
            <Button
              color="purple"
              onPress={() => { navigation.navigate("Load Wallet") }}
              title="Refill wallet"
            />
          </View>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <Button
            onPress={logout}
            color="maroon"
            title="Logout"
          />
          <Button
            onPress={refresh}
            color="green"
            title="Refresh"
          />
        </View>
      </View>
    </View>
  );
}
