import { User } from '@/declarations/backend/backend.did'
import { create } from 'zustand'

type StoreType = {
    user: User;
    setUser: (user: User) => void;
}

const useUser = create<StoreType>((set) => ({
    user: {
        access: [],
        address: "",
        balance: 0n,
        connections: [],
        createdAt: "",
        czid: "",
        dob: "",
        documents: [],
        dp: [],
        email: [],
        fullName: "",
        gender: "",
        id: "",
        isVerified: false,
        lastLogin: [],
        maritalStatus: "",
        nid: "",
        pan: [],
        passwordHash: "",
        phoneNumber: [],
        properties: [],
        role: "",
        transactions: [],
        verificationDate: []
    },
    setUser: (userData) => set({ user: userData }),
}));

export default useUser;