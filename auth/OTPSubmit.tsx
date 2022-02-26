import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { host } from "../config";
import Spinner from 'react-native-loading-spinner-overlay';


const OTPSubmit = ({ navigation, route }) => {

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "sankarbala232@gmail.com", otp: "" });
  const [spin, setSpin] = useState(false);


  useEffect(() => {
    if (route.params !== undefined) {
      setFormData({ ...formData, email: route.params.email });
    }
  }, [])


  function recover() {
    if (formData.otp === "") {
      setError("Please enter otp code");
      return;
    }
    if (formData.otp.length !== 4) {
      setError("Please enter a valid otp code");
      return;
    }
    setSpin(true);
    axios.post(`${host}/api/password-otpvalidate`, formData).then(res => {
      navigation.navigate("New Password", { email: formData.email, otp: formData.otp });
    }).catch(err => {
      setError(err.response.data.message);
    }).finally(() => {
      setSpin(false);
    });
  }


  return (
    <View style={tw`w-full h-full bg-blue-300 p-4 flex items-center justify-center`}>
      {spin ? <Spinner visible={true} /> : null}
      <View style={tw`rounded-md px-2 pt-6 pb-8 mb-4 w-72 h-64`}>
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
            OTP
          </Text>
          <TextInput
            style={tw`border rounded py-0 px-2 text-gray-700`}
            placeholder="OTP"
            keyboardType="number-pad"
            onChangeText={(value: string) => {
              setFormData({ ...formData, otp: value })
            }}
          />
        </View>
        <Text style={tw`text-sm text-red-900`}>{error}</Text>

        <View style={tw`flex justify-between mt-4`}>
          <Button
            title="Varify OTP"
            color="#8415ff"
            onPress={() => recover()}
          />
        </View>

      </View>
      <Text style={tw`text-center text-gray-500`} onPress={() => { navigation.navigate("Home") }}>Go to home page</Text>
    </View>

  );
};

export default OTPSubmit;
