// This script initializes the Firebase database with sample products only
// Run this script after setting up your Firebase project, updating .env.local,
// and manually creating an admin user in the Firebase console

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} = require("firebase/firestore");
require("dotenv").config({ path: ".env.local" });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add sample products
async function addSampleProducts() {
  try {
    const productsRef = collection(db, "products");

    // Sample product 1
    await addDoc(productsRef, {
      nameZh: "青铜器",
      nameEn: "Bronze Vessel",
      meaningZh:
        "青铜器是中国古代文明的重要象征，代表着权力、地位和精湛的工艺。",
      meaningEn:
        "Bronze vessels are important symbols of ancient Chinese civilization, representing power, status, and exquisite craftsmanship.",
      price: 1299.99,
      amazonLink: "https://www.amazon.com/example-bronze-vessel",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Sample product 2
    await addDoc(productsRef, {
      nameZh: "瓷器花瓶",
      nameEn: "Porcelain Vase",
      meaningZh: "瓷器花瓶象征着纯洁和优雅，在中国传统文化中被视为吉祥物。",
      meaningEn:
        "Porcelain vases symbolize purity and elegance, considered auspicious objects in traditional Chinese culture.",
      price: 899.99,
      amazonLink: "https://www.amazon.com/example-porcelain-vase",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Sample product 3
    await addDoc(productsRef, {
      nameZh: "玉佩",
      nameEn: "Jade Pendant",
      meaningZh: "玉佩代表着美德和保护，被认为能带来好运和驱邪。",
      meaningEn:
        "Jade pendants represent virtue and protection, believed to bring good fortune and ward off evil spirits.",
      price: 599.99,
      amazonLink: "https://www.amazon.com/example-jade-pendant",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("Sample products added successfully");
  } catch (error) {
    console.error("Error adding sample products: ", error);
    throw error;
  }
}

// Main function
async function main() {
  try {
    // Add sample products
    await addSampleProducts();

    console.log("Firebase products initialization completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Firebase products initialization failed:", error);
    process.exit(1);
  }
}

// Run the main function
main();
