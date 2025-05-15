"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { checkAdminRole } from "@/lib/firebase/auth";

export function useAuth(requireAdmin = false) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const adminStatus = await checkAdminRole(currentUser.uid);
          setIsAdmin(adminStatus);

          if (requireAdmin && !adminStatus) {
            // User is logged in but not an admin, redirect to home
            router.push("/");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else if (requireAdmin) {
        // No user and admin required, redirect to login
        router.push("/admin/login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, requireAdmin]);

  return { user, loading, isAdmin };
}
