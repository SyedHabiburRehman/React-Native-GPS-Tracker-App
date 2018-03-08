import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Button } from '../components/common';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import Logout from '../components/Logout';
import Map from '../components/Map';
import CreateCircle from '../components/CreateCircle';
import MyCircles from '../components/MyCircles';
import MemberList from '../components/MemberList';
import JoinCircle from '../components/JoinCircle';
// import SplashScreen from '../components/SplashScreen';
// import {logouxt} from '../actions' 

const AppDrawer = DrawerNavigator({
    Map: { screen: Map },
    CreateCircle: {
        screen: CreateCircle
    },
    myCircles: {
        screen: MyCircles
    },
    joinCircle: {
        screen: JoinCircle
    }
},
    {
        drawer: () => ({
            // label: 'Create Circle',
            header: false
        })
    }
);

const RouterComponent = StackNavigator({
    Home: { screen: LoginForm },
    Signup: { screen: SignupForm },
    memberList: {
        screen: MemberList
    },
    drawerScreen: {
        screen: AppDrawer
    }
},
    {
        headerMode: 'screen',
        initialRouteName: 'Home'
    });

export default RouterComponent;