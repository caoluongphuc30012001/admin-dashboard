import { UserType } from './typing';
export interface IAppContext extends UserType {
    user: UserType | undefined;
    // eslint-disable-next-line no-unused-vars
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}