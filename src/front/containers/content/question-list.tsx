import React, {useMemo} from 'react';
import useQuestions from '../../hooks/useQuestions';

import QuestionList from '../../components/content/qustion-list';

export default (() => {
    const {pending, success, data, msg} = useQuestions();
    const QuestionListMemo = useMemo(() => <QuestionList list={data}/>, [data]);

    return (
        <>
            {QuestionListMemo}
        </>
    );
}) as React.FC;