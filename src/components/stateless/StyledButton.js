import styled from "styled-components";

const StyledButton = styled.button`
  color: white;
  background-color: black;
  transition: ease 0.5s;
  border-radius: 9px;
  padding: 0.5rem;
  border: 2px solid black;

  &:disabled {
    color: white;
    background-color: #999999;
    border: 2px solid #999999;
  }

  &:hover:enabled {
    background-color: white;
    color: black;
  }
`;

export default StyledButton;
