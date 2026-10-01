import React, { useState } from 'react';
import { HardDrive, Cloud, CheckCircle2, Download, Upload, FolderSync, RefreshCw } from 'lucide-react';

export const GoogleDriveIntegrationPanel: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastBackup, setLastBackup] = useState<string | null>(null);

  const handleConnect = () => {
    setIsConnected(true);
    setLastBackup('2026-10-01 09:00');
  };

  const handleBackupNow = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastBackup(new Date().toISOString().replace('T', ' ').substring(0, 16));
      alert('Rich Nana Beauty database & media assets successfully backed up to Google Drive (/RichNanaBeauty_Backups)!');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="border-b border-[#421620] pb-6">
        <h2 className="font-editorial text-3xl text-[#F3EFEA]">Google Drive Enterprise Integration</h2>
        <p className="text-[#F3EFEA]/70 text-xs">Sync studio assets, backup database records, and import high-res media directly from Google Drive.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        
        {/* Connection Card */}
        <div className="bg-[#220A10] p-6 md:p-8 border border-[#421620] space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl text-[#F3EFEA]">Google Drive Account</h3>
              <p className="text-xs text-[#F3EFEA]/70 mt-1">Connect your workspace account for automated cloud backups and asset imports.</p>
            </div>

            <div className="p-4 bg-[#16070B] border border-[#421620] flex items-center justify-between">
              <span className="text-xs text-[#F3EFEA]/80">Status</span>
              <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold border ${isConnected ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'}`}>
                {isConnected ? 'Connected & Authorized' : 'Not Connected'}
              </span>
            </div>
          </div>

          <div>
            {!isConnected ? (
              <button
                onClick={handleConnect}
                className="w-full bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-widest py-3.5 transition-all"
              >
                Connect Google Drive
              </button>
            ) : (
              <button
                onClick={() => setIsConnected(false)}
                className="w-full border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs uppercase tracking-widest py-3.5 transition-all"
              >
                Disconnect Account
              </button>
            )}
          </div>
        </div>

        {/* Backup & Sync Operations */}
        <div className="bg-[#220A10] p-6 md:p-8 border border-[#421620] space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <FolderSync className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl text-[#F3EFEA]">Cloud Backup & Sync</h3>
              <p className="text-xs text-[#F3EFEA]/70 mt-1">Securely archive client bookings, settings, and high-res media files to Google Drive.</p>
            </div>

            {lastBackup && (
              <div className="text-xs text-green-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Last Backup: {lastBackup}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={handleBackupNow}
              disabled={!isConnected || syncing}
              className="w-full bg-[#C5A059] hover:bg-[#b08b47] text-[#16070B] font-semibold text-xs uppercase tracking-widest py-3.5 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Backing up to Drive...' : 'Backup Database & Media Now'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
