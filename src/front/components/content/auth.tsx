import React, {ChangeEvent, useState} from 'react';

import Validator from '$common/helpers/validator';
import {Input} from '../ui/input';
import {EmailIcon, NicknameIcon, PasswordIcon} from '../ui/icons';
import {Button} from '../ui/button';

type Props = {
    handler: (user: { email: string, nickname?: string, password: string }) => void,
    isLogin: boolean
}

import './auth.less';

export const Auth = (({handler, isLogin}) => {
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
                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setEmail(e.target.value)}/>
                {!isLogin ? (
                    <Input Icon={NicknameIcon} placeholder='type nickname here' warning={!isNicknameValid}
                           notice='between 5 and 16 symbols'
                           onChange={(e: ChangeEvent<HTMLInputElement>) =>
                               setNickname(e.target.value)}/>
                ) : null}
                <Input Icon={PasswordIcon} placeholder='type password here' warning={!isPasswordValid}
                       notice='between 5 and 32 symbols' type='password'
                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setPassword(e.target.value)}/>
            </div>
            <div className='auth-page__actions'>
                <Button type='accept' onClick={() => {
                    if (isLogin)
                        handler({email, password})
                    else
                        handler({email, nickname, password})
                }} disabled={!isEmailValid || (!isLogin ? !isNicknameValid : false) || !isPasswordValid}>
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </div>
        </div>
    );
}) as React.FC<Props>;