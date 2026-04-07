import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Plus,
  MessageSquare,
  ExternalLink,
  LogOut
} from 'lucide-react';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/packages/new', label: 'Add Package', icon: Plus },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold">
            <span className="text-[var(--primary)]">GP</span>
            <span className="text-[var(--dark)]"> TRAVELS</span>
          </span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-gray-700 hover:bg-green-50'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ExternalLink size={18} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors w-full text-left"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
