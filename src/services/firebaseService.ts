import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { MOCK_DRIVERS, RESIDENTIAL_USERS, MOCK_ORDERS, MOCK_REVIEWS } from '../data/mockData';
import { StootaDriver, ServiceOrder, UserProfile, Review } from '../types';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID from config if available
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Seed Initial Data if database is empty
export async function seedInitialDataIfEmpty() {
  try {
    const driversSnapshot = await getDocs(collection(db, 'drivers'));
    if (driversSnapshot.empty) {
      console.log('⚡ Initializing Firestore Database with Iraqi Karrada Stoota Dataset...');
      const batch = writeBatch(db);

      // 1. Seed Drivers
      MOCK_DRIVERS.forEach((driver) => {
        const driverRef = doc(db, 'drivers', driver.id);
        batch.set(driverRef, driver);
      });

      // 2. Seed Users
      RESIDENTIAL_USERS.forEach((user) => {
        const userRef = doc(db, 'users', user.id);
        batch.set(userRef, user);
      });

      // 3. Seed Orders
      MOCK_ORDERS.forEach((order) => {
        const orderRef = doc(db, 'orders', order.id);
        batch.set(orderRef, order);
      });

      // 4. Seed Reviews
      MOCK_REVIEWS.forEach((rev) => {
        const revRef = doc(db, 'reviews', rev.id);
        batch.set(revRef, rev);
      });

      await batch.commit();
      console.log('✅ Firestore Database successfully seeded!');
    }
  } catch (error) {
    console.error('Error seeding initial Firestore data:', error);
  }
}

// -------------------------------------------------------------
// Realtime Firestore Subscriptions & Operations
// -------------------------------------------------------------

// 1. Realtime Drivers Listener
export function subscribeToDrivers(callback: (drivers: StootaDriver[]) => void) {
  const driversCol = collection(db, 'drivers');
  return onSnapshot(
    driversCol, 
    (snapshot) => {
      if (snapshot.empty) {
        // Fallback to mock data if empty
        callback(MOCK_DRIVERS);
        return;
      }
      const drivers: StootaDriver[] = [];
      snapshot.forEach((doc) => {
        drivers.push(doc.data() as StootaDriver);
      });
      callback(drivers);
    },
    (error) => {
      console.error('Error listening to drivers:', error);
      callback(MOCK_DRIVERS);
    }
  );
}

// Update driver online status & location
export async function updateDriverStatusInDb(driverId: string, isOnline: boolean, location?: { lat: number; lng: number; addressAr?: string }) {
  try {
    const driverRef = doc(db, 'drivers', driverId);
    const updateData: any = { isOnline, lastActive: isOnline ? 'الآن' : 'منذ قليل' };
    if (location) {
      updateData.location = location;
    }
    await updateDoc(driverRef, updateData);
  } catch (error) {
    console.error('Error updating driver status:', error);
  }
}

// Update driver prices
export async function updateDriverPricesInDb(driverId: string, prices: any[]) {
  try {
    const driverRef = doc(db, 'drivers', driverId);
    await updateDoc(driverRef, { prices });
  } catch (error) {
    console.error('Error updating driver prices:', error);
  }
}

// Update driver facebook URL
export async function updateDriverFacebookInDb(driverId: string, facebookUrl: string) {
  try {
    const driverRef = doc(db, 'drivers', driverId);
    await updateDoc(driverRef, { facebookUrl });
  } catch (error) {
    console.error('Error updating driver facebook:', error);
  }
}

// 2. Realtime Orders Listener
export function subscribeToOrders(callback: (orders: ServiceOrder[]) => void) {
  const ordersCol = collection(db, 'orders');
  return onSnapshot(
    ordersCol,
    (snapshot) => {
      if (snapshot.empty) {
        callback(MOCK_ORDERS);
        return;
      }
      const orders: ServiceOrder[] = [];
      snapshot.forEach((doc) => {
        orders.push(doc.data() as ServiceOrder);
      });
      // Sort newest first
      callback(orders);
    },
    (error) => {
      console.error('Error listening to orders:', error);
      callback(MOCK_ORDERS);
    }
  );
}

// Create new Order
export async function createOrderInDb(order: ServiceOrder) {
  try {
    const orderRef = doc(db, 'orders', order.id);
    await setDoc(orderRef, order);
  } catch (error) {
    console.error('Error creating order in Firestore:', error);
  }
}

// Update Order Status (Approve / Reject / Complete)
export async function updateOrderStatusInDb(
  orderId: string, 
  status: 'pending' | 'approved' | 'rejected' | 'completed',
  extra?: { etaMinutes?: number; driverNote?: string }
) {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const updateData: any = { status };
    if (extra?.etaMinutes !== undefined) updateData.etaMinutes = extra.etaMinutes;
    if (extra?.driverNote !== undefined) updateData.driverNote = extra.driverNote;
    await updateDoc(orderRef, updateData);
  } catch (error) {
    console.error('Error updating order status in Firestore:', error);
  }
}

// 3. Realtime Reviews Listener
export function subscribeToReviews(callback: (reviews: Review[]) => void) {
  const reviewsCol = collection(db, 'reviews');
  return onSnapshot(
    reviewsCol,
    (snapshot) => {
      if (snapshot.empty) {
        callback(MOCK_REVIEWS);
        return;
      }
      const revs: Review[] = [];
      snapshot.forEach((doc) => {
        revs.push(doc.data() as Review);
      });
      callback(revs);
    },
    (error) => {
      console.error('Error listening to reviews:', error);
      callback(MOCK_REVIEWS);
    }
  );
}

// Add Review
export async function addReviewInDb(review: Review) {
  try {
    const revRef = doc(db, 'reviews', review.id);
    await setDoc(revRef, review);
  } catch (error) {
    console.error('Error adding review in Firestore:', error);
  }
}
