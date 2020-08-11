import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import QuestionList from '../../containers/content/question-list';
import NewQuestion from '../../containers/content/new-question';
import Question from './question';
import Chat from './chat';
import FAQ from './faq';
import SignIn from '../../containers/content/signin';
import SignUp from '../../containers/content/signup';

import './content.less';
import {AccountContext} from '../../account/context';

export default (() => {
    const {selectors} = useContext(AccountContext);
    const isAuth = selectors.authorized();

    return (
        <div className='content'>
            <Switch>
                <Route path='/questions/new' component={NewQuestion}/>
                <Route path='/questions' component={QuestionList}/>
                <Route path='/questions/:id' component={Question}/>
                <Route path='/chat' component={Chat}/>
                <Route path='/faq' component={FAQ}/>
                {!isAuth && (
                    <>
                        <Route path='/signin' component={SignIn}/>
                        <Route path='/signup' component={SignUp}/>
                    </>
                )}
                <Redirect to='/questions'/>
            </Switch>
        </div>
    );
}) as React.FC;