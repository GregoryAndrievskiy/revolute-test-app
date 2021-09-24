import styled from 'styled-components';

export const Screen = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-contnent: center;
    justify-content: center;
    align-items: center;
    background-color: #f7f5f7;
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    margin-top: 200px;
    align-items: center;

    > :not(:last-child) {
        margin-bottom: 5px;
    }
`;
