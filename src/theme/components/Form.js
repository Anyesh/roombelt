import styled from "styled-components";

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${props => (props.error ? "red" : "rgba(0, 40, 100, 0.12)")};
  border-radius: 3px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: visible;
  margin: 0;
  box-sizing: border-box;
`;
