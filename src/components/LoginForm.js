import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChange, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import * as firebase from 'firebase';


const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, isLoggedin } = auth;
    console.log(email, password, loading, isLoggedin);
    return {
        email,
        password,
        error,
        loading,
        isLoggedin
    };
};

class LoginForm extends Component {

    static navigationOptions = {
        title: 'Login',
    };


    // if user already logged in then switch him to Map compo rather than login compo
    componentWillMount() {
        console.disableYellowBox = true;
        console.log('hello')
        // firebase.auth().onAuthStateChanged((user) => {
        //  console.log('user',user)
        //     if (user) {
        //         this.props.navigation.navigate('Map');
        //     }
        // });


        //    AsyncStorage.removeItem('GPSapp'); 
        // uncomment below code if you want to use with asyncStorage
        const { navigation } = this.props;
        // AsyncStorage.getItem('GPSapp', (err, result) => {
        //     if (result !== null) {
        //         let data = JSON.parse(result);
        //         var email = data.email;
        //         var password = data.password;
        //         // this.props.loginUser({ email, password, navigation });
        //         firebase.auth().signInWithEmailAndPassword(email, password)
        //             .then((user) => {
        //                 this.props.navigation.navigate('Map')
        //             })
        //     }
        // });
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    };
    onPasswordChange(password) {
        this.props.passwordChange(password);
    };
    onButtonPress() {
        console.log(this.props)
        const { email, password, navigation } = this.props;

        this.props.loginUser({ email, password, navigation });

    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    };
    // navigate() {
    //     if (this.props.isLoggedin) {
    //         this.props.navigation.navigate('Patient');
    //     }
    //     else null
    // }

    render() {
        return (
            <View style={{ marginTop: 100 }}>
                <Card>
                    {/* {this.navigate()} */}
                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@gmail.com"
                            keyboardType='email-address'
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="Password"
                            keyboardType='default'
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>
                    <CardSection>
                        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                    </CardSection>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>

                    <CardSection>
                        <Button onPress={() => this.props.navigation.navigate('Signup')}>
                            Signup
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default connect(mapStateToProps, { emailChanged, passwordChange, loginUser })(LoginForm);