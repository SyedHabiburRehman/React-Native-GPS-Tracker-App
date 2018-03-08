import {
    INPUT_CHANGED,
    CREATE_CIRCLE_SUCCESS,
    GET_MY_CIRCLES_SUCCESS,
    GET_MEMBERS_SUCCESS,
    GROUP_JOINED,
    GROUP_JOINED_ERROR,
    LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
    circleName: '',
    myCircles: [],
    membersDetail: [],
    groupCode: '',
    groupJoin: false,
    groupJoinError: false,

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INPUT_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CREATE_CIRCLE_SUCCESS:
            console.log('circle create successful')
            return { ...state, ...INITIAL_STATE };
        case GET_MY_CIRCLES_SUCCESS:
            console.log(' get my circle successful')
            return { ...state, myCircles: action.payload };
        case GET_MEMBERS_SUCCESS:
            console.log(' get members successful')
            return { ...state, membersDetail: action.payload };
        case GROUP_JOINED:
            return { ...state, groupJoin: true, groupJoinError: false };
        case GROUP_JOINED_ERROR:
            return { ...state, groupJoin: false, groupJoinError: true };
        case LOGOUT:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
        // case FETCH_LOCATION_SUCCESSFUL:
        //     console.log("Hello world")
        //     return { ...state, locationsList: action.payload }
        // case FETCH_LOCATION_DETAIL_SUCCESSFUL:
        //     // console.log(action.payload)
        //     return { ...state, locationDetail: action.payload }
        // case GET_POLYLINE:
        //     // console.log(action.payload)
        //     return { ...state, coords: action.payload }
        // case FETCH_LOCATION_SEARCH_SUCCESSFUL:
        //     // console.log(action.payload)
        //     return { ...state, locationSearch: action.payload }
        // // case LOGOUT:
        // console.log('LOGOUT')
        //     return { ...state, ...INITIAL_STATE };
    }
};