import { useState, useEffect } from 'react';
import { Wallet, ShoppingCart, Store, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Wallet as WalletType } from '../../types';
import { BuyerDashboard } from './BuyerDashboard';
import { SellerDashboard } from './SellerDashboard';
import { EnhancedProfilePage } from '../profile/EnhancedProfilePage';
import { NotificationBell } from '../notifications/NotificationBell';
import { ChatWindow } from '../chat/ChatWindow';
import './EnhancedUserDashboard.css';

export const EnhancedUserDashboard = () => {
  const { profile, signOut } = useAuth();
  const [mode, setMode] = useState<'buyer' | 'seller'>('buyer');
  const [showProfile, setShowProfile] = useState(false);
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatOtherParty, setChatOtherParty] = useState('');

  useEffect(() => {
    if (profile) {
      loadWallet();
    }
  }, [profile]);

  const loadWallet = async () => {
    const { data } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', profile?.id)
      .maybeSingle();

    setWallet(data);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const openChat = (conversationId: string, otherPartyName: string) => {
    setActiveChatId(conversationId);
    setChatOtherParty(otherPartyName);
  };

  if (showProfile) {
    return <EnhancedProfilePage onBack={() => setShowProfile(false)} />;
  }

  return (
    <div className="enhanced-user-dashboard">
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-left">
            <h1>HMOS Platform</h1>
            <p>Welcome, {profile?.full_name}</p>
          </div>

          <div className="header-right">
            <NotificationBell />

            <button className="header-button" onClick={() => setShowProfile(true)}>
              <User size={20} />
              <span>Profile</span>
            </button>

            <div className="wallet-display">
              <div className="wallet-header">
                <Wallet size={16} />
                <span>Wallet</span>
              </div>
              <div className="wallet-balances">
                <div className="balance-item">
                  <div className="balance-label">Available</div>
                  <div className="balance-value available">
                    ${wallet?.available_balance.toFixed(2) || '0.00'}
                  </div>
                </div>
                <div className="balance-item">
                  <div className="balance-label">Pending</div>
                  <div className="balance-value pending">
                    ${wallet?.pending_balance.toFixed(2) || '0.00'}
                  </div>
                </div>
                <div className="balance-item">
                  <div className="balance-label">Frozen</div>
                  <div className="balance-value frozen">
                    ${wallet?.freezed_balance.toFixed(2) || '0.00'}
                  </div>
                </div>
              </div>
            </div>

            <button className="header-button" onClick={handleSignOut}>
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="mode-switcher">
          <button
            onClick={() => setMode('buyer')}
            className={`mode-button ${mode === 'buyer' ? 'active' : ''}`}
          >
            <ShoppingCart size={20} />
            <span>Buyer Mode</span>
          </button>
          <button
            onClick={() => setMode('seller')}
            className={`mode-button ${mode === 'seller' ? 'active' : ''}`}
          >
            <Store size={20} />
            <span>Seller Mode</span>
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {mode === 'buyer' ? <BuyerDashboard /> : <SellerDashboard />}
      </main>

      {activeChatId && (
        <ChatWindow
          conversationId={activeChatId}
          otherPartyName={chatOtherParty}
          onClose={() => setActiveChatId(null)}
        />
      )}
    </div>
  );
};
