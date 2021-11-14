import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login';
import CircularProgress from "@mui/material/CircularProgress";
import {logoutTC} from "./authReducer";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbars";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLogin = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogin)


    useEffect(() => {
        dispatch(initializeAppTC())

    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbars/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLogin && <Button onClick={logoutHandler} color={'inherit'}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<h1>Page not found</h1>}/>
                    <Navigate to={'/404'}/>
                </Routes>

            </Container>
        </div>
    )
}

export default App
