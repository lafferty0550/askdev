import React, {useContext} from 'react';
import {Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom';

import {CreateContainer} from '$containers/content/question/create';
import {Chat} from '$components/content/chat';
import {FAQ} from '$components/content/faq';
import {Tab, Tabs} from '$components/tab';
import {QuestionListContainer} from '$containers/content/question/list';
import {MyQuestionListContainer} from '$containers/content/question/mine';
import {AuthContainer} from '$containers/content/auth';
import {AccountContext} from '$account/context';
import {QuestionContainer} from '$containers/content/question/question';
import {ProfileContainer} from '$containers/content/profile';
import {Sidebar} from '$components/layout/sidebar';

import '$components/content/content.less';

export const Content = (() => {
    const {authorized} = useContext(AccountContext);

    // for lazy load
    const renderList = () => <QuestionListContainer/>;
    const renderMine = () => <MyQuestionListContainer/>;

    return (
        <div className='content'>
            <Switch>
                <Route exact path='/questions/new' component={CreateContainer}/>
                <Route exact path='/questions' render={() => (
                    <div className='content-container'>
                        <Tabs>
                            {/*Lazy load*/}
                            <Tab label='List'>{renderList}</Tab>
                            <Tab label='Mine'>{renderMine}</Tab>
                        </Tabs>
                        <Sidebar/>
                    </div>
                )}/>
                <Route exact path='/questions/:id' render={(props: RouteComponentProps<{ id: string }>) =>
                    <QuestionContainer id={props.match.params.id} showComments={true}/>}/>
                <Route exact path='/chat' component={Chat}/>
                <Route exact path='/faq' component={FAQ}/>
                {!authorized && (
                    <>
                        <Route exact path='/signin' component={() => <AuthContainer isLogin={true}/>}/>
                        <Route exact path='/signup' component={() => <AuthContainer isLogin={false}/>}/>
                    </>
                )}
                <Route exact path='/profile' component={ProfileContainer}/>
                <Redirect to='/questions'/>
            </Switch>
        </div>
    );
}) as React.FC;