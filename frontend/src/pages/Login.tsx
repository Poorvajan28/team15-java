import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogIn, 
  UserPlus, 
  AlertCircle, 
  Shield, 
  Zap, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Globe,
  ChevronRight
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('already exist')) {
            setError('This email is already registered. Please sign in instead.');
          } else {
            setError(error.message);
          }
        } else {
          setMessage('Registration successful! Please check your email to verify your account.');
          setTimeout(() => setIsSignUp(false), 3000);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate('/');
        }
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
        staggerChildren: 0.08,
        delayChildren: 0.1
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
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  };

  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Real-time updates', color: 'from-amber-500 to-orange-500' },
    { icon: Shield, title: 'Secure', desc: 'Enterprise security', color: 'from-emerald-500 to-teal-500' },
    { icon: Lock, title: 'Role-Based', desc: 'Access control', color: 'from-blue-500 to-indigo-500' },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '500+', label: 'Resources' },
    { value: '99.9%', label: 'Uptime' },
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
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
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
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">Campus Resource Pro</span>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Smart Management Platform</p>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl font-black leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Welcome to the Future of
              <span className="gradient-text block">Resource Management</span>
            </motion.h1>
            
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Streamline campus operations with intelligent resource allocation, 
              real-time tracking, and powerful analytics.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="card p-4 rounded-xl card-hover flex items-center gap-4"
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div 
            className="flex gap-8 pt-4"
            variants={itemVariants}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div 
          className="card rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          variants={itemVariants}
          style={{ borderColor: 'rgba(99, 102, 241, 0.1)' }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />

          {/* Mobile Branding */}
          <motion.div 
            className="lg:hidden text-center mb-8 relative"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold gradient-text">Campus Resource Pro</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Smart Management Platform
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <motion.div className="relative mb-8" variants={itemVariants}>
            <div className="tab-list">
              <motion.button
                onClick={() => { setIsSignUp(false); setError(null); setMessage(null); }}
                className={`tab-item flex-1 flex items-center justify-center gap-2 ${!isSignUp ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </motion.button>
              <motion.button
                onClick={() => { setIsSignUp(true); setError(null); setMessage(null); }}
                className={`tab-item flex-1 flex items-center justify-center gap-2 ${isSignUp ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </motion.button>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-500">
                {isSignUp ? 'Create Your Account' : 'Secure Login'}
              </span>
            </motion.div>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {isSignUp ? 'Join Us Today' : 'Welcome Back'}
            </h3>
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
              {isSignUp
                ? 'Start managing campus resources efficiently'
                : 'Sign in to access your dashboard'}
            </p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                  {(error.includes('already registered') || error.includes('already exist')) && (
                    <motion.button
                      onClick={() => { setIsSignUp(false); setError(null); }}
                      className="text-indigo-600 text-xs font-bold hover:underline mt-2 flex items-center gap-1"
                      whileHover={{ x: 2 }}
                    >
                      Switch to Sign In <ChevronRight className="w-3 h-3" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-600 text-sm font-medium">{message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Mail className="w-4 h-4" />
                Email Address
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
                  placeholder="name@company.com"
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
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
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
              {isSignUp && (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Must be at least 6 characters long
                </p>
              )}
            </div>

            {/* Remember Me / Forgot Password */}
            {!isSignUp && (
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
            )}

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
                  <span>Processing...</span>
                </>
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div 
            className="my-6 divider text-sm"
            variants={itemVariants}
          >
            {isSignUp ? 'Already have an account?' : 'New to Campus Resource Pro?'}
          </motion.div>

          {/* Switch Mode Button */}
          <motion.button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
            className="w-full py-3 font-semibold rounded-xl transition-all duration-300 border-2 hover:border-indigo-300 hover:bg-indigo-50"
            style={{ 
              color: 'var(--color-primary)',
              borderColor: 'var(--border-secondary)'
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isSignUp ? 'Sign in to existing account' : 'Create a new account'}
          </motion.button>

          {/* Admin Link */}
          <motion.div 
            className="mt-6 text-center"
            variants={itemVariants}
          >
            <Link 
              to="/admin/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <Shield className="w-4 h-4" />
              Admin Login
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-6 pt-6 border-t"
            style={{ borderColor: 'var(--border-secondary)' }}
            variants={itemVariants}
          >
            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              By continuing, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
