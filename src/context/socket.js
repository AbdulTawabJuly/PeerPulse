// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useSelector } from 'react-redux';

const SocketContext = createContext();

function connectToServer() {
    const socket = io('http://localhost:8080'); // Replace with your server URL

    return new Promise((resolve) => {
        socket.on('connect', () => {
            resolve(socket); // Resolve the promise when the socket connects
        });
    });
}

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const userID = localStorage.getItem('socketUserId');
        if (!socket && userID) {
            connectToServer().then((connectedSocket) => {
                setSocket(connectedSocket);
            })
        }

        //   return () => {
        //     if (socket) {
        //       socket.close();
        //     }
        //   };

    }, [socket])

    const initializeSocket = (userId) => {

        if (!localStorage.getItem('socketUserId')) {
            localStorage.setItem('socketUserId', userId);
            connectToServer().then((connectedSocket) => {
                setSocket(connectedSocket);
            })
        }
    };

    const destroySocket = () => {
        if (socket) {
            socket.close();
            setSocket(null);
            localStorage.removeItem('socketUserId');
        }
    };

    const getSocket = () => {
        return socket;
    }

    return (
        <SocketContext.Provider value={{ socket, initializeSocket, destroySocket, getSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    return useContext(SocketContext);
};

export { SocketProvider, useSocket };
