import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {
    SignUpIcon,
    SignInIcon,
    FAQIcon,
    ChatIcon,
    QuestionIcon,
    PlusIcon, SignOutIcon, UserIcon
} from '../icons';
import {LoadingWrapper} from '../content/loading-wrapper';
import {Pending} from '$hooks/useFetch';

import './navbar.less';

type Props = {
    isAuth: boolean,        // user auth status
    loginPending: Pending,  // check if user is logging in now
    path: string,           // current url

    logout: () => void
};

export const Navbar = (({logout, isAuth, loginPending, path}) => {
    const [active, setActive] = useState(path); // show which link is active now

    return (
        <div className='navbar'>
            <Link className='navbar__logo' to='/questions'>
                {'</>'}DevASK
            </Link>
            <Link to='/questions/new' className='navbar__ask'>
                <PlusIcon/>
                ASK QUESTION
            </Link>
            <nav className='navbar__nav'>
                <Link to='/questions' onClick={() => setActive('/questions')}
                      className={active === '/questions' ? 'active' : undefined}>
                    <QuestionIcon/>
                    Questions
                </Link>
                <Link to='/chat' onClick={() => setActive('/chat')}
                      className={active === '/chat' ? 'active' : undefined}>
                    <ChatIcon/>
                    Chat
                </Link>
                <Link to='/faq' onClick={() => setActive('/faq')}
                      className={active === '/faq' ? 'active' : undefined}>
                    <FAQIcon/>
                    FAQ
                </Link>
            </nav>
            <LoadingWrapper pending={loginPending} success={true}>
                {isAuth
                    ? (
                        <div className='navbar__footer'>
                            <Link to='/profile'><UserIcon className='navbar__account'/></Link>
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
    );
}) as React.FC<Props>;