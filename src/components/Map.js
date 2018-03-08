import React, { Component } from 'react';
import { ListView, StyleSheet, Text, View, Image, Picker, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import MapView from 'react-native-maps';
import Icons from 'react-native-vector-icons/Entypo';
// import { SearchBar } from 'react-native-elements'
import { PROVIDER_GOOGLE } from 'react-native-maps';
// import { getNearByPlaces, getPlaceSearch } from '../actions';
let { width, height } = Dimensions.get('window');
import * as firebase from 'firebase';

const ASPECT_RATIO = width / height;
const LATITUDE = 24.8828;
const LONGITUDE = 67.068;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;;


const mapStateToProps = ({ circleReducer, auth }) => {
    const { _id, userLocation } = auth.user;
    const { membersDetail } = circleReducer;
    console.log("+++++++++++++++++ ", membersDetail);
    console.log("ID", _id);
    return {
        _id,
        userLocation,
        membersDetail,
    }
}

class Map extends Component {
    static navigationOptions = ({ navigation }) => ({
        drawerLabel: 'Map',
        title: 'GPS Tracker',
        headerLeft: <Icons onPress={() => navigation.navigate('DrawerOpen')} size={30} name="menu" />,

        headerRight: <Text onPress={() => AsyncStorage.removeItem('GPSapp').then(() => navigation.navigate('Home'))}>logout</Text>
        // ,header : false

    });
    constructor(props) {
        super();
        this.state = {
            mapLoaded: false,
            searchType: "Circle",
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922,
                // latitudeDelta: LATITUDE_DELTA,
                // longitudeDelta: LONGITUDE_DELTA,
            },
            style: {
                bottom: 0,
                right: 0,
                left: 12,
                top: 1,
                flex: 1
                // position: "absolute"
            },
            searchBarFocus: false
        };
    };

    watchID = null;

    typeChanged(itemValue, itemIndex) {
        this.setState({ searchType: itemValue });

        console.log(this.state.searchType)
    };

    componentWillMount() {
        setTimeout(() =>
            this.setState({ style: styles.map, mapLoaded: true })
            , 500)
        setTimeout(() =>
            console.log(this.state, "stateeeeeeeeeeeeeeeeeeeeeee")
            , 1000)

        console.log('WILL MOUNT')
        let region;
        let { _id } = this.props;
        navigator.geolocation.getCurrentPosition(position => {
            if (position) {
                console.log('WILL MOUNT ', position.coords)
                region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                };
                let abcArray = [];
                let obj = {
                    latitude: region.latitude,
                    longitude: region.longitude
                }
                abcArray.push(obj)

                firebase.database().ref(`/GPStracker/${_id}/userLocation`)
                    .set(abcArray)
            }

        },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        );


        this.watchID = navigator.geolocation.watchPosition(position => {
            console.log("+++++++++", position.coords);
            // this.setState({
            region = {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            // });
            abcArray[0].latitude = region.latitude;
            abcArray[0].longitude = region.longitude;

            firebase.database().ref(`/GPStracker/${_id}/userLocation`)
                .set(abcArray)

            this.onRegionChangeComplete(region)
        });
    };

    componentDidMount() {

    };

    componentWillUnmount() {
        console.log("unmount")
        navigator.geolocation.clearWatch(this.watchId);
    };

    // componentWillReceiveProps(nextProps) {
    //     console.log('NEXT PROPS', nextProps.membersDetail)
    //     if (nextProps.membersDetail[0] !== undefined) {
    //         this.marker(nextProps.membersDetail)
    //     };
    // }
    marker() {
        if (this.props.membersDetail[0] !== undefined) {
            console.log('LOCATION', this.props.membersDetail[0].userLocation);
            return (
                this.props.membersDetail.map(marker => {
                    return (
                        marker.userLocation.map((a, i) => {
                            console.log(a.latitude, a.longitude)
                            return (
                                <MapView.Marker
                                    key={i}
                                    /* coordinate={latitude: marker.latitude} */
                                    coordinate={{
                                        latitude: a.latitude,
                                        longitude: a.longitude,
                                    }}
                                    title={marker.name}
                                />
                            )
                        }))
                    // { console.log(marker.userLocation) };
                })
            )
        }
        // else {
        //     return (
        //         <MapView.Marker
        //             coordinate={this.props.userLocation}
        //             title="You"
        //         />
        //     )
        // }
        // this.props.getNearByPlaces(region.latitude, region.longitude);
    }

    onRegionChangeComplete(region) {
        console.log('ON REGION CHANGE COMPLELTE', region)

        // if (this.props.locationsList.length > 0) {
        // this.createDataSource(this.props);
        // }
        this.setState({ region });
    }
    // searchText(text) {
    //     if (text.length <= 0) {
    //         this.setState({ searchBarFocus: false })
    //     }
    //     this.props.getLocationSearch(text);

    // }
    render() {
        if (!this.state.mapLoaded) {
            return (
                <Spinner size="large" />
            );
        }

        return (
            <View style={styles.container}>
                <MapView
                    mapType="standard"
                    provider={PROVIDER_GOOGLE}
                    region={this.state.region}
                    /* onRegionChangeComplete={this.onRegionChangeComplete.bind(this)} */
                    style={this.state.style}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnabled={true}
                >
                    {this.marker()}
                </MapView>

            </View>
        );
    }
}
const styles = {
    container: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute"
    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        // flex: 1,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // borderColor: 'black,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute"
    },
    iconStyle: {
        // flex: 1,
        paddingLeft: 15
    },
}

export default connect(mapStateToProps, null)(Map);