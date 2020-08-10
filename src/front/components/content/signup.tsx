import React, {useState, ChangeEvent} from 'react';

import Input from '../ui/input';
import {EmailIcon, NicknameIcon, PasswordIcon} from '../ui/icons';
import Button from '../ui/button';
import Spinner from '../ui/spinner';

import {Status} from '../../account/types';
import Validator from '../../../common/helpers/validator';

import './auth-page.less';
import {Redirect} from 'react-router-dom';

type Props = {
    register: (email: string, nickname: string, password: string) => void,
    registerStatus: Status
};

export default (({register, registerStatus}) => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    if (registerStatus.success)
        return <Redirect to='/signin'/>

    const isEmailValid = Validator.isEmail(email);
    const isNicknameValid = Validator.isNickname(nickname);
    const isPasswordValid = Validator.isPassword(password);

    return (
        <div className='auth-page'>
            <div className='auth-page__title'>Registration</div>
            <div className='auth-page__form'>
                <Input Icon={EmailIcon} placeholder='type email here' warning={!isEmailValid}
                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setEmail(e.target.value)}/>
                <Input Icon={NicknameIcon} placeholder='type nickname here' warning={!isNicknameValid}
                       notice='between 5 and 16 symbols'
                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setNickname(e.target.value)}/>
                <Input Icon={PasswordIcon} placeholder='type password here' warning={!isPasswordValid}
                       notice='between 5 and 32 symbols' type='password'
                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setPassword(e.target.value)}/>
            </div>
            {registerStatus.pending && <Spinner className='auth-page__spinner'/>}
            <div className='auth-page__actions'>
                <Button type='accept' onClick={() => register(email, nickname, password)}
                        disabled={!isEmailValid || !isNicknameValid || !isPasswordValid}>
                    Register
                </Button>
            </div>
        </div>
    )
}) as React.FC<Props>;