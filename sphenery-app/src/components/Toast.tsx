import React from 'react';
import { styled } from 'styled-components';

const StyledToast = styled.div`
    color: var(--accent);
    padding: 0.5rem;
    border: 3px solid var(--accent);
    width: 422px;
    text-align: center;
    font-weight: 500;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    margin: 1rem 0;
`;

interface ToastProps {
    message: string | null;
    type?: string;
}

const Toast:React.FC<ToastProps> = ({ message, type = 'error' }) => {

    return (
        <StyledToast>
            {message}
        </StyledToast>
    );
}

export default Toast;
