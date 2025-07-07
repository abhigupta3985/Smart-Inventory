// Custom hook for authentication
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { setUser } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();
          
          dispatch(setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: userData?.role || 'viewer',
            displayName: userData?.displayName || firebaseUser.email.split('@')[0]
          }));
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: 'viewer',
            displayName: firebaseUser.email.split('@')[0]
          }));
        }
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error
  };
};