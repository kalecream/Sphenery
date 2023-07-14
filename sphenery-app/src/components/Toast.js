// src/components/Toast.js

import React from 'react';
import 'styled-components';
import { styled } from 'styled-components';

const StyledToast = styled.div`
    background-color: #d9feab;
    padding: 0.5rem;
    color: #020305;
    width: 425px;
    text-align: center;
    font-weight: 500;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    margin: 1rem 0;
`;

function Toast({ message, type = 'error' }) {

    return (
        <StyledToast>
            {message}
        </StyledToast>
    );
}

export default Toast;
