import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useAppApolloClient } from './config/connect';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const Root = () => {
  const client = useAppApolloClient();
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

root.render(<Root />);
