import React, { useCallback } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./UserDropdownMenu.css";
import { Widget, useNear, useAccount } from "near-social-vm";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const StyledDropdown = styled.div`
  > button {
    all: unset;
    display: flex;
    align-items: center;
    border-radius: 2px;
    border-color: #ccc;
    padding: 4px;
    min-width: 175px;
  }
  .d-inline-block {
    width: unset !important;
    height: unset !important;
    img {
      border-radius: 50% !important;
      width: 38px !important;
      height: 38px !important;
    }
  }

  i {
    color: #333;
    margin: 0 5px 0 0;
  }

  .profile-info {
    margin: 0 8px;
    line-height: normal;
    font-size: 1rem;

    .profile-name,
    .profile-username {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .profile-name {
      color: #333;
    }
    .profile-username {
      color: #666;
    }
  }
`;

const UserDropdownMenu = (props) => {
  const near = useNear();
  const account = useAccount();
  const history = useHistory();

  const withdrawStorage = useCallback(async () => {
    await near.contract.storage_withdraw({}, undefined, "1");
  }, [near]);

  return (
    <StyledDropdown>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Widget
            src={props.widgets.profileImage}
            props={{
              accountId: account.accountId,
              className: "d-inline-block",
            }}
          />
          <div className="profile-info">
            <div className="profile-name">
              <Widget src={props.widgets.profileName} />
            </div>
            <div className="profile-username">{account.accountId}</div>
          </div>
          <i className="ph ph-caret-down"></i>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal className="hello-there">
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Item
              className="DropdownMenuItem"
              onClick={() =>
                history.push(
                  `/${props.widgets?.profilePage}?accountId=${account.accountId}`
                )
              }
            >
              <i className="ph-duotone ph-user"></i>
              Profile
            </DropdownMenu.Item>
            {/* <DropdownMenu.Item
              className="DropdownMenuItem"
              onClick={() => withdrawStorage()}
            >
              <i className="ph-duotone ph-bank"></i>
              Withdraw {props.availableStorage.div(1000).toFixed(2)}kb
            </DropdownMenu.Item> */}
            <DropdownMenu.Item
              className="DropdownMenuItem"
              onClick={() => props.logOut()}
            >
              <i className="ph-duotone ph-sign-out"></i>
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </StyledDropdown>
  );
};

export default UserDropdownMenu;
