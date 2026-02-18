import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0a] overflow-hidden relative">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="glass rounded-3xl p-8 w-full max-w-md animate-fade-in relative z-10 border border-white/5 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl mb-4 border border-white/10 group card-hover">
            <Sparkles className="w-10 h-10 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Campus Stitch Pro</h1>
          <p className="text-dark-400">Resource Management System</p>
        </div>

        <div className="flex p-1 bg-dark-800/50 rounded-xl mb-8 border border-white/5">
          <button
            onClick={() => { setIsSignUp(false); setError(null); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${!isSignUp ? 'bg-primary-500 text-white shadow-lg' : 'text-dark-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(null); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isSignUp ? 'bg-primary-500 text-white shadow-lg' : 'text-dark-400 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 flex items-start gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-400 text-sm">{error}</p>
              {(error.includes('already registered') || error.includes('already exist')) && (
                <button
                  onClick={() => { setIsSignUp(false); setError(null); }}
                  className="text-primary-400 text-xs font-bold hover:underline mt-1"
                >
                  Switch to Sign In
                </button>
              )}
            </div>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/50 flex items-center gap-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 text-sm">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-300 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-dark-800/50 border-white/5 focus:border-primary-500/50"
              placeholder="you@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-300 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-dark-800/50 border-white/5 focus:border-primary-500/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary h-12 flex items-center justify-center gap-2 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : isSignUp ? (
              <>
                <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Create Account</span>
              </>
            ) : (
              <>
                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-dark-500 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
