import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Logo from "../Logo";
import { Text } from "../../theme";

const User = styled.div`
  display: inline-flex;
  align-items: center;
`;

const UserAvatar = styled.span`
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-size: contain;
  margin-right: 10px;
  grid-area: user-avatar;
  ${props => props.img && `background-image: url(${props.img});`};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = props => (
  <Wrapper>
    <a href="https://roombelt.com" style={{ textDecoration: "none" }}>
      <Logo size={24} withName />
    </a>
    <User>
      <UserAvatar img={props.avatarUrl} />
      <div>
        <Text block small>
          {props.userName}
        </Text>
        <Text block xsmall muted>
          Administrator
        </Text>
      </div>
    </User>
  </Wrapper>
);

const mapStateToProps = state => ({
  avatarUrl: state.user.avatarUrl,
  userName: state.user.displayName
});

export default connect(mapStateToProps)(Header);
