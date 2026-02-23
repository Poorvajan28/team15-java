import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Shield, 
  Zap, 
  RefreshCw, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Target,
  Award,
  Bell,
  FileText,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { getDashboardStats } from '../services/api';
import type { DashboardStats } from '../types';

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  const kpiCards = [
    {
      label: 'Total Revenue',
      value: '$24,580',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      label: 'Resource Utilization',
      value: '87%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      label: 'Active Users',
      value: stats?.totalUsers || 0,
      change: '+8.1%',
      trend: 'up',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      label: 'Booking Rate',
      value: '94%',
      change: '-2.3%',
      trend: 'down',
      icon: Award,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10'
    }
  ];

  const statCards = [
    {
      label: 'Total Resources',
      value: stats?.totalResources || 0,
      icon: Building2,
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-500/10 to-purple-500/10'
    },
    {
      label: 'Total Bookings',
      value: stats?.totalBookings || 0,
      icon: Calendar,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10'
    },
    {
      label: 'Pending',
      value: stats?.pendingBookings || 0,
      icon: Clock,
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-500/10 to-amber-500/10'
    },
    {
      label: 'Approved',
      value: stats?.approvedBookings || 0,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      label: 'Rejected',
      value: stats?.rejectedBookings || 0,
      icon: XCircle,
      gradient: 'from-red-500 to-rose-500',
      bgGradient: 'from-red-500/10 to-rose-500/10'
    }
  ];

  const recentActivity = [
    { action: 'New booking request', resource: 'Conference Room A', time: '2 min ago', type: 'booking' },
    { action: 'Resource approved', resource: 'Lab Equipment B', time: '15 min ago', type: 'approved' },
    { action: 'New user registered', resource: 'John Smith', time: '1 hour ago', type: 'user' },
    { action: 'Booking cancelled', resource: 'Event Hall C', time: '2 hours ago', type: 'cancelled' },
    { action: 'Resource maintenance', resource: 'Projector Room', time: '3 hours ago', type: 'maintenance' }
  ];

  const upcomingBookings = [
    { resource: 'Main Auditorium', date: 'Today, 2:00 PM', user: 'Engineering Dept', status: 'confirmed' },
    { resource: 'Computer Lab 1', date: 'Tomorrow, 9:00 AM', user: 'CS Department', status: 'pending' },
    { resource: 'Sports Complex', date: 'Feb 25, 4:00 PM', user: 'Sports Club', status: 'confirmed' },
    { resource: 'Seminar Hall B', date: 'Feb 26, 10:00 AM', user: 'Management', status: 'pending' }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="card rounded-2xl p-6"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <motion.h1 
              className="text-3xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="gradient-text">Admin Dashboard</span>
            </motion.h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              Welcome back! Here's what's happening with your campus resources.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              className="btn-ghost flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Bell className="w-5 h-5" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </motion.button>
            <motion.button
              className="btn-ghost flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <motion.div
            key={kpi.label}
            className="card rounded-2xl p-6 card-hover relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  {kpi.label}
                </p>
                <p className="text-3xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
                  {kpi.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.change}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.bgGradient}`}>
                <kpi.icon className={`w-6 h-6 bg-gradient-to-r ${kpi.gradient} text-white rounded-lg p-0.5`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <motion.div
            key={stat.label}
            className="card rounded-2xl p-5 card-hover"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient} mb-3`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} text-white rounded-lg p-0.5`} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Overview */}
        <motion.div 
          className="lg:col-span-2 card rounded-2xl p-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Analytics Overview
            </h2>
            <select 
              className="px-3 py-2 rounded-lg text-sm"
              style={{ 
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-secondary)'
              }}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bookings by Status */}
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
                Bookings by Status
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="var(--bg-secondary)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="url(#gradient1)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(stats?.approvedBookings || 0) / (stats?.totalBookings || 1) * 251} 251`}
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      {stats?.totalBookings || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span style={{ color: 'var(--text-muted)' }}>Approved</span>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {stats?.approvedBookings || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span style={{ color: 'var(--text-muted)' }}>Pending</span>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {stats?.pendingBookings || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span style={{ color: 'var(--text-muted)' }}>Rejected</span>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {stats?.rejectedBookings || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Resource Usage */}
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
                Resource Usage
              </h3>
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-indigo-500 opacity-50" />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>Classrooms</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {Math.floor((stats?.totalResources || 0) * 0.4)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>Labs</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {Math.floor((stats?.totalResources || 0) * 0.3)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>Event Halls</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {Math.floor((stats?.totalResources || 0) * 0.2)}
                  </span>
                </div>
              </div>
            </div>

            {/* User Activity */}
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
                User Activity
              </h3>
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-emerald-500 opacity-50" />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>Active Users</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {stats?.totalUsers || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>New This Week</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {Math.floor((stats?.totalUsers || 0) * 0.1)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>Growth Rate</span>
                  <span className="font-medium text-green-500">+12%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="card rounded-2xl p-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Recent Activity
            </h2>
            <motion.button
              className="text-sm text-indigo-600 font-medium flex items-center gap-1"
              whileHover={{ x: 2 }}
            >
              View All <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                whileHover={{ x: 4 }}
              >
                <div className={`p-2 rounded-lg ${
                  activity.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'approved' ? 'bg-green-100 text-green-600' :
                  activity.type === 'user' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'cancelled' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {activity.type === 'booking' ? <Calendar className="w-4 h-4" /> :
                   activity.type === 'approved' ? <CheckCircle className="w-4 h-4" /> :
                   activity.type === 'user' ? <Users className="w-4 h-4" /> :
                   activity.type === 'cancelled' ? <XCircle className="w-4 h-4" /> :
                   <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {activity.action}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {activity.resource}
                  </p>
                </div>
                <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <motion.div 
          className="card rounded-2xl p-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Upcoming Bookings
            </h2>
            <motion.button
              className="text-sm text-indigo-600 font-medium flex items-center gap-1"
              whileHover={{ x: 2 }}
            >
              Manage <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Resource
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    User
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.map((booking, idx) => (
                  <motion.tr
                    key={idx}
                    className="border-b"
                    style={{ borderColor: 'var(--border-secondary)' }}
                    whileHover={{ background: 'var(--bg-tertiary)' }}
                  >
                    <td className="py-3">
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {booking.resource}
                      </span>
                    </td>
                    <td className="py-3">
                      <span style={{ color: 'var(--text-secondary)' }}>{booking.date}</span>
                    </td>
                    <td className="py-3">
                      <span style={{ color: 'var(--text-secondary)' }}>{booking.user}</span>
                    </td>
                    <td className="py-3">
                      <span className={`badge ${
                        booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions & System Status */}
        <motion.div 
          className="space-y-6"
          variants={itemVariants}
        >
          {/* Quick Actions */}
          <div className="card rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: 'Add User', href: '/admin/users/new', color: 'from-blue-500 to-indigo-500' },
                { icon: Building2, label: 'Add Resource', href: '/admin/resources/new', color: 'from-purple-500 to-pink-500' },
                { icon: Calendar, label: 'New Booking', href: '/admin/bookings/new', color: 'from-amber-500 to-orange-500' },
                { icon: FileText, label: 'Reports', href: '/admin/reports', color: 'from-emerald-500 to-teal-500' }
              ].map((action, idx) => (
                <motion.a
                  key={idx}
                  href={action.href}
                  className="flex items-center gap-3 p-4 rounded-xl transition-all group"
                  style={{ background: 'var(--bg-tertiary)' }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {action.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="card rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              System Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span style={{ color: 'var(--text-secondary)' }}>Backend API</span>
                </div>
                <span className="badge badge-success flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span style={{ color: 'var(--text-secondary)' }}>Database</span>
                </div>
                <span className="badge badge-success flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-green-500" />
                  <span style={{ color: 'var(--text-secondary)' }}>Cache</span>
                </div>
                <span className="badge badge-success flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Active
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
