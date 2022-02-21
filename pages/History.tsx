import React, { useEffect, useState } from "react";
import { Button, FlatList, ScrollView, Text, TextInput, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import * as Storage from "./../controllers/Storage";
import api from "../api";

export default function History({ navigation }) {

  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);
  const [previousPage, setPreviousPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [historyData, setHistoryData] = useState([]);


  useEffect(() => {
    navigation.addListener('focus', () => {
      Storage.getData('token').then((token) => {
        if (token === undefined) {
          navigation.navigate('Login', { from: 'Recharge' });
        }
      });
    });

  }, [navigation]);


  useEffect(() => {
    api().then((axios) => {
      axios.get(`/recharge?page=${currentPage}&search=${searchString}`)
        .then((res: any) => {
          setHistoryData(res.data.data);
          setNextPage(currentPage + 1);
          setPreviousPage(currentPage - 1);
          setTotalPage(res.data.last_page);
        })
        .catch((err: any) => {
          console.log(err);
          // if (err.response.status === 401) {
          //   Storage.removeData("token");
          //   Storage.removeData("user");
          //   navigation.navigate('Login', { from: 'History' })
          // }
        });
    });
  }, [currentPage, searchString]);


  return (
    <ScrollView>
      <View style={tw`flex flex-row justify-end items-center mb-2 pr-2`}>
        <Text style={tw`py-2 px-2 w-20 `}>Search: </Text>
        <TextInput
          style={tw`border border-2 w-36 h-6`}
          placeholder="Search"
          keyboardType="numeric"
          onChangeText={(value) => {
            setCurrentPage(1);
            setSearchString(value);
          }}
        />
      </View>
      <View style={tw`flex flex-row justify-between bg-gray-900 py-1 px-3`}>
        <Text style={tw`text-white text-left`}>Number</Text>
        <Text style={tw`text-white `}>Amount</Text>
        <Text style={tw`text-white `}>Date/Time</Text>
        <Text style={tw`text-white text-right`}>Status</Text>
      </View>
      <FlatList style={tw`h-96`}
        data={historyData}
        renderItem={({ item }) => {
          return (
            <ScrollView style={tw`p-3 text-center`} key={item.id}>
              <View style={tw`flex flex-row justify-around h-8`}>
                <Text style={tw`w-28 text-xs text-left`}>{item.number}</Text>
                <Text style={tw`w-8 text-xs`}>{item.amount}</Text>
                <Text style={tw`w-20 text-xs `}>{item.created_at}</Text>
                <Text style={tw`w-16 text-xs  text-right`}>{item.status}</Text>
              </View>
            </ScrollView>
          );
        }}
      />


      <View style={tw`p-3 mt-2`}>
        <View style={tw`flex flex-row justify-around`}>
          <Button
            color="black"
            onPress={() => setCurrentPage(previousPage)}
            disabled={previousPage === 0}
            title="Previous"
          />
          <Button
            color="black"
            onPress={() => setCurrentPage(nextPage)}
            disabled={nextPage > totalPage}
            title="Next"
          />
        </View>
      </View>

    </ScrollView>
  );
}
