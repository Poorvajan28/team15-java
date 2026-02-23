import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Shield,
  BarChart3,
  HelpCircle
} from 'lucide-react';

const AdminLayout = () => {
  const { user, userProfile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Resources', href: '/admin/resources', icon: Building2 },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const sidebarVariants = {
    open: { width: 256, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
    closed: { width: 80, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } }
  };

  const mobileMenuVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
    exit: { x: '-100%', transition: { type: 'spring' as const, stiffness: 300, damping: 30 } }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <motion.aside
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-50 sidebar"
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b" style={{ borderColor: 'var(--border-secondary)' }}>
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="font-bold gradient-text">Admin Panel</span>
              </motion.div>
            )}
          </Link>
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`sidebar-item ${isActive ? 'active' : ''} ${!sidebarOpen ? 'justify-center' : ''}`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--border-secondary)' }}>
          <div className={`flex items-center ${sidebarOpen ? 'gap-3' : 'justify-center'}`}>
            <div className="avatar">
              {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'A'}
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                  {userProfile?.full_name || 'Admin'}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                  {user?.email}
                </p>
              </motion.div>
            )}
          </div>
          {sidebarOpen && (
            <motion.button
              onClick={handleSignOut}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </motion.button>
          )}
        </div>
      </motion.aside>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            className="fixed left-0 top-0 h-full w-64 z-50 lg:hidden flex flex-col"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ background: 'var(--bg-secondary)' }}
          >
            {/* Mobile Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b" style={{ borderColor: 'var(--border-secondary)' }}>
              <Link to="/admin/dashboard" className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold gradient-text">Admin Panel</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 py-4 px-3 overflow-y-auto">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`sidebar-item ${isActive ? 'active' : ''}`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile User Section */}
            <div className="p-4 border-t" style={{ borderColor: 'var(--border-secondary)' }}>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {userProfile?.full_name || 'Admin'}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div 
        className="flex-1 flex flex-col"
        style={{ 
          marginLeft: sidebarOpen ? '256px' : '80px',
          transition: 'margin-left 0.3s ease'
        }}
      >
        {/* Header */}
        <header className="h-16 header flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <Search className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none w-64"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <motion.button
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Help */}
            <motion.button
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="avatar avatar-sm">
                  {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'A'}
                </div>
                <span className="hidden md:block font-medium" style={{ color: 'var(--text-primary)' }}>
                  {userProfile?.full_name || 'Admin'}
                </span>
                <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Link to="/admin/settings" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleSignOut();
                      }}
                      className="dropdown-item w-full text-red-500"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
