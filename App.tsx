import 'react-native-gesture-handler';
import React from "react";
import { View, Text } from "react-native";
import Index from "./pages/Index";
import tw from 'tailwind-react-native-classnames';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes'

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={tw`bg-blue-200 h-full w-full m-auto`}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName={"Index"}>
          <Stack.Screen
            name="Home"
            component={Index}
            key="Home"
            options={{ title: 'Mobile Recharge' }}
          />
          {routes.map((route) => {
            return <Stack.Screen name={route.name} component={route.component} key={route.name}/>
          })}
        </Stack.Navigator>
        <Text style={tw`p-2 m-auto text-gray-600`}>
          Devloped by Sankar Bala
        </Text>
      </NavigationContainer>
    </View>
  );
}
