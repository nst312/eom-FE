import React, {useEffect} from 'react';
import withReducer from 'app/store/withReducer';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import reducer from './store';
import {resetPassword, validateForgetPasswordToken} from "./store/forgotPasswordSlice";
import ResetPassword from "../Components/ResetPassword";

function UpdatePassword() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const {token} = params;
    useEffect(() => {
        dispatch(validateForgetPasswordToken({token})).then((res) => {
            if (res.payload.response?.data.error) navigate('/login');
        })
    }, [token]);

    const onSubmit = (model) => {
        const data = {
            password: model.password,
            newPassword: model.newPassword
        };
        dispatch(resetPassword({token, data})).then((res) => {
            if (res.payload) navigate('/login');
        })
    };

    return (
        <ResetPassword
            onDataSubmit={onSubmit}
        />
    );
}

export default withReducer('forgotPasswordApp', reducer)(UpdatePassword);
