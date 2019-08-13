import React, { Component } from 'react'
import store from './store'
import { Provider } from 'react-redux';
import AppContainer from './containers/index'

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
               <AppContainer />
            </Provider>
        )
    }
}