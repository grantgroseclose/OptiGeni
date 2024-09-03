import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { useLoginService } from "../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExistingUser } from "../types/data/ExistingUser";
import { z, ZodString } from "zod";




interface AuthStore {
    token: string;
    firstname: string;
    isAuth: boolean;
    error: string;
    login: (data: ExistingUser) => Promise<{ token: string, firstname: string } | { error: string } | void>;
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

                // switch (typeof res) {
                //     case 'object': {
                        if ('error' in res) {
                            set((state) => ({ 
                                token: "",
                                firstname: "",
                                isAuth: !res.error,
                                error: res.error
                            }));

                            return res;
                        } else {
                            set((state) => ({ 
                                token: res.token,
                                firstname: res.firstname,
                                isAuth: !!res.token,
                                error: ""
                            }));
                        }
                //     }
                // }

                return;
            },
            logout: () => { 
                set((state) => ({ token: "", firstname: "", isAuth: false, error: "" }));
            }
        }),
        { name: 'auth-store', storage: createJSONStorage(() => AsyncStorage) }
    )
);

