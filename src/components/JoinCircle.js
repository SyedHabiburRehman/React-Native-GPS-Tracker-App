import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Button, Image, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner } from './common';
// import { Entypo, FontAwesome } from 'react-native-vector-icons';
import { inputChanged, joinCircle } from '../actions';

const mapStateToProps = ({ circleReducer, auth }) => {
    const { groupCode } = circleReducer;
    const { _id } = auth.user;
    console.log(groupCode);
    return {
        groupCode,
        _id,
        // name,
        // email
    };
};


class JoinCircle extends Component {
    static navigationOptions = ({ navigation }) => ({
        drawerLabel: 'Join Circles',
        title: 'Join Circles',
        headerLeft: false,

        // headerRight: <Text onPress={() => AsyncStorage.removeItem('GPSapp').then(() => navigation.navigate('Home'))}>logout</Text>


    });
    constructor() {
        super()
        this.state = {
            error: ''
        }
    }

    join() {
        console.log('GROUP CODE ', this.props.groupCode)
        if (this.props.groupCode === '' || this.props.groupCode === undefined) {
            this.setState({ error: 'Something is missing' })
        }
        else {
            this.setState({ error: '' })
            this.props.joinCircle(this.props.groupCode, this.props._id)
        }
    }
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>Enter the Group Code: </Text>
                <TextInput
                    autoCorrect={false}
                    placeholder='XXXXX'
                    style={styles.inputStyle}
                    value={this.props.groupCode}
                    onChangeText={(value) => this.props.inputChanged({ prop: 'groupCode', value })}

                />

                <Text>{this.state.error}</Text>

                <Button
                    onPress={this.join.bind(this)}
                    title="JOIN"

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

export default connect(mapStateToProps, { inputChanged, joinCircle })(JoinCircle);
