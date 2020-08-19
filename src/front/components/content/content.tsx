import React, {useContext, useEffect} from 'react';
import {Switch, Route, Redirect, RouteComponentProps, RouteProps} from 'react-router-dom';

import {CreateContainer} from '../../containers/content/question/create';
import {Chat} from './chat';
import {FAQ} from './faq';
import {Tab, Tabs} from '../ui/tab';
import {QuestionListContainer} from '../../containers/content/question/list';
import {MyQuestionListContainer} from '../../containers/content/question/mine-list';
import {AuthContainer} from '../../containers/content/auth';
import {AccountContext} from '../../account/context';
import {CurrentContainer} from '../../containers/content/question/current';

import './content.less';

export const Content = (() => {
    const {authorized} = useContext(AccountContext);

    return (
        <div className='content'>
            <Switch>
                <Route exact path='/questions/new' component={CreateContainer}/>
                <Route exact path='/questions' render={() => (
                    <Tabs>
                        {/*
                            Because of Tabs component uses lazy load we need to pass the functions instead of
                            components to render it when needed.
                            I don't know is it dirty code or not but it seems pretty good :)
                        */}
                        <Tab label='List'>
                            {() => <QuestionListContainer/>}
                        </Tab>
                        <Tab label='Mine'>
                            {() => <MyQuestionListContainer/>}
                        </Tab>
                    </Tabs>
                )}/>
                <Route exact path='/questions/:id'
                       render={(props: RouteComponentProps<{ id: string }>) => <CurrentContainer
                           id={props.match.params.id}/>}/>
                <Route exact path='/chat' component={Chat}/>
                <Route exact path='/faq' component={FAQ}/>
                {!authorized && (
                    <>
                        <Route exact path='/signin' component={() => <AuthContainer isLogin={true}/>}/>
                        <Route exact path='/signup' component={() => <AuthContainer isLogin={false}/>}/>
                    </>
                )}
                <Redirect to='/questions'/>
            </Switch>
        </div>
    );
}) as React.FC;