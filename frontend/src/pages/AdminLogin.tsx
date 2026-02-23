import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  BarChart3,
  Settings
} from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  };

  const features = [
    { icon: Users, title: 'User Management', desc: 'Manage all users efficiently' },
    { icon: Building2, title: 'Resource Control', desc: 'Oversee all campus resources' },
    { icon: BarChart3, title: 'Analytics', desc: 'Real-time insights & reports' },
    { icon: Settings, title: 'System Config', desc: 'Configure system settings' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient">
        <motion.div
          className="floating-shape floating-shape-1"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="floating-shape floating-shape-2"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          className="floating-shape floating-shape-3"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side - Branding */}
        <motion.div className="hidden lg:block space-y-8" variants={itemVariants}>
          <div className="space-y-6">
            <motion.div 
              className="inline-flex items-center gap-3 card p-4 rounded-2xl card-shine"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">Admin Portal</span>
                <p className="text-sm text-[var(--text-muted)]">Campus Resource Pro</p>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl font-black leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Powerful Admin
              <span className="gradient-text block">Control Center</span>
            </motion.h1>
            
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Access the comprehensive admin dashboard to manage users, resources, 
              and bookings with advanced analytics and real-time monitoring.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="card p-4 rounded-xl card-hover"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                    <feature.icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div 
          className="card rounded-3xl p-8 lg:p-10 shadow-2xl"
          variants={itemVariants}
          style={{ borderColor: 'rgba(99, 102, 241, 0.1)' }}
        >
          {/* Mobile Branding */}
          <motion.div 
            className="lg:hidden text-center mb-8"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold gradient-text">Admin Portal</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Campus Resource Pro
            </p>
          </motion.div>

          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-500">Secure Access</span>
            </motion.div>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Welcome Back, Admin
            </h3>
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
              Sign in to access your dashboard
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Mail className="w-4 h-4" />
                Admin Email
              </label>
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.01 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-base"
                  placeholder="admin@institution.edu"
                  autoComplete="email"
                  style={{
                    borderColor: focusedField === 'email' ? 'var(--color-primary)' : undefined,
                    boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(99, 102, 241, 0.1)' : undefined
                  }}
                />
                <Mail 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                  style={{ 
                    color: focusedField === 'email' ? 'var(--color-primary)' : 'var(--text-muted)'
                  }}
                />
              </motion.div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Lock className="w-4 h-4" />
                Password
              </label>
              <motion.div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-4 rounded-xl text-base"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    borderColor: focusedField === 'password' ? 'var(--color-primary)' : undefined,
                    boxShadow: focusedField === 'password' ? '0 0 0 4px rgba(99, 102, 241, 0.1)' : undefined
                  }}
                />
                <Lock 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                  style={{ 
                    color: focusedField === 'password' ? 'var(--color-primary)' : 'var(--text-muted)'
                  }}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  ) : (
                    <Eye className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span 
                  className="text-sm group-hover:text-indigo-600 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Remember me
                </span>
              </label>
              <motion.button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                whileHover={{ x: 2 }}
              >
                Forgot password?
              </motion.button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-14 flex items-center justify-center gap-3 text-lg font-bold relative overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Access Admin Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Security Notice */}
          <motion.div 
            className="mt-8 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
            variants={itemVariants}
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-indigo-700">Secure Admin Access</p>
                <p className="text-xs text-indigo-600 mt-1">
                  This area is restricted to authorized administrators only. 
                  All activities are monitored and logged.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-6 pt-6 border-t"
            style={{ borderColor: 'var(--border-secondary)' }}
            variants={itemVariants}
          >
            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              Need help? Contact{' '}
              <a href="#" className="text-indigo-600 hover:underline font-medium">
                IT Support
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
