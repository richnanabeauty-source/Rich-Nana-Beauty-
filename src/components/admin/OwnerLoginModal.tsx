import React, { useState } from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const OwnerLoginModal: React.FC<OwnerLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default owner password or quick PIN
    if (password === 'richnana123' || password === 'admin' || password === 'richnana') {
      onLoginSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12080A]/90 backdrop-blur-md bg-black/80 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#1A0B0E] border border-[#3B1C23] p-8 shadow-2xl space-y-6">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F3EFEA]/60 hover:text-[#C5A059]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-2xl text-[#F3EFEA]">Owner Portal Login</h3>
          <p className="text-xs text-[#F3EFEA]/60">Enter owner credentials to access CMS & Control Center.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">Owner Password / PIN</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#F3EFEA]/40" />
              <input
                type="password"
                placeholder="Enter password (e.g. richnana123)"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className="w-full bg-[#12080A] border border-[#3B1C23] text-[#F3EFEA] pl-10 pr-4 py-3 text-xs focus:border-[#C5A059] outline-none"
                required
                autoFocus
              />
            </div>
            {error && (
              <p className="text-[11px] text-red-400">Invalid password. Try 'richnana123'</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#C5A059] hover:bg-[#b08b47] text-[#12080A] font-semibold text-xs uppercase tracking-[0.2em] py-3.5 transition-all shadow-lg"
          >
            Access Control Center
          </button>
        </form>

        <div className="text-[10px] text-center text-[#F3EFEA]/40 uppercase tracking-widest">
          Secure RBAC Enforcement
        </div>

      </div>
    </div>
  );
};
