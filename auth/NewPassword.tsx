import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { host } from "../config";
import * as Storage from "../controllers/Storage";
import Spinner from 'react-native-loading-spinner-overlay';

const NewPassword = ({ navigation, route }) => {

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    password_confirmation: ""
  });
  const [spin, setSpin] = useState(false);


  useEffect(() => {
    if (route.params !== undefined) {
      setFormData({ ...formData, email: route.params.email, otp: route.params.otp });
    }
  }, [])


  function recover() {
    if (
      formData.email === ""
      || formData.otp === ""
      || formData.password === ""
      || formData.password_confirmation === ""
    ) {
      setError("Please fill all the fields");
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }
    setSpin(true);
    axios.post(`${host}/api/password-update`, formData).then(res => {
      Storage.storeData('token', res.data.token);
      Storage.storeData('user', JSON.stringify(res.data.user));
      navigation.navigate("Home");
    }).catch(err => {
      setError(err.response.data.message);
    }).finally(() => {
      setSpin(false);
    });
  }


  return (
    <View style={tw`w-full h-full bg-blue-300 p-4 flex items-center justify-center`}>
      {spin ? <Spinner visible={true} /> : null}
      <View style={tw`rounded-md px-2 pt-6 pb-8 mb-4 w-72`}>
        <View style={tw`mb-4`}>
          <Text
            style={tw`text-black  font-bold mb-2`}
          >
            Email
          </Text>
          <Text style={tw`border rounded py-1 px-2 text-gray-700`}>
            {formData.email}
          </Text>
        </View>
        <View style={tw`mb-0`}>
          <Text
            style={tw`text-black  font-bold mb-2`}
          >
            New Password
          </Text>
          <TextInput
            style={tw`border rounded py-0 mb-2 px-2 text-gray-700`}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setFormData({ ...formData, password: value });
              setError("");
            }}
          />
        </View>
        <View style={tw`mb-0`}>
          <Text
            style={tw`text-black  font-bold mb-2`}
          >
            Confirm New Password
          </Text>
          <TextInput
            style={tw`border rounded py-0 px-2 text-gray-700`}
            placeholder="Confirm Password"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setFormData({ ...formData, password_confirmation: value });
              setError("");
            }}
          />
        </View>
        <Text style={tw`text-sm text-red-900 italic`}>{error}</Text>

        <View style={tw`flex justify-between mt-4`}>
          <Button
            title="Update Password"
            color="#841588"
            onPress={() => recover()}
          />
        </View>

      </View>
      <Text style={tw`text-center text-gray-500`} onPress={() => { navigation.navigate("Home") }}>Go to home page</Text>
    </View>

  );
};

export default NewPassword;
