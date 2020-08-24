import React, {useContext, useState} from 'react';

import {AccountContext} from '$account/context';
import {AccountState} from '$account/types';
import {Profile} from '$components/content/profile';
import {useFetch} from '$hooks/useFetch';
import {PatchMeData} from '$common/types';
import {API} from '$core/api';

export const ProfileContainer = (() => {
    const {about}: AccountState = useContext(AccountContext);
    const {pending, success, msg, data, makeFetch} = useFetch<PatchMeData>();
    const [email, setEmail] = useState(about!.email);
    const [nickname, setNickname] = useState(about!.nickname);
    const [password, setPassword] = useState(about!.password);

    const save = () => makeFetch(() => API.account.updateMe({email, nickname, password}));

    return <Profile email={email} nickname={nickname} password={password} setEmail={setEmail} setNickname={setNickname}
                    setPassword={setPassword} save={save}/>;
}) as React.FC;