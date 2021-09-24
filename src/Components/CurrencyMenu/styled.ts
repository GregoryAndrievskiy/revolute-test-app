import styled from 'styled-components';

export const Screen = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-contnent: center;
    justify-content: center;
    align-items: center;
    background-color: #fff;
`;

export const CurrencySearch = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;

    button {
        border: none;
        cursor: pointer;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 6px;

        :hover {
            background-color: #f7f5f7
        }
    }

    input {
        flex-grow: 1;
        border: none;
        outline: none;
        padding: 0 20px;
    }
`;

export const List = styled.ul`
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #fff;
`;

export const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 10px;
    cursor: pointer;

    :hover {
        background-color: #f7f5f7;
    }
`;

export const Label = styled.span`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
`;

export const Dot = styled.div`
    width: 5px;
    height: 5px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: #000;
`;

export const Name = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
    color: darkgrey;
`;
