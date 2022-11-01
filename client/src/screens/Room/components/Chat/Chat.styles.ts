import styled from 'styled-components';

export const ChatBlock = styled.div`
  width: 100%;
  max-height: 700px;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column; /* top to bottom */
  justify-content: flex-end;
`;

export const InputBlock = styled.div`
  display: flex;
  justify-content: center;
`;

export const ChatIconBlock = styled.div`
  right: 0;
  display: flex;
  justify-content: flex-end;
  min-width: 301px;
`;

export const ScrollableBlock = styled.div`
  max-height: 500px;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  width: 301px;
  top: 45px;
`;
