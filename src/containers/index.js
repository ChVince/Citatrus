import React from 'react';
import PlaygroundScreen from './PlaygroundContainer'
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
    {
        Playground: PlaygroundScreen
    },
    {
        initialRouteName: "Playground"
    }
);

export default createAppContainer(AppNavigator);