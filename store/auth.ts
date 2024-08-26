import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { useLoginService } from "../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExistingUser } from "../types/data/ExistingUser";
import { z, ZodString } from "zod";




interface AuthStore {
    token: string;
    isAuth: boolean;
    error: string;
    login: (data: ExistingUser) => Promise<string | { error: string } | void>;
    logout: () => void;
}


export const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            token: "",
            isAuth: false,
            error: "",
            login: async (data) => {
                const LoginService = useLoginService();
                const res = await LoginService.post(data);

                if (typeof res === 'object' && 'error' in res) {
                    set((state) => ({ 
                        token: "",
                        isAuth: !res.error,
                        error: res.error
                    }));

                    return res;
                } else if (typeof res === 'string') {
                    set((state) => ({ 
                        token: res,
                        isAuth: !!res,
                        error: ""
                    }));
                }

                return;
            },
            logout: () => { 
                set((state) => ({ token: "", isAuth: false, error: "" }));
            }
        }),
        { name: 'auth-store', storage: createJSONStorage(() => AsyncStorage) }
    )
);

