import React, { useState, useEffect } from 'react';
import { StootaDriver, ServiceOrder, Review, UserProfile, PriceItem } from './types';
import { MOCK_DRIVERS, MOCK_REVIEWS, MOCK_ORDERS, RESIDENTIAL_USERS } from './data/mockData';
import { 
  seedInitialDataIfEmpty, 
  subscribeToDrivers, 
  subscribeToOrders, 
  subscribeToReviews,
  updateDriverStatusInDb,
  updateDriverPricesInDb,
  updateDriverFacebookInDb,
  createOrderInDb,
  updateOrderStatusInDb,
  addReviewInDb
} from './services/firebaseService';
import { Header } from './components/Header';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { CustomerMapView } from './components/CustomerMapView';
import { OrdersListView } from './components/OrdersListView';
import { OrderDetailView } from './components/OrderDetailView';
import { CustomerProfileView } from './components/CustomerProfileView';
import { DriverWorkflowView } from './components/DriverWorkflowView';
import { AuthScreen } from './components/AuthScreen';
import { MobileContainer } from './components/MobileContainer';
import { FlutterCodeExplorer } from './components/FlutterCodeExplorer';
import { StootaDetailModal } from './components/StootaDetailModal';
import { NewOrderModal } from './components/NewOrderModal';
import { ReviewModal } from './components/ReviewModal';
import { ApkBuildModal } from './components/ApkBuildModal';
import { useGeolocation } from './utils/useGeolocation';
import { anchorDriversAroundLocation } from './utils/geoUtils';

export default function App() {
  const [activeTopTab, setActiveTopTab] = useState<'demo' | 'flutter'>('demo');
  const [mobileTab, setMobileTab] = useState<'map' | 'orders' | 'profile'>('map');
  const [darkMode, setDarkMode] = useState(false);

  // Active Role and User State
  const [residentialUsers, setResidentialUsers] = useState<UserProfile[]>(RESIDENTIAL_USERS);
  const [currentCustomer, setCurrentCustomer] = useState<UserProfile | null>(RESIDENTIAL_USERS[0]);
  const [currentDriver, setCurrentDriver] = useState<StootaDriver | null>(null);
  const [activeRole, setActiveRole] = useState<'customer' | 'driver' | 'unselected'>('customer');

  // Registration Auth Screen State
  const [authRoleMode, setAuthRoleMode] = useState<'customer' | 'driver' | null>(null);

  // Dedicated Selected Order Detail View
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<ServiceOrder | null>(null);

  // Real GPS Geolocation
  const { userLocation, setUserLocation, requestGpsLocation, hasRealGps } = useGeolocation();

  // App Data State (Synced in Realtime with Firestore)
  const [drivers, setDrivers] = useState<StootaDriver[]>(MOCK_DRIVERS);
  const [orders, setOrders] = useState<ServiceOrder[]>(MOCK_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);

  // Initialize and Sync with Firebase Firestore
  useEffect(() => {
    // 1. Seed initial data to Firestore if database is fresh
    seedInitialDataIfEmpty();

    // 2. Realtime subscription to Drivers collection
    const unsubscribeDrivers = subscribeToDrivers((firestoreDrivers) => {
      if (firestoreDrivers && firestoreDrivers.length > 0) {
        setDrivers(firestoreDrivers);
      }
    });

    // 3. Realtime subscription to Orders collection
    const unsubscribeOrders = subscribeToOrders((firestoreOrders) => {
      if (firestoreOrders) {
        setOrders(firestoreOrders);
      }
    });

    // 4. Realtime subscription to Reviews collection
    const unsubscribeReviews = subscribeToReviews((firestoreReviews) => {
      if (firestoreReviews) {
        setReviews(firestoreReviews);
      }
    });

    return () => {
      unsubscribeDrivers();
      unsubscribeOrders();
      unsubscribeReviews();
    };
  }, []);

  // Modals state
  const [selectedDriverForDetail, setSelectedDriverForDetail] = useState<StootaDriver | null>(null);
  const [orderModalDriver, setOrderModalDriver] = useState<StootaDriver | null>(null);
  const [isOrderDirect, setIsOrderDirect] = useState(true);
  const [reviewModalOrder, setReviewModalOrder] = useState<ServiceOrder | null>(null);
  const [showApkModal, setShowApkModal] = useState(false);

  // Keep currentDriver and currentCustomer in sync with realtime updates
  useEffect(() => {
    if (currentDriver) {
      const updated = drivers.find((d) => d.id === currentDriver.id);
      if (updated) setCurrentDriver(updated);
    }
  }, [drivers, currentDriver]);

  // Keep customer location in sync with active GPS / chosen location
  useEffect(() => {
    if (userLocation) {
      setCurrentCustomer((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          location: userLocation,
        };
      });
    }
  }, [userLocation]);

  // Dynamically position/anchor active neighborhood drivers around the customer's real location
  const displayedDrivers = React.useMemo(() => {
    return anchorDriversAroundLocation(drivers, userLocation);
  }, [drivers, userLocation]);

  // --- Handlers for Role Gateway ---
  const handleSelectCustomer = (user: UserProfile) => {
    setCurrentCustomer(user);
    setCurrentDriver(null);
    setActiveRole('customer');
    setMobileTab('map');
    setSelectedOrderDetail(null);
  };

  const handleSelectDriver = (driver: StootaDriver) => {
    setCurrentDriver(driver);
    setCurrentCustomer(null);
    setActiveRole('driver');
    setMobileTab('profile');
    setSelectedOrderDetail(null);
  };

  const handleSignOut = () => {
    setActiveRole('unselected');
    setCurrentCustomer(null);
    setCurrentDriver(null);
    setSelectedOrderDetail(null);
    setAuthRoleMode(null);
  };

  // --- Handlers for Registration ---
  const handleSuccessAuth = (profile: UserProfile) => {
    setAuthRoleMode(null);
    if (profile.role === 'driver') {
      const newDriver: StootaDriver = {
        id: profile.id,
        driverName: profile.name,
        phone: profile.phone,
        facebookUrl: profile.facebookUrl,
        category: profile.category || 'RO_WATER',
        areaName: profile.areaName || 'بغداد - الكرادة',
        workingHours: profile.workingHours || '08:00 ص - 08:00 م',
        isOnline: true,
        location: profile.location || { lat: 33.3050, lng: 44.4250, addressAr: profile.areaName },
        rating: 5.0,
        reviewCount: 1,
        prices: profile.prices || [
          { id: 'p_new', itemName: 'خدمة عامة', priceIqd: 5000, unit: 'خدمة' }
        ],
        lastActive: 'الآن',
      };
      setDrivers((prev) => [newDriver, ...prev]);
      setCurrentDriver(newDriver);
      setActiveRole('driver');
    } else {
      setResidentialUsers((prev) => [profile, ...prev]);
      setCurrentCustomer(profile);
      setActiveRole('customer');
      setMobileTab('map');
    }
  };

  // --- Driver Actions (Synchronized with Firestore) ---
  const handleToggleDriverOnline = (isOnline: boolean) => {
    if (!currentDriver) return;
    setCurrentDriver({ ...currentDriver, isOnline });
    setDrivers((prev) =>
      prev.map((d) => (d.id === currentDriver.id ? { ...d, isOnline } : d))
    );
    updateDriverStatusInDb(currentDriver.id, isOnline);
  };

  const handleApproveOrder = (orderId: string, etaMinutes: number, note: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'approved',
              etaMinutes,
              driverNote: note,
            }
          : ord
      )
    );
    updateOrderStatusInDb(orderId, 'approved', { etaMinutes, driverNote: note });
  };

  const handleRejectOrder = (orderId: string, note: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'rejected',
              driverNote: note,
            }
          : ord
      )
    );
    updateOrderStatusInDb(orderId, 'rejected', { driverNote: note });
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: 'completed' } : ord
      )
    );
    updateOrderStatusInDb(orderId, 'completed');
  };

  const handleUpdateDriverPrices = (updatedPrices: PriceItem[]) => {
    if (!currentDriver) return;
    setCurrentDriver({ ...currentDriver, prices: updatedPrices });
    setDrivers((prev) =>
      prev.map((d) => (d.id === currentDriver.id ? { ...d, prices: updatedPrices } : d))
    );
    updateDriverPricesInDb(currentDriver.id, updatedPrices);
  };

  const handleUpdateDriverFacebook = (facebookUrl: string) => {
    if (!currentDriver) return;
    setCurrentDriver({ ...currentDriver, facebookUrl });
    setDrivers((prev) =>
      prev.map((d) => (d.id === currentDriver.id ? { ...d, facebookUrl } : d))
    );
    updateDriverFacebookInDb(currentDriver.id, facebookUrl);
  };

  // --- Customer Actions (Synchronized with Firestore) ---
  const handleOrderSubmit = (newOrder: ServiceOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setMobileTab('orders');
    setSelectedOrderDetail(newOrder); // Directly open the new detailed order page
    createOrderInDb(newOrder);
  };

  const handleReviewSubmit = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    setOrders((prev) =>
      prev.map((ord) => (ord.stootaId === newReview.stootaId ? { ...ord, hasBeenReviewed: true } : ord))
    );
    if (selectedOrderDetail && selectedOrderDetail.stootaId === newReview.stootaId) {
      setSelectedOrderDetail({ ...selectedOrderDetail, hasBeenReviewed: true });
    }
    addReviewInDb(newReview);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      } transition-colors font-sans dir-rtl selection:bg-amber-500 selection:text-white`}
      dir="rtl"
    >
      {/* Top Header */}
      <Header
        activeTab={activeTopTab}
        setActiveTab={setActiveTopTab}
        userRole={activeRole === 'driver' ? 'driver' : 'customer'}
        setUserRole={(role) => {
          if (role === 'driver') {
            handleSelectDriver(drivers[0]);
          } else {
            handleSelectCustomer(residentialUsers[0]);
          }
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenApkModal={() => setShowApkModal(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-2 sm:py-4">
        {activeTopTab === 'flutter' ? (
          <FlutterCodeExplorer />
        ) : (
          <MobileContainer
            activeTab={mobileTab}
            setActiveTab={(tab) => {
              setSelectedOrderDetail(null);
              setMobileTab(tab);
            }}
            orderCount={orders.length}
            isDriver={activeRole === 'driver'}
          >
            {/* 1. If role is unselected, show Onboarding Role Gateway */}
            {activeRole === 'unselected' ? (
              authRoleMode ? (
                <AuthScreen
                  initialRole={authRoleMode}
                  currentGpsLocation={userLocation}
                  onSuccessAuth={handleSuccessAuth}
                  onCancel={() => setAuthRoleMode(null)}
                />
              ) : (
                <RoleSelectionScreen
                  residentialUsers={residentialUsers}
                  stootaDrivers={drivers}
                  onSelectCustomer={handleSelectCustomer}
                  onSelectDriver={handleSelectDriver}
                  onOpenRegisterCustomer={() => setAuthRoleMode('customer')}
                  onOpenRegisterDriver={() => setAuthRoleMode('driver')}
                />
              )
            ) : activeRole === 'driver' && currentDriver ? (
              /* 2. If Driver Role: Dedicated Stoota Driver Workflow View */
              <DriverWorkflowView
                driverProfile={currentDriver}
                orders={orders}
                onToggleOnline={handleToggleDriverOnline}
                onApproveOrder={handleApproveOrder}
                onRejectOrder={handleRejectOrder}
                onCompleteOrder={handleCompleteOrder}
                onUpdatePrices={handleUpdateDriverPrices}
                onUpdateFacebook={handleUpdateDriverFacebook}
                onSignOut={handleSignOut}
              />
            ) : (
              /* 3. If Customer Role: Customer Experience */
              currentCustomer && (
                <>
                  {/* Screen A: Customer Map View */}
                  {mobileTab === 'map' && (
                    <CustomerMapView
                      drivers={displayedDrivers}
                      currentUser={currentCustomer}
                      onOpenDetailModal={(driver) => setSelectedDriverForDetail(driver)}
                      onDirectOrder={(driver) => {
                        setOrderModalDriver(driver);
                        setIsOrderDirect(true);
                      }}
                      onRequestGpsLocation={requestGpsLocation}
                      onUpdateLocation={(newLoc) => {
                        setCurrentCustomer({
                          ...currentCustomer,
                          location: newLoc,
                        });
                        setUserLocation(newLoc);
                      }}
                      hasRealGps={hasRealGps}
                    />
                  )}

                  {/* Screen B: Orders Summary List OR Dedicated Detail Page */}
                  {mobileTab === 'orders' && (
                    selectedOrderDetail ? (
                      <OrderDetailView
                        order={selectedOrderDetail}
                        onBack={() => setSelectedOrderDetail(null)}
                        onOpenReview={(order) => setReviewModalOrder(order)}
                      />
                    ) : (
                      <OrdersListView
                        orders={orders}
                        onSelectOrder={(order) => setSelectedOrderDetail(order)}
                        onGoToMap={() => setMobileTab('map')}
                      />
                    )
                  )}

                  {/* Screen C: Customer Profile (Strictly Customer-only) */}
                  {mobileTab === 'profile' && (
                    <CustomerProfileView
                      customer={currentCustomer}
                      ordersCount={orders.length}
                      onUpdateProfile={(updated) => setCurrentCustomer(updated)}
                      onSignOut={handleSignOut}
                      onGoToOrders={() => setMobileTab('orders')}
                    />
                  )}
                </>
              )
            )}
          </MobileContainer>
        )}
      </main>

      {/* Modals */}
      <StootaDetailModal
        driver={selectedDriverForDetail}
        reviews={reviews}
        onClose={() => setSelectedDriverForDetail(null)}
        onDirectOrder={(driver) => {
          setSelectedDriverForDetail(null);
          setOrderModalDriver(driver);
          setIsOrderDirect(true);
        }}
        onIndirectOrder={(driver) => {
          setSelectedDriverForDetail(null);
          setOrderModalDriver(driver);
          setIsOrderDirect(false);
        }}
      />

      <NewOrderModal
        driver={orderModalDriver}
        currentUser={currentCustomer || undefined}
        isDirect={isOrderDirect}
        onClose={() => setOrderModalDriver(null)}
        onSubmitOrder={handleOrderSubmit}
      />

      <ReviewModal
        order={reviewModalOrder}
        onClose={() => setReviewModalOrder(null)}
        onSubmitReview={handleReviewSubmit}
      />

      <ApkBuildModal
        isOpen={showApkModal}
        onClose={() => setShowApkModal(false)}
      />

      {/* High Density Architecture Footer */}
      <footer className="h-8 bg-slate-900 text-slate-300 border-t border-slate-800 px-4 flex items-center justify-between text-[11px] font-mono shrink-0 z-30 select-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>
            الدور الحالي: {activeRole === 'driver' ? 'صاحب ستوتة (مقدم خدمة)' : activeRole === 'customer' ? `زبون (${currentCustomer?.name})` : 'اختيار الدور'}
          </span>
        </div>
        <span className="text-amber-400 font-bold">Stoota Clean Architecture v3.3</span>
      </footer>

    </div>
  );
}
