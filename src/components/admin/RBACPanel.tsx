import React, { useState } from 'react';
import { Users, ShieldCheck, Lock, Check } from 'lucide-react';

interface UserRole {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'STAFF';
  status: 'Active' | 'Suspended';
}

export const RBACPanel: React.FC = () => {
  const [users, setUsers] = useState<UserRole[]>([
    { id: 'u-1', name: 'Rich Nana Owner', email: 'richnanabeautystudio@gmail.com', role: 'OWNER', status: 'Active' },
    { id: 'u-2', name: 'Studio Manager', email: 'manager@richnana.co.id', role: 'SUPER_ADMIN', status: 'Active' },
    { id: 'u-3', name: 'Front Desk Staff', email: 'booking@richnana.co.id', role: 'STAFF', status: 'Active' }
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#421620] pb-6">
        <div>
          <h2 className="font-editorial text-3xl text-[#F3EFEA]">User Management & Granular RBAC</h2>
          <p className="text-[#F3EFEA]/70 text-xs">Role-based access control enforcing secure authorization at database level.</p>
        </div>
      </div>

      <div className="bg-[#220A10] border border-[#421620] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#16070B] text-[#C5A059] uppercase tracking-wider border-b border-[#421620]">
            <tr>
              <th className="p-4">User Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Permissions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#421620]">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-[#16070B]/40">
                <td className="p-4 font-semibold text-[#F3EFEA] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C5A059]" />
                  <span>{u.name}</span>
                </td>
                <td className="p-4 text-[#F3EFEA]/70">{u.email}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 font-semibold">
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-green-400">{u.status}</td>
                <td className="p-4 text-right">
                  <span className="text-[#C5A059] uppercase tracking-widest text-[10px]">
                    {u.role === 'OWNER' ? 'Full 100% Control' : 'Granular Restricted'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
