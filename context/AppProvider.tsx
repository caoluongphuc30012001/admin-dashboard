import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IAppContext } from 'types/AppProvider';
import { ResponseType, UserType } from 'types/typing';

type AppContextProps = {
    children: React.ReactNode;
};

const initialContext: IAppContext = {
    user: undefined,
    setUser: () => {},
};

export const AppContext = React.createContext<IAppContext>(initialContext);

export default function AppProvider({ children }: AppContextProps) {
    const route = useRouter();
    const [user, setUser] = useState<UserType>();
    const value: IAppContext = {
        user: user,
        setUser: setUser,
    };

    useEffect(() => {
        if (!user) {
            let userId = window.sessionStorage.getItem('userId');
            userId = !userId ? window.localStorage.getItem('userId') : userId;
            if (!userId) {
                route.push('/login', '/login');
            } else {
                axios
                    .post(process.env.BACK_END_URL + '/user/get-detail-user', {
                        userId: userId,
                    })
                    .then((respone) => {
                        const res: ResponseType = respone.data;
                        if (res.code === 115) {
                            route.push('/login', '/login');
                        } else {
                            setUser(res.data.user);
                        }
                    });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <AppContext.Provider value={{ ...value }}>
            {children}
        </AppContext.Provider>
    );
}
