import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "./UserScreen";
import CarScreen from "./CarScreen";
import RentScreen from "./RentScreen";
import {MaterialIcons}from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false, 
          tabBarInactiveTintColor: 'red', 
          tabBarActiveTintColor: 'orange', 
          tabBarActiveBackgroundColor: 'black',
        }}
      >
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons
                name="person"
                size={size}
                color={focused ? color : 'red'} // Cambia el color si está activo o inactivo
              />
            ),
          }}
        />
        <Tab.Screen
          name="Car"
          component={CarScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons
                name="directions-car"
                size={size}
                color={focused ? color : 'red'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Rent"
          component={RentScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons
                name="payments"
                size={size}
                color={focused ? color : 'red'}
              />
            ),
          }}
        />

      </Tab.Navigator>
    );
  }