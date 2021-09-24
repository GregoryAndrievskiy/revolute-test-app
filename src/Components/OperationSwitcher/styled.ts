import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 0;
    display: flex;
    position: relative;
    z-index: 1;
`;

export const SwitchButton = styled.button`
    width: 28px;
    height: 28px;
    padding: 0;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid #f7f5f7;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
        width: 12px;
        height: 12px;
        color: #0357ef;
    }
`;
