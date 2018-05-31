import styled, { css } from "styled-components";

const badgeTypes = {
  success: css`
    background-color: #5eba00;
  `,
  danger: css`
    background-color: #cd201f;
  `,
  info: css`
    background-color: #45aaf2;
  `,
  warning: css`
    background-color: #f1c40f;
  `
};

const Badge = styled.span`
  color: white;
  display: inline-block;
  padding: calc(var(--font-size) * 0.25) calc(var(--font-size) * 0.4);
  font-size: var(--font-size);
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--radius);

  ${props => badgeTypes[Object.keys(badgeTypes).find(typeName => props[typeName]) || "secondary"]};
`;

export default Badge;
