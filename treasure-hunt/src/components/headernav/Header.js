import React from "react";
import styled from "styled-components";

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const NavHeader = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  width: 33.333%;
  text-align: left;
`;

const NavCenter = styled.div`
  width: 33.333%;
  text-align: center;
`;

const NavRight = styled.div`
  width: 33.333%;
  text-align: right;
`;

const MenuLink = styled.a``;

function Header() {
  return (
    <Nav>
      <NavHeader>
        <NavLeft>Find the Treasure!</NavLeft>

        <NavCenter>More Nav Buttons</NavCenter>

        <NavRight>
          <MenuLink>North</MenuLink>
          <MenuLink>South</MenuLink>
          <MenuLink>East</MenuLink>
          <MenuLink>West</MenuLink>
        </NavRight>
      </NavHeader>
    </Nav>
  );
}

export default Header;
