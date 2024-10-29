import firestore from '@react-native-firebase/firestore';
import {movie_detail} from 'types';
import auth from '@react-native-firebase/auth';

// Function to add a movie to the user's watchlist
export const addMovieToWatchlist = async (
  userId: string,
  movie: movie_detail,
) => {
  try {
    const userRef = firestore().collection('users').doc(userId);

    await userRef.set(
      {
        watchlist: firestore.FieldValue.arrayUnion(movie),
      },
      {merge: true}, // Merge the new array item into the existing document rather than replacing it
    );

    console.log('Movie added to watchlist successfully');
  } catch (error) {
    console.error('Error adding movie to watchlist:', error);
    throw error;
  }
};

// Function to remove a movie from the user's watchlist
export const removeMovieFromWatchlist = async (
  userId: string,
  movieId: string,
) => {
  try {
    const userRef = firestore().collection('users').doc(userId);

    // Get the user's current watchlist to find the movie object to remove
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    if (userData && userData.watchlist) {
      // Find the movie object in the watchlist based on movieId
      const movieToRemove = userData.watchlist.find(
        (movie: any) => movie.id == movieId,
      );

      // If the movie exists in the watchlist, remove it
      if (movieToRemove) {
        await userRef.update({
          watchlist: firestore.FieldValue.arrayRemove(movieToRemove),
        });

        console.log('Movie removed from watchlist successfully');
      } else {
        console.log('Movie not found in watchlist');
      }
    } else {
      console.log('User document or watchlist does not exist');
    }
  } catch (error) {
    console.error('Error removing movie from watchlist:', error);
    throw error;
  }
};

export const getWatchList = async (userId: string): Promise<any[]> => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    const userId = currentUser.uid;
    const data = await firestore().collection('users').doc(userId).get();
    return data?.data()?.watchlist;
  } else return [];
};

export const isWatchListed = async (
  userId: string,
  movieId: string,
): Promise<boolean> => {
  try {
    const userRef = firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    if (userData && userData.watchlist) {
      const isPresent = userData.watchlist.some(
        (movie: any) => movie.id == movieId,
      );
      console.log('found');
      return isPresent;
    } else {
      console.log('User document or watchlist does not exist');
      return false;
    }
  } catch (error) {
    console.error('Error checking if movie is in watchlist:', error);
    throw error;
  }
};
