import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLogin} from "./authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
    // если наше приложение не проинициализировано (!isInitialized) показываем крутилку  <CircularProgress/> для того чтоб не было морганий
}
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        }

    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setIsInitializedAC, setAppStatusAC} = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLogin({isLogin: true}));

        } else {
            dispatch(setAppErrorAC({error: res.data.messages[0]}))
            dispatch(setIsInitializedAC({isInitialized: false}))
        }
    })
        .finally(() => {
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}



