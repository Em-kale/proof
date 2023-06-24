import React from "react";
import { GrayBorderButton } from "../common/buttons/GrayBorderButton";
import { Button }from '@mui/material'

export function SignInButton(props) {
  return (
    <Button variant="contained" color="secondary" onClick={props.requestSignIn}>
      Sign In
    </Button>
  );
}
