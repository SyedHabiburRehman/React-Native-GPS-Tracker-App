import React, { Component } from 'react';
import { ListView, StyleSheet, Button, Text, TextInput, View, Image, Picker, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner } from './common';
import { Entypo } from 'react-native-vector-icons';
import { circleCreation, inputChanged } from '../actions';


const mapStateToProps = ({ circleReducer, auth }) => {
    const { circleName } = circleReducer;
    const { _id, name, email } = auth.user;
    console.log(circleName, _id, name, email);
    return {
        circleName,
        _id,
        name,
        email
    };
};


class CreateCircle extends Component {
    static navigationOptions = {

        title: 'Create Circle',
        // headerLeft: <Entypo onPress={() => navigation.navigate('DrawerOpen')} size={30} name="menu" color="blue" />

        // headerRight: <Logout navigation={navigation} />
        drawer: () => ({
            label: 'Create Circle',
        }),

    };

    constructor() {
        super()
        this.state = {
            error: ''
        }
    }

    circle() {
        const { circleName, _id, name, email, navigation } = this.props;
        console.log(circleName, _id, name, email, navigation)

        if (this.props.circleName === '' || this.props.circleName === undefined) {
            this.setState({ error: 'Something is missing' })
        }
        else {
            this.setState({ error: '' })
            this.props.circleCreation(circleName, _id, name, email, navigation)
        }
    }

    render() {
        const { circleName, _id, name, email } = this.props;
        return (
            <View style={styles.containerStyle}>
                <Text>EnterYour Circle Name: </Text>
                <TextInput
                    autoCorrect={false}
                    placeholder='Enter Circle Name'
                    style={styles.inputStyle}
                    value={this.props.circleName}
                    onChangeText={(value) => this.props.inputChanged({ prop: 'circleName', value })}

                />
                
                <Text>{this.state.error}</Text>
                
                <Button
                    onPress={this.circle.bind(this)}
                    title="CREATE"

                    style={styles.buttonStyle}
                    accessibilityLabel="Learn more about this purple button"
                />

            </View>
        );
    }
}
const styles = {
    containerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    inputStyle: {
        color: '#000',
        height: 40,
        width: 200,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 23,
        // flex: 1
    },
    buttonStyle: {
        height: 40,
        width: 60,
        color: "white",
        borderColor: 'blue',
        backgroundColor: 'blue',
        borderRadius: 10
    }
}
export default connect(mapStateToProps, { circleCreation, inputChanged })(CreateCircle);