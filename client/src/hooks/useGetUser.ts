import { useQuery } from '@apollo/client';
import { GET_USER } from '../gql/user.queries';
import { GUser } from '../types/User';
import { ApolloFetchPolicy } from '../types/Apollo';

const useGetUser = (): { data: GUser; loading: boolean } => {
  const { data, loading } = useQuery(GET_USER, {
    pollInterval: 5000,
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
  });

  return { data: data?.GetUser, loading };
};

export default useGetUser;
