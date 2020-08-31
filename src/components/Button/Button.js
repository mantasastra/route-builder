import React from "react";
import styled from "@emotion/styled";

const CustomButton = styled.button`
  margin-top: auto;
  padding: 0.8rem 0.5rem;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.lightGreen};
  outline: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGreen};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Button = ({ handleClick, children }) => (
  <CustomButton onClick={() => handleClick()}>{children}</CustomButton>
);

export default Button;
