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
    logout: () => void,
    isAuth: boolean,
    loginPending: Pending,
    path: string
};

export const Navbar = (({logout, isAuth, loginPending, path}) => {
    const [active, setActive] = useState(path);

    const items = [{
        path: '/questions',
        Icon: QuestionIcon,
        label: 'Questions'
    }, {
        path: '/chat',
        Icon: ChatIcon,
        label: 'Chat'
    }, {
        path: '/faq',
        Icon: FAQIcon,
        label: 'FAQ'
    }];

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
                {items.map(item => (
                    <Link to={item.path} onClick={() => setActive(item.path)}
                          className={active === item.path ? 'active' : undefined} key={item.path}>
                        <item.Icon/>
                        {item.label}
                    </Link>
                ))}
            </nav>
            <LoadingWrapper pending={loginPending}>
                {isAuth
                    ? (
                        <div className='navbar__footer'>
                            <Link to='/profile'><UserIcon className='navbar__account'/></Link>
                            <Link to='/signin' onClick={logout}><SignOutIcon/>Sign Out</Link>
                        </div>
                    )
                    : (
                        <div className='navbar__footer'>
                            <Link to='/signin'><SignInIcon/>Sign In</Link>
                            <Link to='/signup'><SignUpIcon/>Sign Up</Link>
                        </div>
                    )
                }
            </LoadingWrapper>
        </div>
    );
}) as React.FC<Props>;