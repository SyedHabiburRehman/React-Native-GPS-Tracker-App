import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import {
    USER_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT
} from './types';



export const userChanged = ({ prop, value }) => {
    return {
        type: USER_CHANGED,
        payload: { prop, value }
    }
}

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
}

export const passwordChange = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    };
}

const getUsers = (_id, email, password) => {
    return (dispatch) => {
        console(uid, email, password)

    }
}

export const loginUser = ({ email, password, navigation }) => {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                alert("Login");
                firebase.database().ref(`/GPStracker/${user.uid}`)
                    .once('value')

                    .then((data) => {
                        let usersData = data.val();
                        console.log(email, usersData.email)

                        // uncomment below code of you want to use with async storage which is in login compo at line# 37

                        var sortData = {}
                        sortData = {
                            _id: usersData._id,
                            email: usersData.email,
                            password: usersData.password,
                            name: usersData.name,
                        }

                        console.log('USER DATA', usersData);
                        AsyncStorage.setItem('GPSapp', JSON.stringify(sortData))
                        dispatch(loginUserSuccess(usersData));
                        navigation.navigate('Map')
                    });
                // getUsers(user.uid, email, password)
            })
            // .then((user) => {
            //     console.log(user.uid)
            //     getUsers(user.uid, email, password);

            // })
            .catch((error) => {
                console.log(error);
                loginUserFail(dispatch)
            });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL,
    });
};

const loginUserSuccess = (user) => {

    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    };

};



export const SignupUser = ({ name, email, password, navigation }) => {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: SIGNUP_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                let _id = user.uid;
                alert(
                    "ug"
                )
                firebase.database().ref(`/GPStracker/${_id}`).set({ _id, name, email, password });

                dispatch(signupUserSuccess(user));
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error);
                signupUserFail(dispatch);
            });
    };
};

const signupUserSuccess = (user) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: user
    };

};

const signupUserFail = (dispatch) => {
    dispatch({
        type: SIGNUP_USER_FAIL,
    });
};


export const logout = (props) => {
    console.log(props)
    return (dispatch) => {
        AsyncStorage.removeItem('GPSapp')
        // dispatch({ type: LOGOUT });
        getResetActions('Home')
    };
};

const getResetActions = (routeName) => {

    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName }),
        ],
    });
    props.navigation.dispatch(resetAction);
}