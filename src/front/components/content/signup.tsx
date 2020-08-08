import React, {useState} from 'react';

import Input from '../ui/input';
import {EmailIcon, NicknameIcon, PasswordIcon} from '../ui/icons';
import Button from '../ui/button';

import './auth-page.less';

export default (() => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='auth-page'>
            <div className="auth-page__title">Registration</div>
            <div className="auth-page__form">
                <Input Icon={EmailIcon} placeholder="type email here"/>
                <Input Icon={NicknameIcon} placeholder="type nickname here"/>
                <Input Icon={PasswordIcon} placeholder="type password here"/>
            </div>
            <div className="auth-page__actions">
                <Button type='accept'>Register</Button>
            </div>
        </div>
    )
}) as React.FC;