import React from 'react';
import {Link} from 'react-router-dom';

import {
    SignUpIcon,
    SignInIcon,
    FAQIcon,
    ChatIcon,
    QuestionIcon,
    PlusIcon, SignOutIcon
} from './ui/icons';

import './navbar.less';
import {LoadingWrapper} from './content/loading-wrapper';
import {Pending} from '../hooks/useFetch';

type Props = {
    logout: () => void,
    isAuth: boolean,
    loginPending: Pending
};

export const Navbar = (({logout, isAuth, loginPending}) => (
        <div className='navbar'>
            <Link className='navbar__logo' to='/questions'>
                {'</>'}DevASK
            </Link>
            <Link to='/questions/new' className='navbar__ask'>
                <PlusIcon/>
                ASK QUESTION
            </Link>
            <nav className='navbar__nav'>
                <Link to='/questions'>
                    <QuestionIcon/>
                    Questions
                </Link>
                <Link to='/chat'>
                    <ChatIcon/>
                    Chat
                </Link>
                <Link to='/faq'>
                    <FAQIcon/>
                    FAQ
                </Link>
            </nav>
            <LoadingWrapper pending={loginPending} success={true}>
                {isAuth
                    ? (
                        <div className='navbar__footer'>
                            <Link to='/signin' onClick={logout}>
                                <SignOutIcon/>
                                Sign Out
                            </Link>
                        </div>
                    )
                    : (
                        <div className='navbar__footer'>
                            <Link to='/signin'>
                                <SignInIcon/>
                                Sign In
                            </Link>
                            <Link to='/signup'>
                                <SignUpIcon/>
                                Sign Up
                            </Link>
                        </div>
                    )
                }
            </LoadingWrapper>
        </div>
    )
) as React.FC<Props>;