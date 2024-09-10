import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user"
axios.defaults.withCredentials = true;

type User = {
    fullname: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    isVerified: boolean;
}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: SignupInputState) => Promise<void>;
    login: (input: LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    signup: async (input: SignupInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (response.data.success) {
                console.log("Error in Signup")
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            console.log("Error in Signup Catch")

            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    // login: async (input: LoginInputState) => {
    //     try {
    //         set({ loading: true });
    //         const response = await axios.post(`${API_END_POINT}/login`, input, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         if (response.data.success) {
    //             toast.success(response.data.message);
    //             set({ loading: false, user: response.data.user, isAuthenticated: true });
    //         }
    //     } catch (error: any) {
    //         toast.error(error.response.data.message);
    //         set({ loading: false });
    //     }
    // },

    login: async (input: LoginInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ user: response.data.user, isAuthenticated: true });
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred");
            } else if (error.request) {
                toast.error("Network error, please try again later");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            set({ loading: false });
            console.log("Loading state reset to false after login attempt");
        }
    },

    verifyEmail: async (verificationCode: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            toast.success(error.response.data.message);
            set({ loading: false });
        }
    },
    checkAuthentication: async () => {
        try {

            const token = localStorage.getItem('token');
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                })
            if (response.data.success) {
                console.log('Authenticated response:', response.data);

                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({ isAuthenticated: false, isCheckingAuth: false });
            console.log("error in Authenticated")
        }
    },
    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/logout`);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: null, isAuthenticated: false })
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    forgotPassword: async (email: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    resetPassword: async (token: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    updateProfile: async (input: any) => {
        try {
            const response = await axios.put(`${API_END_POINT}/profile/update`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage),
    }
))