import React, {ChangeEvent, useState} from 'react';

import Validator from '$common/helpers/validator';
import {Input} from '../input';
import {EmailIcon, NicknameIcon, PasswordIcon} from '../icons';
import {Button} from '../button';
import {LoginPayload, RegisterPayload} from '$common/types';

type Props = {
    login?: (user: LoginPayload) => void,
    register?: (user: RegisterPayload) => void,
    isLogin: boolean
}

import './auth.less';

export const Auth = (({login, register, isLogin}) => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = Validator.isEmail(email);
    const isNicknameValid = Validator.isNickname(nickname);
    const isPasswordValid = Validator.isPassword(password);

    return (
        <div className='auth-page'>
            <div className='auth-page__title'>{isLogin ? 'Login' : 'Registration'}</div>
            <div className='auth-page__form'>
                <Input Icon={EmailIcon} placeholder='type email here' warning={!isEmailValid} type='email'
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                       className='auth-page__input'/>
                {!isLogin ? (
                    <Input Icon={NicknameIcon} placeholder='type nickname here' warning={!isNicknameValid}
                           notice='between 5 and 16 symbols'
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                           className='auth-page__input'/>
                ) : null}
                <Input Icon={PasswordIcon} placeholder='type password here' warning={!isPasswordValid}
                       notice='between 5 and 32 symbols' type='password'
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                       className='auth-page__input'/>
            </div>
            <div className='auth-page__actions'>
                <Button type='accept' onClick={() => {
                    if (isLogin && login)
                        login({email, password})
                    else if (register)
                        register({email, nickname, password})
                }} disabled={!isEmailValid || (!isLogin ? !isNicknameValid : false) || !isPasswordValid}>
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </div>
        </div>
    );
}) as React.FC<Props>;