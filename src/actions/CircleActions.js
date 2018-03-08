import _ from 'lodash';
import { Alert } from 'react-native';
import * as firebase from 'firebase';
import axios from 'axios';
import {
    INPUT_CHANGED,
    CREATE_CIRCLE_SUCCESS,
    GET_MY_CIRCLES_SUCCESS,
    GET_MEMBERS_SUCCESS,
    GROUP_JOINED,
    GROUP_JOINED_ERROR
} from './types';
// import Polyline from '@mapbox/polyline';

export const inputChanged = ({ prop, value }) => {
    return {
        type: INPUT_CHANGED,
        payload: { prop, value }
    };
};
export const circleCreation = (circleName, adminId, name, email, navigation) => {
    return (dispatch) => {
        console.log('CIRCLE MIDDLEWARE', circleName, adminId, name, email, navigation)
        // console.log('CIRCLE MIDDLEWARE', circleName, , name, email, navigation)
        const groupKey = firebase.database().ref(`/groups/`).push().key;
        const groupCode = groupKey.slice(0, 6);

        firebase.database().ref(`/groups/${groupKey}`)
            .set({
                circleName,
                adminId,
                groupKey,
                groupCode,
                name,
                email,
                member: [adminId]
            });

        console.log('Circle Created');

        dispatch(CreateCircleSuccess());
        navigation.navigate('myCircles');
    }
}

const CreateCircleSuccess = () => {
    return {
        type: CREATE_CIRCLE_SUCCESS
    };
}


export const myCircle = (_id) => {
    return (dispatch) => {
        firebase.database().ref('/groups')
            .once('value', snapshot => {

                const circles = _.map(snapshot.val(), (value) => {
                    return { ...value }
                })
                console.log('CIRLCES LIST ', circles)

                let filterCircles = _.filter(circles, (item) => {
                    if (item.hasOwnProperty("member")) {
                        for (var i = 0; i < item.member.length; i++) {
                            console.log('CIRLCES LIST ', item.member[0])
                            if (item.member[i] === _id) {
                                return item
                            }
                        }

                    }
                    console.log('FILTER CIRLCES LIST ', filterCircles)
                })
                dispatch({ type: GET_MY_CIRCLES_SUCCESS, payload: filterCircles })
            })
    }
}

export const joinCircle = (groupCode, _id) => {
    return (dispatch) => {
        // const data = []

        const dataFilter = []
        var memberdata = [];
        var groupKey = '';

        const codekey = '';

        .once("value", snapshot => {

            const circles = _.map(snapshot.val(), (value) => {
                    return { ...value }
                const allGroups = firebase.database().ref("/groups")
                })
                console.log('Circles in Join Circles middleware', circles)
                circles.map((obj) => {
                    codeKey = obj.groupCode
                    console.log(obj, 'OBJ')
                    if (codeKey === groupCode) {
                        groupKey = obj.groupKey;
                        memberdata = obj.member;
                    }
                })
            })
            .then(() => {

                console.log(memberdata, groupKey, "FOUND")
                if (groupKey !== '' && memberdata[0] !== undefined) {

                    memberdata.push(_id)
                    console.log('GROUPCODE IN MIDDLEWARE ', groupKey)

                    const dataPush = firebase.database().ref(`/groups/${groupKey}/member`)
                    dataPush.set(memberdata)

                    dispatch({ type: GROUP_JOINED })
                }

                else {
                    console.log("ERROR")

                    dispatch({ type: GROUP_JOINED_ERROR })

                }
            })
    }
}

export const getMembers = (member, navigation, routeName) => {
    console.log('members', member)
    const memberList = []
    return (dispatch) => {
        Promise.all(member.map(id => firebase.database().ref(`/GPStracker/${id}`).once("value")))
            .then((data) => {
                data.map((obj) => { memberList.push(obj.val()) })
                dispatch({ type: GET_MEMBERS_SUCCESS, payload: memberList })
            })
        console.log('MEMBER LIST IN MIDDLEWARE', memberList)



        // member.map((id) => {
        //     console.log('member Id', id)
        //     firebase.database().ref(`/GPStracker/${id}`)
        //         .on('value', snapshot => {
        //             memberList.push(snapshot.val());
        //         })
        // })

        // console.log('MEMBER LIST', memberList);

        // dispatch({ type: GET_MEMBERS_SUCCESS, payload: memberList })
        if (routeName === 'map') {
            navigation.navigate('Map')
        }
        // setTimeout(() => {
        //         , 1000
        // })
    }
}