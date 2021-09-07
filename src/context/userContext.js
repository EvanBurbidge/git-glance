import { createContext } from 'react';

const UserContext = createContext({ user: null, userDataFetched: false });

export default UserContext;