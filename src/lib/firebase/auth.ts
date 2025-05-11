import { auth, db } from "./config";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Initialize reCAPTCHA verifier
let recaptchaVerifier: RecaptchaVerifier | null = null;

// Initialize reCAPTCHA verifier
export const initRecaptchaVerifier = (containerId: string) => {
  if (typeof window !== "undefined") {
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "normal",
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
      },
    });
  }
  return recaptchaVerifier;
};

// Check if phone number is in admin whitelist
export const isAdminPhoneNumber = async (phoneNumber: string) => {
  try {
    const adminRef = collection(db, "admins");
    const q = query(adminRef, where("phoneNumber", "==", phoneNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Send verification code
export const sendVerificationCode = async (phoneNumber: string) => {
  try {
    if (!recaptchaVerifier) {
      throw new Error("reCAPTCHA verifier not initialized");
    }

    // Check if phone number is in admin whitelist
    const isAdmin = await isAdminPhoneNumber(phoneNumber);
    if (!isAdmin) {
      throw new Error("Unauthorized phone number");
    }

    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier
    );
    return verificationId;
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw error;
  }
};

// Verify code and sign in
export const verifyCodeAndSignIn = async (
  verificationId: string,
  verificationCode: string
) => {
  try {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error) {
    console.error("Error verifying code:", error);
    throw error;
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Check if user is admin
export const checkAdminRole = async (uid: string) => {
  try {
    const adminDoc = await getDoc(doc(db, "admins", uid));
    return adminDoc.exists();
  } catch (error) {
    console.error("Error checking admin role:", error);
    return false;
  }
};
