import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Calculator from './Calculator'

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


function HomeScreen({ navigation }) {
  return (
    <View style={styles.centeredView}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Random Page"
        onPress={() => navigation.navigate('Random', {
          randomNumber: Math.floor(Math.random() * 100),
        })}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.centeredView}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />

    </View>
  );
}

function RandomScreen({ route, navigation }) {
  const { randomNumber } = route.params;
  return (
    <View style={styles.centeredView}>
      <Text>Random Screen</Text>
      <Text>Random number: {JSON.stringify(randomNumber)}</Text>
      <Button
        title="Go to Random Page... again"
        onPress={() =>
          navigation.push('Random', {
            randomNumber: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.centeredView}>
      <Text>Settings!</Text>
      <Button
        onPress={() => navigation.navigate('Modal')}
        title="Open Modal"
      />
    </View>
  );
}

function ModalScreen({ navigation }) {
  return (
    <View style={styles.centeredView}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Random" component={RandomScreen} />
    </Stack.Navigator>
  )
}

function SettingsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, }}>
        <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          title: 'Home'
        }} />
        <Tab.Screen name="SettingsStack" component={SettingsStackScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          title: 'Settings'
        }} />
        <Tab.Screen name="Calculator" component={Calculator} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator-outline" color={color} size={size} />
          ),
        }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  }
});
