import React, {useState} from 'react';

import Input from '../ui/input';
import {EmailIcon, PasswordIcon} from '../ui/icons';
import Button from '../ui/button';

import './auth-page.less';

export default (() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='auth-page'>
            <div className="auth-page__title">Login</div>
            <div className="auth-page__form">
                <Input Icon={EmailIcon} placeholder="type email here"/>
                <Input Icon={PasswordIcon} placeholder="type password here"/>
            </div>
            <div className="auth-page__actions">
                <Button type='accept'>Login</Button>
            </div>
        </div>
    )
}) as React.FC;