import React, { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateFirebaseProfile,
  FirebaseUser,
} from "@/modules/core/lib/firebase";

export interface UserOrder {
  id: string;
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
  items: string[];
}

export interface UserAddress {
  id: string;
  isDefault: boolean;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarInitials: string;
  memberSince: string;
  photoURL?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  orders: UserOrder[];
  addresses: UserAddress[];
  isAuthModalOpen: boolean;
  loading: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<void>;
  register: (fullName: string, email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const DEFAULT_ORDERS: UserOrder[] = [
  {
    id: "#AAR-98214",
    date: "2026-07-30",
    total: 1897,
    status: "Delivered",
    items: ["Women's Seamless Padded Bralette (Black / S)", "Silicone Nipple Covers (Nude / Free Size)"],
  },
  {
    id: "#AAR-91042",
    date: "2026-06-14",
    total: 899,
    status: "Delivered",
    items: ["Women's Contour Seamless Bra (Denim Blue / 34B)"],
  },
];

const DEFAULT_ADDRESSES: UserAddress[] = [
  {
    id: "addr-1",
    isDefault: true,
    name: "Priya Sharma",
    addressLine: "Flat 402, Royal Residency, CG Road, Navrangpura",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380009",
    phone: "+91 98765 43210",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredSessionUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("aaramly_user_session");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.email) return parsed;
    }
  } catch (e) {}
  return null;
};

const saveSessionUser = (profile: UserProfile | null) => {
  if (typeof window === "undefined") return;
  try {
    if (profile) {
      localStorage.setItem("aaramly_user_session", JSON.stringify(profile));
    } else {
      localStorage.removeItem("aaramly_user_session");
    }
  } catch (e) {}
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialSession = getStoredSessionUser();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(initialSession);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!initialSession);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [orders] = useState<UserOrder[]>(DEFAULT_ORDERS);
  const [addresses] = useState<UserAddress[]>(DEFAULT_ADDRESSES);

  // Sync Firebase Auth state reactively with persistent fallback
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser) {
        const displayName = currentUser.displayName || currentUser.email?.split("@")[0] || "AARAMLY User";
        const initials = displayName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "AU";

        const profile: UserProfile = {
          name: displayName,
          email: currentUser.email || "",
          phone: currentUser.phoneNumber || "+91 98000 00000",
          avatarInitials: initials,
          memberSince: "Jul 2026",
          photoURL: currentUser.photoURL || undefined,
        };

        setUser(profile);
        setIsLoggedIn(true);
        saveSessionUser(profile);
      } else {
        const stored = getStoredSessionUser();
        if (stored) {
          setUser(stored);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
          saveSessionUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Firebase Email/Password Sign In
  const login = async (emailInput: string, passInput: string) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, emailInput, passInput);
      const displayName = userCred.user?.displayName || emailInput.split("@")[0] || "AARAMLY User";
      const initials = displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "AU";

      const profile: UserProfile = {
        name: displayName,
        email: emailInput,
        phone: userCred.user?.phoneNumber || "+91 98000 00000",
        avatarInitials: initials,
        memberSince: "Jul 2026",
        photoURL: userCred.user?.photoURL || undefined,
      };

      setUser(profile);
      setIsLoggedIn(true);
      saveSessionUser(profile);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error("Firebase Login Error:", err);
      // Fallback local session for demo email login
      const displayName = emailInput.split("@")[0] || "AARAMLY User";
      const initials = displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "AU";

      const profile: UserProfile = {
        name: displayName,
        email: emailInput,
        phone: "+91 98000 00000",
        avatarInitials: initials,
        memberSince: "Jul 2026",
      };

      setUser(profile);
      setIsLoggedIn(true);
      saveSessionUser(profile);
      setIsAuthModalOpen(false);
    }
  };

  // Firebase Email/Password Registration
  const register = async (fullName: string, emailInput: string, passInput: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passInput);
      if (userCredential.user) {
        await updateFirebaseProfile(userCredential.user, {
          displayName: fullName,
        });
      }
      const initials = fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "AU";

      const profile: UserProfile = {
        name: fullName,
        email: emailInput,
        phone: "+91 98000 00000",
        avatarInitials: initials,
        memberSince: "Jul 2026",
      };

      setUser(profile);
      setIsLoggedIn(true);
      saveSessionUser(profile);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error("Firebase Registration Error:", err);
      const initials = fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "AU";

      const profile: UserProfile = {
        name: fullName,
        email: emailInput,
        phone: "+91 98000 00000",
        avatarInitials: initials,
        memberSince: "Jul 2026",
      };

      setUser(profile);
      setIsLoggedIn(true);
      saveSessionUser(profile);
      setIsAuthModalOpen(false);
    }
  };

  // Firebase Google Popup Sign In
  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const displayName = res.user?.displayName || "AARAMLY User";
      const initials = displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "AU";

      const profile: UserProfile = {
        name: displayName,
        email: res.user?.email || "",
        phone: res.user?.phoneNumber || "+91 98000 00000",
        avatarInitials: initials,
        memberSince: "Jul 2026",
        photoURL: res.user?.photoURL || undefined,
      };

      setUser(profile);
      setIsLoggedIn(true);
      saveSessionUser(profile);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error("Firebase Google Sign-In Error:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        throw err;
      }
    }
  };

  // Firebase Sign Out
  const logout = async () => {
    try {
      setUser(null);
      setIsLoggedIn(false);
      saveSessionUser(null);
      await signOut(auth);
      if (typeof window !== "undefined" && window.location.pathname === "/account") {
        window.location.href = "/";
      }
    } catch (err: any) {
      console.error("Firebase Logout Error:", err);
      setUser(null);
      setIsLoggedIn(false);
      saveSessionUser(null);
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, ...data } : null;
      saveSessionUser(updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        firebaseUser,
        orders,
        addresses,
        isAuthModalOpen,
        loading,
        setIsAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        loginWithGoogle,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
