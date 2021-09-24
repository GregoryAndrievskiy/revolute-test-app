import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    border-radius: 2px;
    background-color: #fff;
    position: relative;
`;

export const StartAdornment = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    max-width: 100px;
`;

export const ChangeButton = styled.button`
`;

export const Label = styled.span`
`;

export const InputField = styled.input`
    width: 100%;
    height: 40px;
    padding: 0 0 20px 100px;
    outline: none;
    text-align: end;
`;

export const HelperText = styled.span`
    position: absolute;
    right: 0;
    bottom: 0;
    height: 20px;
`;
