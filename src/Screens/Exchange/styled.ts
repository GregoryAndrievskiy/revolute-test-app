import styled from 'styled-components';

export const Content = styled.div`
    width: 100%;
    height: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    justify-contnent: center;
    justify-content: center;
    align-items: center;
`;

export const Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Action = styled.div`
    font-size: 24px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 5px;
`;

export const Rate = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #0357ef;

    > svg {
        width: 12px;
        height: 12px;
        margin-right: 5px;
    }
`;

export const ConfirmButton = styled.button`
    margin-top: 100px;
    background-color: #0357ef;
    color: #fff;
    width: 100%;
    cursor: pointer;
    border-radius: 10px;
    text-transform: capitalize;
    height: 40px;
    border: none;

    :hover {
        opacity: 0.9;
    }

    :disabled {
        opacity: 0.5;
        cursor: default;
    }
`;
