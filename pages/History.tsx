import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
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
          if (err.response.status === 401) {
            navigation.navigate('Login', { from: 'History' })
          }
        });
    });
  }, [currentPage, searchString]);



  const handleEvent = (page: any) => {
    setCurrentPage(page);
    console.log(page);
  }


  const searchText = (e: object) => {
    setCurrentPage(1);
    setSearchString(e.target.value);
  }


  return (
    <View>
      <Text style={tw`py-2 px-2 text-lg text-right`}>
        Search: <TextInput
          style={tw`border border-1 outline-none p-1 rounded`}
          placeholder="Search"
          defaultValue=""
          onChange={(e) => searchText(e)}
        />
      </Text>
      <View style={tw`p-3 bg-black text-center`}>
        <div style={tw`flex `}>
          <Text style={tw`flex-1 w-24 text-white text-left`}>Number</Text>
          <Text style={tw`flex-1 w-24 text-white `}>Amount</Text>
          <Text style={tw`flex-1 w-24 text-white `}>Date/Time</Text>
          <Text style={tw`flex-1 w-24 text-white text-right`}>Status</Text>
        </div>
      </View>
      <ScrollView style={styles.scrollview}>
        <FlatList
          data={historyData}
          renderItem={({ item }) => {
            return (
              <View style={tw`p-3 text-center`} key={item.id}>
                <div style={tw`flex`}>
                  <Text style={tw`flex-1 w-24 text-left`}>{item.number}</Text>
                  <Text style={tw`flex-1 w-24`}>{item.amount}</Text>
                  <Text style={tw`flex-1 w-24 `}>{item.created_at}</Text>
                  <Text style={tw`flex-1 w-24  text-right`}>{item.status}</Text>
                </div>
              </View>
            );
          }}
        />
      </ScrollView>



      <View style={tw`p-3 mt-2`}>
        <div style={tw`flex justify-between`}>
          <button style={tw`flex w-24 bg-blue-600 text-white justify-center p-1 rounded ${currentPage === 1 ? 'opacity-50' : ''}`}
            name="previous"
            onClick={() => handleEvent(previousPage)}
            disabled={previousPage === 0}
          >Previous</button>
          <button style={tw`flex w-24 text-white justify-center p-1 rounded bg-blue-600 ${currentPage === totalPage ? "opacity-50" : ""}`}
            name="next"
            onClick={() => handleEvent(nextPage)}
            disabled={nextPage > totalPage}
          >Next</button>
        </div>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    height: "450px",
    margin: "10px 0",
  }
})