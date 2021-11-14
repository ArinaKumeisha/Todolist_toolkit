import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {LoginTC} from '../app/authReducer';
import {AppRootStateType} from '../app/store';
import {Navigate} from 'react-router-dom';


export type ValueType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const validate = (values: ValueType) => {
    let errors: ValueType = {};
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less';
    }else if (values.password.length < 7) {
        errors.password = 'Must be 7 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};


export const Login = () => {
    const dispatch = useDispatch()
    const isLogin = useSelector<AppRootStateType, boolean>((state)=> state.auth.isLogin)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,

        },validate,
        onSubmit: values => {
            dispatch(LoginTC(values))
            formik.resetForm()
        },
    })
    if(isLogin) {
        return <Navigate to={"/"} replace={true}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                    </p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color:'red'}}>{formik.errors.email}</div> : null}

                    <TextField
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color:'red'}}>{formik.errors.password}</div> : null }

                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox/>}
                        name="rememberMe"
                        onChange={formik.handleChange}
                        checked={formik.values.rememberMe}
                        />

                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}
