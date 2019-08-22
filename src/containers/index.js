import React from 'react';
import PlaygroundScreen from './PlaygroundContainer'
import NoteListScreen from './NoteListContainer'
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createMaterialTopTabNavigator(
    {
       Playground: { screen: PlaygroundScreen },
        NoteList: { screen: NoteListScreen },
    },
    {
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            style: {
                display: 'none'
            }
        }
    }
);

export default createAppContainer(AppNavigator);