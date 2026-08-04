import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/modules/core/context/AuthContext";
import { Auth1 } from "@/modules/core/components/ui/auth-01";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, loginWithGoogle } = useAuth();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthModalOpen]);

  const handleAuthSubmit = async ({
    email,
    password,
    name,
    mode,
  }: {
    email: string;
    password: string;
    name?: string;
    mode: "login" | "signup";
  }) => {
    if (mode === "signup") {
      await register(name || "Priya Sharma", email, password);
    } else {
      await login(email, password);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans select-none">
          {/* Dark Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsAuthModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-label="Close modal overlay"
          />

          {/* Luxury Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-zinc-100 shadow-2xl shadow-zinc-950/20 overflow-y-auto max-h-[96vh] my-auto no-scrollbar"
          >
            {/* Elegant Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all cursor-pointer active:scale-95"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Auth Form Component */}
            <Auth1
              onSubmit={handleAuthSubmit}
              onGoogleSignIn={loginWithGoogle}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
