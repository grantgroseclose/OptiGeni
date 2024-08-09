import { create, createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { RegisterService, LoginService } from "../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExistingUserData } from "../types/ExistingUserData";




interface AuthStore {
    token: string;
    isAuth: boolean;
    login: (data: ExistingUserData) => void;
    logout: () => void;
}


export const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            token: "",
            isAuth: false,
            login: async (data) => {
                try {
                    const res = await LoginService.post(data);

                    if (typeof res === 'string') {
                        set((state) => ({ 
                            token: res,
                            isAuth: !!res
                        }));
                    } else {
                        throw new Error('Unexpected response type');
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            logout: () => set((state) => ({ token: "", isAuth: false }))
        }),
        { name: 'auth-store', storage: createJSONStorage(() => AsyncStorage) }
    )
);

