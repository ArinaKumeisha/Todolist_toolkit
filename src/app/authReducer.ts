import {Dispatch} from 'redux';
import {authAPI, LoginParamsType} from '../api/todolists-api';
import {setAppErrorAC, setAppStatusAC,} from './app-reducer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {isLogin: false}
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin
        },

    },
})
export const authReducer = slice.reducer
export const {setIsLogin} = slice.actions



export const LoginTC = (data: LoginParamsType) => {
    return async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const response = await authAPI.login(data)
        if (response.data.resultCode === 0) {
            dispatch(setIsLogin({isLogin: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            if (response.data.messages.length) {
                dispatch(setAppErrorAC({error: response.data.messages[0]}))
            } else {
                dispatch(setAppErrorAC({error: 'Error!!!'}))
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        }
    }
}
export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.logout()
            .then((res) => {

                if (res.data.resultCode === 0) {
                    dispatch(setIsLogin({isLogin: false}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))

                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC({error: res.data.messages[0]}))
                    } else {
                        dispatch(setAppErrorAC({error: 'Error!!!'}))
                        dispatch(setAppStatusAC({status: 'failed'}))
                    }
                }
            }).catch(e => (dispatch(setAppErrorAC(e.message))))
    }
}

