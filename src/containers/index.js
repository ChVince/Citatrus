import React from 'react';
import CameraScreen from './CameraContainer'
import CitationScreen from './CitationContainer'
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
    {
        Camera: CameraScreen,
        Citation: CitationScreen,
    },
    {
        initialRouteName: "Camera"
    }
);

export default createAppContainer(AppNavigator);