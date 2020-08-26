import React from 'react';
import {Input} from '$components/input';

import './profile.less';
import {Button} from '$components/button';

type Props = {
    email: string,
    nickname: string,
    password: string,

    setEmail: (text: string) => void,
    setNickname: (text: string) => void,
    setPassword: (text: string) => void,

    save: () => void
};

export const Profile = (({email, nickname, password, setEmail, setNickname, setPassword, save}) => (
    <div className='profile'>
        <div className="profile__title">
            Profile info
        </div>
        <div className="profile__attributes">
            <div className="profile__attribute">
                <span>Email:</span>
                <Input value={email} onChange={e => setEmail(e.target.value)} className='profile__input'/>
            </div>
            <div className="profile__attribute">
                <span>Nickname:</span>
                <Input value={nickname} onChange={e => setNickname(e.target.value)} className='profile__input'/>
            </div>
            <div className="profile__attribute">
                <span>Password:</span>
                <Input value={password} onChange={e => setPassword(e.target.value)} className='profile__input'/>
            </div>
        </div>
        <div className='profile__actions'>
            <Button onClick={save} fullWidth={true}>Save</Button>
        </div>
    </div>
)) as React.FC<Props>;