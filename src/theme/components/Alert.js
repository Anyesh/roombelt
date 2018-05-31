import styled, { css } from "styled-components";

const styles = {
  primary: css`
    color: #24426c;
    background-color: #dae5f5;
    border-color: #cbdbf2;
  `,
  info: css`
    color: #24587e;
    background-color: #daeefc;
    border-color: #cbe7fb;
  `
};

export default styled.div`
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: calc(var(--font-size) * 0.9);

  ${props => props.primary && styles.primary};
  ${props => props.info && styles.info};
`;
