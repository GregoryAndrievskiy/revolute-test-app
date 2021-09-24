import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    border-radius: 2px;
    background-color: #fff;
    position: relative;
    padding: 5px 10px 5px 5px;
`;

export const StartAdornment = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    max-width: 100px;
    height: calc(100% - 10px);
    justify-content: space-between;
`;

export const ChangeButton = styled.button`
    border: none;
    display: flex;
    align-items: center;
    width: fit-content;
    border-radius: 5px;
    background-color: transparent;
    padding: 0 10px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;

    :hover {
        background-color: #f7f5f7;
    }
`;

export const Label = styled.span`
    white-space: nowrap;
    color: darkgrey;
    font-size: 12px;
    font-weight: 400;
    margin-left: 5px;
`;

export const InputField = styled.input`
    width: 100%;
    height: 24px;
    padding: 0 0 20px 100px;
    outline: none;
    text-align: end;
    border: none;
    font-weight: 800;
    font-size: 14px;
`;

export const HelperText = styled.span`
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #cc7e81;
    font-size: 12px;
    font-weight: 400;
`;
