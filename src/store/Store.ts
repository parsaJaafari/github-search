import { createContext } from 'react';

// export interface FoundUser {
//   avatar_url: string;
//   bio: string;
//   company: string;
//   node_id: string;
//   name: string;
//   login: string;
// }
export declare type ContextType = {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  foundUser: any;
  setFoundUser: React.Dispatch<React.SetStateAction<object>>;
};
export const Context = createContext<ContextType | null>(null);
