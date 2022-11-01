import styled from 'styled-components';

export const DefaultText = styled.span<{ size?: number }>`
  font-size: ${({ size }) => (size ? size : 14)}px;
  font-family: 'Comfortaa', sans-serif;
`;
