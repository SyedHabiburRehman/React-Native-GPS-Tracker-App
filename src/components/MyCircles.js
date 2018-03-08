import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner, Button } from './common';
import Icons from 'react-native-vector-icons/FontAwesome';
import { myCircle, getMembers } from '../actions';

const mapStateToProps = ({ auth, circleReducer }) => {
    const { _id } = auth.user;
    const { myCircles } = circleReducer;
    console.log('MY CIRCLES', myCircles)
    return {
        _id,
        myCircles,
    }
}

class MyCircles extends Component {
    static navigationOptions = ({ navigation }) => ({
        drawerLabel: 'My Circles',
        title: 'My Circles',
        // headerLeft: false
        // headerRight: <Text onPress={() => AsyncStorage.removeItem('GPSapp').then(() => navigation.navigate('Home'))}>logout</Text>


    });
    componentWillMount() {
        this.props.myCircle(this.props._id)
    }
    render() {
        return (
            <ScrollView>
                {this.props.myCircles[0] === undefined
                    ?
                    <View>
                        <Text>No Circles</Text>
                    </View>
                    :
                    <View>
                        {

                            this.props.myCircles.map((circle, index) => {
                                return (
                                    <CardSection key={index}>
                                        <View style={styles.container} >
                                            <View style={styles.textContainer}>
                                                <Text style={styles.textStyle}>{circle.circleName}</Text>
                                                <Text>Created By:  {circle.name}</Text>
                                            </View>
                                            <View style={styles.buttonContainer}>
                                                <Icons.Button
                                                    onPress={() => this.props.getMembers(circle.member, this.props.navigation, 'map')}
                                                    name="map-marker"
                                                    size={40}
                                                    backgroundColor='transparent'
                                                    color="blue"
                                                />
                                                <Icons.Button
                                                    onPress={() => this.props.navigation.navigate('memberList', circle)}
                                                    name="users"
                                                    size={40}
                                                    backgroundColor='transparent'

                                                    color="blue"
                                                />
                                            </View>
                                        </View>
                                    </CardSection>
                                )
                            })
                        }
                    </View>
                }
            </ScrollView>
        );
    }
}


const styles = {
    container: {
        flexDirection: 'row',
        flex: 1
    },
    textContainer: {
        flexDirection: 'column',
        flex: 2,
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        marginRight: 5,
    },
    textStyle: {
        fontSize: 25,
        paddingLeft: 10,
        color: 'black'

    },
}

export default connect(mapStateToProps, { myCircle, getMembers })(MyCircles);