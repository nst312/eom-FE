import React, {useEffect} from 'react';
import withReducer from 'app/store/withReducer';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import reducer from './store';
import {acceptInvitationByCreateUser, validateToken} from './store/invitationsSlice';
import ResetPassword from "../Components/ResetPassword";

function AcceptInvitation() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {token} = params;
  useEffect(() => {
    dispatch(validateToken({token})).then((res) => {
      if (res.payload.response.data.error) navigate('/login');
    })
  }, [token]);

  const onSubmit = (model) => {
    dispatch(acceptInvitationByCreateUser({token, data: model.password})).then((res) => {
      if(res.payload) navigate('/login');
    })
  };

  return (
      <ResetPassword
          onDataSubmit={onSubmit}
      />
  );
}

export default withReducer('invitationApp', reducer)(AcceptInvitation);
