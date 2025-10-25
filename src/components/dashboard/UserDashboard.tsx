// import { useState, useEffect } from 'react';
// import { ArrowLeftRight, Wallet, ShoppingCart, Store, LogOut, User } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { supabase } from '../../lib/supabase';
// import { Wallet as WalletType } from '../../types';
// import { BuyerDashboard } from './BuyerDashboard';
// import { SellerDashboard } from './SellerDashboard';
// import { ProfilePage } from '../profile/ProfilePage';

// export const UserDashboard = () => {
//   const { user, profile, signOut } = useAuth();
//   const [mode, setMode] = useState<'buyer' | 'seller'>('buyer');
//   const [showProfile, setShowProfile] = useState(false);
//   const [wallet, setWallet] = useState<WalletType | null>(null);

//   useEffect(() => {
//     if (user) {
//       loadWallet();
//     }
//   }, [user]);

//   const loadWallet = async () => {
//     const { data } = await supabase
//       .from('wallets')
//       .select('*')
//       .eq('user_id', user?.id)
//       .maybeSingle();

//     setWallet(data);
//   };

//   const handleSignOut = async () => {
//     await signOut();
//   };

//   if (showProfile) {
//     return <ProfilePage onBack={() => setShowProfile(false)} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">HMOS Dashboard</h1>
//               <p className="text-sm text-gray-600">Welcome, {profile?.full_name}</p>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowProfile(true)}
//                 className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <User size={20} />
//                 <span>Profile</span>
//               </button>

//               <div className="bg-gray-100 rounded-lg p-4">
//                 <div className="flex items-center space-x-2 mb-1">
//                   <Wallet size={16} className="text-gray-600" />
//                   <span className="text-xs font-medium text-gray-600">Wallet</span>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-sm">
//                   <div>
//                     <div className="text-xs text-gray-500">Available</div>
//                     <div className="font-bold text-green-600">
//                       ${wallet?.available_balance.toFixed(2) || '0.00'}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-500">Pending</div>
//                     <div className="font-bold text-yellow-600">
//                       ${wallet?.pending_balance.toFixed(2) || '0.00'}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-500">Freezed</div>
//                     <div className="font-bold text-red-600">
//                       ${wallet?.freezed_balance.toFixed(2) || '0.00'}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSignOut}
//                 className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <LogOut size={20} />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           </div>

//           <div className="mt-4 flex items-center justify-center">
//             <div className="bg-gray-100 rounded-lg p-1 flex items-center space-x-2">
//               <button
//                 onClick={() => setMode('buyer')}
//                 className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition ${
//                   mode === 'buyer'
//                     ? 'bg-blue-600 text-white'
//                     : 'text-gray-700 hover:bg-white'
//                 }`}
//               >
//                 <ShoppingCart size={20} />
//                 <span>Buyer Mode</span>
//               </button>
//               <ArrowLeftRight size={20} className="text-gray-400" />
//               <button
//                 onClick={() => setMode('seller')}
//                 className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition ${
//                   mode === 'seller'
//                     ? 'bg-blue-600 text-white'
//                     : 'text-gray-700 hover:bg-white'
//                 }`}
//               >
//                 <Store size={20} />
//                 <span>Seller Mode</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {mode === 'buyer' ? <BuyerDashboard /> : <SellerDashboard />}
//       </main>
//     </div>
//   );
// };




import { useState, useEffect } from 'react';
import { ArrowLeftRight, Wallet, ShoppingCart, Store, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Wallet as WalletType } from '../../types';
import { BuyerDashboard } from './BuyerDashboard';
import { SellerDashboard } from './SellerDashboard';
import { ProfilePage } from '../profile/ProfilePage';
import './UserDashboard.css'; // Import the new CSS file

export const UserDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [mode, setMode] = useState<'buyer' | 'seller'>('buyer');
  const [showProfile, setShowProfile] = useState(false);
  const [wallet, setWallet] = useState<WalletType | null>(null);

  useEffect(() => {
    if (user) {
      loadWallet();
    }
  }, [user]);

  const loadWallet = async () => {
    const { data } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    setWallet(data);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (showProfile) {
    return <ProfilePage onBack={() => setShowProfile(false)} />;
  }

  return (
    <div className="user-dashboard-container">
      <header className="user-dashboard-header">
        <div className="header-content">
          <div className="brand">
            <h1>HMOS Dashboard</h1>
            <p>Welcome, {profile?.full_name}</p>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setShowProfile(true)}
              className="action-button"
            >
              <User size={18} />
              <span>Profile</span>
            </button>
            <div className="wallet-info">
              <div className="wallet-item">
                <div className="label">Available</div>
                <div className="value available">${wallet?.available_balance.toFixed(2) || '0.00'}</div>
              </div>
              <div className="wallet-item">
                <div className="label">Pending</div>
                <div className="value pending">${wallet?.pending_balance.toFixed(2) || '0.00'}</div>
              </div>
              <div className="wallet-item">
                <div className="label">Freezed</div>
                <div className="value freezed">${wallet?.freezed_balance.toFixed(2) || '0.00'}</div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="action-button"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mode-switch">
        <button
          onClick={() => setMode('buyer')}
          className={`mode-button ${mode === 'buyer' ? 'active' : ''}`}
        >
          <ShoppingCart size={18} />
          <span>Buyer Mode</span>
        </button>
        <ArrowLeftRight size={18} className="text-gray-400" />
        <button
          onClick={() => setMode('seller')}
          className={`mode-button ${mode === 'seller' ? 'active' : ''}`}
        >
          <Store size={18} />
          <span>Seller Mode</span>
        </button>
      </div>

      <main className="content">
        <div>{mode === 'buyer' ? <BuyerDashboard /> : <SellerDashboard />}</div>
      </main>
    </div>
  );
};