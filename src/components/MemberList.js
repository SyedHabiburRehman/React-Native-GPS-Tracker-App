import React, { Component } from 'react';
import { ScrollView, StyleSheet, Button, Text, TextInput, View, Image, Dimensions, TouchableOpacity, Share } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner } from './common';
// import { Entypo } from 'react-native-vector-icons';
import { getMembers } from '../actions';

const mapStateToProps = ({ circleReducer }) => {
    const { membersDetail } = circleReducer;
    console.log('member Detail', membersDetail)
    return {
        membersDetail
    }
}
class MemberList extends Component {
    static navigationOptions = ({ navigation }) => ({

        // drawLabel: 'Create Circle',
        title: navigation.state.params.circleName,
        // headerLeft: <Entypo onPress={() => navigation.navigate('DrawerOpen')} size={30} name="menu" color="blue" />

        // headerRight: <Logout navigation={navigation} />


    });

    constructor() {
        super();
        this.state = {
            loading: true
        }
    }
    componentWillMount() {
        const { member } = this.props.navigation.state.params;
        console.log('WILL MOUNT MEMBERS', member)
        this.props.getMembers(member, this.props.navigation, 'member');
    }

    componentWillReceiveProps(nextProps) {
        console.log('NEXT PROPS', nextProps);
        // if (nextProps.membersDetail[0] !== undefined) {
        //     this.setState({ loading: false })
        // }
    }

    invite() {
        Share.share({ message: this.props.navigation.state.params.groupCode })
    }

    render() {
        // console.log(this.props.navigation.state.params)

        alert('member list')
        console.log('--------------', this.props.membersDetail)

        const { adminId, groupCode } = this.props.navigation.state.params;
        return (
            // (this.props.membersDetail[0] === undefined) ?
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        {
                            this.props.membersDetail.map((member, index) => {
                                console.log(member.name)
                                return (
                                    <CardSection key={index}>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.textStyle}>{member.name}</Text>

                                            {
                                                member._id === adminId
                                                    ?
                                                    <Text>Circle Owner</Text>
                                                    :
                                                    <Text>Member</Text>
                                            }
                                        </View>
                                    </CardSection>
                                )
                            })
                        }
                    </View>
                    <View style={styles.inviteContainer}>


                        <Text> Send This Code to Invite Your Friend: {groupCode} </Text>
                        <Button
                             onPress={this.invite.bind(this)}
                            title="JOIN"

                            style={styles.buttonStyle}
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>
            </ScrollView>



            // <Text> Loading</Text >
            //     :
            //     this.kisibnaamsy()
        )
    }

}

const styles = {
    container: {
        flexDirection: 'column',
        flex: 1
    },
    textContainer: {
        flexDirection: 'column',
        flex: 2,
        height: 50,
    },
    inviteContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // buttonContainer: {
    //     flexDirection: 'row',
    //     flex: 1,
    //     marginRight: 5,
    // },
    buttonStyle: {
        height: 40,
        width: 60,
        color: "white",
        borderColor: 'blue',
        backgroundColor: 'blue',
        borderRadius: 10
    },
    textStyle: {
        fontSize: 25,
        paddingLeft: 10,
        color: 'black'

    },
}

export default connect(mapStateToProps, { getMembers })(MemberList);








// kisibnaamsy() {  
    // const { adminId } = this.props.navigation.state.params;
    // if (this.props.membersDetail[0] === undefined && this.state.loading === true) {
    //     return (
    //         <Spinner size="large" />
    //     );
    // }

    //     return (
    //         <ScrollView>
    //             <View>
    //                 {
    //                     this.props.membersDetail.map((member, index) => {
    //                         return (
    //                             <CardSection key={index}>
    //                                 <View style={styles.textContainer}>
    //                                     <Text style={styles.textStyle}>{member.name}</Text>

    //                                     {/* member._id === adminId */}

    //                                     <Text>Circle Owner</Text>

    //                                 </View>
    //                             </CardSection>
    //                         )
    //                     })
    //                 }
    //             </View>
    //         </ScrollView>
    //     )
    // }