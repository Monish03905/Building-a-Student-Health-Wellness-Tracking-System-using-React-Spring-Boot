
import React, { useState } from 'react';
import { 
  Heart, ShieldAlert, ArrowRight, CheckCircle, 
  User, CalendarDays, Smartphone, Mail, KeyRound 
} from 'lucide-react';
import { UserRole, UserData } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole, data: UserData) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState<'details' | 'otp'>('details'); 
  
  // Form Data
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  
  // OTP Logic
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoOtpHint, setDemoOtpHint] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email) return setError('Please enter a valid email address.');
    if (isRegistering) {
      if (!name) return setError('Please enter your name.');
      if (!age) return setError('Please enter your age.');
      if (!phone) return setError('Please enter your phone number.');
    }

    setDemoOtpHint('');
    setIsLoading(true);

    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomCode);

    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setDemoOtpHint(`DEMO MODE: Your Verification Code is ${randomCode}`); 
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (otp === generatedOtp) {
        onLogin(role, isRegistering ? { name, age, phone, email } : { email });
      } else {
        setError('Incorrect OTP. Please check the code and try again.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-300">
        
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 bg-indigo-100 rounded-full text-indigo-600 mb-4">
            <Heart size={40} className="fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">WellCampus</h1>
          <p className="text-gray-500">
            {isRegistering ? 'Create New Account' : `${role === 'admin' ? 'Administrative' : 'Member'} Login`}
          </p>
        </div>

        {step === 'details' && !isRegistering && (
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => { setRole('student'); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Member
            </button>
            <button 
              onClick={() => { setRole('admin'); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Admin
            </button>
          </div>
        )}

        {step === 'details' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            
            {isRegistering && (
              <div className="space-y-4 animate-in slide-in-from-top-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                   <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                          type="number" 
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="25"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                   </div>
                   <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <div className="w-full px-4 py-3 border border-gray-100 bg-gray-50 text-gray-500 rounded-xl">
                        Member
                      </div>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Verification</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'student' ? "member@example.com" : "admin@university.edu"}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            
            {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded flex items-center gap-2"><ShieldAlert size={14}/> {error}</p>}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? 'Generating OTP...' : 'Send Verification Code'} <ArrowRight size={18} />
            </button>

            {!isLoading && role !== 'admin' && (
              <div className="text-center pt-2">
                <button 
                  type="button"
                  onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
                  className="text-indigo-600 text-sm font-semibold hover:underline"
                >
                  {isRegistering ? "Already have an account? Login" : "New User? Create Account"}
                </button>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in slide-in-from-right-8">
            <div className="text-center mb-4">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                Sent to: {email}
              </span>
            </div>

            {demoOtpHint && (
              <div className="bg-green-100 border border-green-200 text-green-800 p-3 rounded-xl text-center mb-4 flex items-center justify-center gap-2 animate-pulse">
                <CheckCircle size={16} />
                <span className="font-bold text-sm">{demoOtpHint}</span>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter Verification Code</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="X X X X"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 tracking-[0.5em] font-mono text-lg text-center"
                  maxLength={4}
                  autoFocus
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded flex items-center gap-2"><ShieldAlert size={14}/> {error}</p>}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
            
            <button 
              type="button"
              onClick={() => { setStep('details'); setOtp(''); setError(''); setDemoOtpHint(''); }}
              className="w-full text-gray-500 text-sm hover:text-gray-800 py-2"
            >
              ← Change Email / Details
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Secure login with Random OTP Verification.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
