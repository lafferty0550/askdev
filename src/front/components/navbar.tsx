import React from 'react';
import {Link} from 'react-router-dom';

import {
    SignUpIcon,
    SignInIcon,
    FAQIcon,
    ChatIcon,
    QuestionIcon,
    PlusIcon
} from './ui/icons';

import './navbar.less';

export default (() => (
    <div className="navbar">
        <div className="navbar__logo">
            {"</>"}DevASK
        </div>
        <div className="navbar__ask">
            <PlusIcon/>
            ASK QUESTION
        </div>
        <nav className="navbar__nav">
            <Link to="/questions">
                <QuestionIcon/>
                Questions
            </Link>
            <Link to="/chat">
                <ChatIcon/>
                Chat
            </Link>
            <Link to="/faq">
                <FAQIcon/>
                FAQ
            </Link>
        </nav>
        <div className="navbar__footer">
            <Link to="/signin">
                <SignInIcon/>
                Sign In
            </Link>
            <Link to="/signup">
                <SignUpIcon/>
                Sign Up
            </Link>
        </div>
    </div>
)) as React.FC;