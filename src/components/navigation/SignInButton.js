import React from "react";
import { GrayBorderButton } from "../common/buttons/GrayBorderButton";
import { Button }from '@mui/material'
import styled from "styled-components";
import { Form } from "react-bootstrap";

const StyledButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  margin-top: 4px;
  min-height: 40px;
  cursor: pointer;
  background-color: #75b6ee;
  color: #000000;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:focus {
    outline: none;
  }
`;


const FormContainer = styled.form`
  max-width: 450px;
  width: 100%;
  margin: 16px auto;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export function SignInButton(props) {
  return (
    <FormContainer>
        <StyledButton fullWidth type="button" onClick={props.requestSignIn}>
        Sign In
        </StyledButton>
    </FormContainer>
  );
  
}
