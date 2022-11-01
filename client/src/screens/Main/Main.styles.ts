import styled from 'styled-components';
import { colors } from '../../config/colors';
import backgroundImage from '../../assets/city.webp';

export const MainBlock = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100%;
  position: relative;
  overflow: hidden;

  &:before {
    margin: 0;
    padding: 0;
    background-image: url(${backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
    content: '';
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    will-change: transform;
    z-index: -1;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
  padding-bottom: 150px;
`;

export const MainWindow = styled.div<{ isMainPage?: boolean }>`
  ${({ isMainPage }) =>
    isMainPage && 'display: flex;justify-content: center;align-items: center;height: 220px;'}
  flex-direction: column;
  width: 550px;
  background-color: ${colors.black};
  border-radius: 8px;
`;

export const ContentWrapper = styled.div`
  width: 1440px;
  height: 100vh;
`;
