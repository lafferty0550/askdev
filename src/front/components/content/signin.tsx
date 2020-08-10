import React, {ChangeEvent, useState} from 'react';

import Input from '../ui/input';
import {EmailIcon, PasswordIcon} from '../ui/icons';
import Button from '../ui/button';
import Spinner from '../ui/spinner';

import {Status} from '../../account/types';
import {Redirect} from 'react-router-dom';
import Validator from '../../../common/helpers/validator';

import './auth-page.less';

type Props = {
    login: (email: string, password: string) => void,
    loginStatus: Status
};

export default (({login, loginStatus}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (loginStatus.success)
        return <Redirect to='/questions'/>

    const isEmailValid = Validator.isEmail(email);
    const isPasswordValid = Validator.isPassword(password);

    return (
        <div className='auth-page'>
            <div className='auth-page__title'>Login</div>
            <div className='auth-page__form'>
                <Input Icon={EmailIcon} placeholder='type email here' warning={!isEmailValid}
                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setEmail(e.target.value)}/>
                <Input Icon={PasswordIcon} placeholder='type password here' warning={!isPasswordValid} type='password'
                       notice='between 5 and 32 symbols'
                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setPassword(e.target.value)}/>
            </div>
            {loginStatus.pending && <Spinner className='auth-page__spinner'/>}
            <div className='auth-page__actions'>
                <Button type='accept' onClick={() => login(email, password)}
                        disabled={!isEmailValid || !isPasswordValid}>
                    Login
                </Button>
            </div>
        </div>
    )
}) as React.FC<Props>;