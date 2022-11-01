import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './screens/Main/Main';
import Store from './store/Store';
import { RoomContainer } from './screens/Room/RoomContainer';
import { constants } from './config/constants';
import './config/font.css';

const StyledApp = styled.div`
  margin: 0;
  padding: 0;
`;

export function App() {
  return (
    <Store>
      <StyledApp>
        <Routes>
          <Route path={constants.routes.main} element={<Main />} />
          <Route path={`${constants.routes.room}/:roomId`} element={<RoomContainer />} />
          <Route path="*" element={<Navigate to={constants.routes.main} replace />} />
        </Routes>
      </StyledApp>
    </Store>
  );
}

export default App;
