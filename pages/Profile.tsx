import React, { useEffect, useState } from "react";
import { Text } from "react-native";
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
    <div style={tw`bg-blue-200 p-3 h-full`}>
      <div style={tw`text-gray-700`}>
        <table style={tw`table py-4`}>
          <tbody>
            <tr>
              <td>Name : </td> <td>{user.name}</td>
            </tr>
            <tr>
              <td>Email : </td> <td>{user.email}</td>
            </tr>
            <br />
            <tr>
              <td>Balance : </td> <td>{user.balance}</td> <td> <Text style={tw`p-1 my-3 rounded bg-blue-800 text-white`} onPress={() => { navigation.navigate("LoadWallet") }}>Wallet refill</Text></td>
            </tr>
            <br />
          </tbody>
        </table>
        <div style={tw`flex justify-between`}>
          <button style={tw`flex w-24 h-8 bg-blue-500 text-white rounded-md px-2 py-1`}
            onClick={logout}>
            Logout
          </button>
          <button style={tw`flex w-24 h-8 bg-green-600 text-white rounded-md px-2 py-1`}
            onClick={refresh}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
