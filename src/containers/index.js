import React from 'react';
import CameraScreen from 'CameraContainer'
import CitationScreen from 'CitationContainer'
import NoteListScreen from 'NoteListContainer'
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
    {
        Camera: CameraScreen,
        Citation: CitationScreen,
        NoteList: NoteListScreen
    },
    {
        initialRouteName: "Camera"
    }
);

export default createAppContainer(AppNavigator);