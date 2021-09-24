import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 0;
    display: flex;
    position: relative;
    z-index: 1;
`;

export const SwitchButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid #f7f5f7;
    background-color: #fff;
`;
