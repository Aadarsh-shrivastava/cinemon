import firestore from '@react-native-firebase/firestore';

// Function to add or update a user's profile in Firestore
export const addUserProfile = async (
  userId: string,
  userData: any,
): Promise<void> => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .set(
        {
          ...userData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error adding/updating user profile:', error);
    throw error;
  }
};

// Function to get user profile data
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    return userDoc.exists ? userDoc.data() : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
