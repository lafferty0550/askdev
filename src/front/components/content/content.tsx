import React from 'react';
import {Switch, Route} from 'react-router-dom';

import QuestionList from './qustion-list';
import Question from './question';
import Chat from './chat';
import FAQ from './faq';
import SignIn from './signin';
import SignUp from './signup';

import './content.less';

export default (() => (
    <div className="content">
        <Switch>
            <Route path='/questions' component={QuestionList}/>
            <Route path='/questions/:id' component={Question}/>
            <Route path='/chat' component={Chat}/>
            <Route path='/faq' component={FAQ}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
        </Switch>
    </div>
)) as React.FC;