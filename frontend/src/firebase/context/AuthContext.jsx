import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase"; // Import Firebase auth

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // This callback is triggered whenever the authentication state changes.
      // It sets the loading state to false and updates the currentUser.
      setLoading(false);
      setCurrentUser(user);
    });

    // Unsubscribe from the observer when the component unmounts.
    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    try {
      // Use try-catch to handle errors during signup
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      return userCredential.user; // Return the user object if signup is successful
    } catch (error) {
      // Handle signup errors here (e.g., display an error message)
      throw error; // Rethrow the error to propagate it to the calling code
    }
  };

  const value = {
    currentUser,
    signup, // Make sure signup is exposed in the context
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : null} {/* Render children when loading is false */}
    </AuthContext.Provider>
  );
};
