import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { LoginClientData, useLoginService } from "../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExistingUser } from "../types/data/ExistingUser";
import { z } from "zod";




interface AuthStore {
    token: string;
    firstname: string;
    isAuth: boolean;
    error: string;
    login: (data: ExistingUser) => Promise<z.infer<LoginClientData['response']> | void>;
    logout: () => void;
}


export const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            token: "",
            firstname: "",
            isAuth: false,
            error: "",
            login: async (data: ExistingUser) => {
                const LoginService = useLoginService();
                const res = await LoginService.post(data);

                if ('error' in res) {
                    set((state) => ({ 
                        token: "",
                        firstname: "",
                        isAuth: !res.error,
                        error: res.error
                    }));

                    return res as z.infer<LoginClientData['response']>;
                } else {
                    set((state) => ({ 
                        token: res.token,
                        firstname: res.firstname,
                        isAuth: !!res.token,
                        error: ""
                    }));
                }

                return;
            },
            logout: () => { 
                set((state) => ({ token: "", firstname: "", isAuth: false, error: "" }));
            }
        }),
        { name: 'auth-store', storage: createJSONStorage(() => AsyncStorage) }
    )
);

