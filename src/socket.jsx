import { createContext, useContext, useMemo } from 'react';
import io from 'socket.io-client';
const url = import.meta.env.VITE_BACKEND_URL;

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext)

const SocketProvider = ({children}) => {

    const socket = useMemo(()=> io(`${url}`,{withCredentials:true}),[])
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
export { getSocket, SocketProvider };

