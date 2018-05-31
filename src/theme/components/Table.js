import styled from "styled-components";

export const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
`;

export const TableRow = styled.tr``;
export const TableHeader = styled.thead``;
export const TableBody = styled.tbody``;

export const TableHeaderColumn = styled.th`
  color: #9aa0ac;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;

  &:first-child {
    padding-left: 1.5rem;
  }

  &:last-child {
    padding-right: 1.5rem;
  }
`;

export const TableRowColumn = styled.td`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 15px;

  &:first-child {
    padding-left: 1.5rem;
  }

  &:last-child {
    padding-right: 1.5rem;
  }
`;
