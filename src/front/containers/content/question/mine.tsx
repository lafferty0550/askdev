import React, {useContext, useMemo} from 'react';

import {AccountContext} from '$account/context';
import {AccountState} from '$account/types';
import {QuestionList} from '$components/content/question/list';

export const MyQuestionListContainer = (() => {
    const {authorized, about}: AccountState = useContext(AccountContext);

    if (!authorized)
        return <div>You should login</div>;

    return useMemo(() => <QuestionList list={about!.questions}/>, [about!.questions]);
}) as React.FC;