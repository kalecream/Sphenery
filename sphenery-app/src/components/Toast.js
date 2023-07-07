// src/components/Toast.js

import React from 'react';
import 'styled-components';
import { styled } from 'styled-components';

const StyledToast = styled.div`
    position: absolute;
    bottom: 50px;
    border: 1px solid #007bff;
    padding: 2rem;
    color: black;
    width: 80%;
    text-align: center;
    font-weight: 800;
    border-radius: 5px;
    margin: 10px;
`;

function Toast({ message, type = 'error' }) {

    return (
        <StyledToast>
            {message}
        </StyledToast>
    );
}

export default Toast;
