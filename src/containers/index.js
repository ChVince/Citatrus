import React from 'react';
import CameraScreen from './CameraContainer'
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
    {
        Camera: CameraScreen
    },
    {
        initialRouteName: "Camera"
    }
);

export default createAppContainer(AppNavigator);