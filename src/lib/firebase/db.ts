import { db } from "./config";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

// Product type definition
export interface Product {
  id?: string;
  nameZh: string;
  nameEn: string;
  meaningZh: string;
  meaningEn: string;
  price: number;
  amazonLink: string;
  createdAt?: any;
  updatedAt?: any;
}

// Admin type definition
export interface Admin {
  id?: string;
  phoneNumber: string;
  role: "admin" | "superadmin";
  createdAt?: any;
}

// Convert Firestore document to Product
export const productConverter = {
  toFirestore: (product: Product) => {
    return {
      nameZh: product.nameZh,
      nameEn: product.nameEn,
      meaningZh: product.meaningZh,
      meaningEn: product.meaningEn,
      price: product.price,
      amazonLink: product.amazonLink,
      updatedAt: serverTimestamp(),
      ...(product.createdAt ? {} : { createdAt: serverTimestamp() }),
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>): Product => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      nameZh: data.nameZh,
      nameEn: data.nameEn,
      meaningZh: data.meaningZh,
      meaningEn: data.meaningEn,
      price: data.price,
      amazonLink: data.amazonLink,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};

// Convert Firestore document to Admin
export const adminConverter = {
  toFirestore: (admin: Admin) => {
    return {
      phoneNumber: admin.phoneNumber,
      role: admin.role,
      ...(admin.createdAt ? {} : { createdAt: serverTimestamp() }),
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>): Admin => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      phoneNumber: data.phoneNumber,
      role: data.role,
      createdAt: data.createdAt,
    };
  },
};

// Add a new product
export const addProduct = async (product: Product) => {
  try {
    const productsRef = collection(db, "products");
    const docRef = await addDoc(
      productsRef,
      productConverter.toFirestore(product)
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: string, product: Partial<Product>) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      ...product,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string) => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Get a product by ID
export const getProduct = async (id: string) => {
  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error getting all products:", error);
    throw error;
  }
};

// Search products by name or meaning
export const searchProducts = async (
  searchTerm: string,
  language: "zh" | "en"
) => {
  try {
    // Note: Firestore doesn't support native text search
    // This is a simple implementation that checks if the term is contained in the name or meaning
    // For production, consider using a dedicated search service like Algolia
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);

    const nameField = language === "zh" ? "nameZh" : "nameEn";
    const meaningField = language === "zh" ? "meaningZh" : "meaningEn";

    return querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as Product))
      .filter((product) => {
        const name = product[nameField as keyof Product] as string;
        const meaning = product[meaningField as keyof Product] as string;
        const term = searchTerm.toLowerCase();

        return (
          name.toLowerCase().includes(term) ||
          meaning.toLowerCase().includes(term)
        );
      });
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Get random products
export const getRandomProducts = async (count: number = 6) => {
  try {
    // Note: Firestore doesn't support native random queries
    // This is a simple implementation that gets all products and randomly selects some
    // For production with large datasets, consider a different approach
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    // Shuffle array and take the first 'count' items
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error("Error getting random products:", error);
    throw error;
  }
};

// Add a new admin
export const addAdmin = async (admin: Admin) => {
  try {
    const adminsRef = collection(db, "admins");
    const docRef = await addDoc(adminsRef, adminConverter.toFirestore(admin));
    return docRef.id;
  } catch (error) {
    console.error("Error adding admin:", error);
    throw error;
  }
};

// Delete an admin
export const deleteAdmin = async (id: string) => {
  try {
    const adminRef = doc(db, "admins", id);
    await deleteDoc(adminRef);
    return true;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};

// Get all admins
export const getAllAdmins = async () => {
  try {
    const adminsRef = collection(db, "admins");
    const querySnapshot = await getDocs(adminsRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Admin[];
  } catch (error) {
    console.error("Error getting all admins:", error);
    throw error;
  }
};
