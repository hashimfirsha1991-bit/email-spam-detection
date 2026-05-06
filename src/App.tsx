import { useState } from 'react';
import { Shield, ShieldAlert, Mail, Search } from 'lucide-react';

const SPAM_KEYWORDS = ['win', 'free', 'offer', 'money', 'click here', 'urgent', 'lottery'];

type Result = 'spam' | 'clean' | null;

export default function App() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<Result>(null);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [error, setError] = useState('');

  const checkSpam = () => {
    if (!email.trim()) {
      setError('Please enter some email content before checking.');
      setResult(null);
      setMatchedKeywords([]);
      return;
    }

    setError('');
    const lower = email.toLowerCase();
    const found = SPAM_KEYWORDS.filter((kw) => lower.includes(kw));

    setMatchedKeywords(found);
    setResult(found.length > 0 ? 'spam' : 'clean');
  };

  const reset = () => {
    setEmail('');
    setResult(null);
    setMatchedKeywords([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Spam Detector</h1>
          <p className="text-slate-500 mt-2 text-sm">Paste your email content below to check if it looks like spam</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="p-8">
            {/* Textarea */}
            <div className="mb-5">
              <label htmlFor="email-input" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Content
              </label>
              <textarea
                id="email-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                  if (result) setResult(null);
                }}
                placeholder="Paste or type email content here..."
                rows={8}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {error && (
                <p className="mt-2 text-sm text-amber-600 font-medium flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {error}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={checkSpam}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-2xl transition-colors duration-150 shadow-sm shadow-blue-200"
              >
                <Search className="w-4 h-4" />
                Check Spam
              </button>
              {result !== null && (
                <button
                  onClick={reset}
                  className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium text-sm transition-colors duration-150"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Result Panel */}
          {result !== null && (
            <div
              className={`border-t px-8 py-6 transition-all ${
                result === 'spam'
                  ? 'bg-red-50 border-red-100'
                  : 'bg-emerald-50 border-emerald-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                    result === 'spam' ? 'bg-red-100' : 'bg-emerald-100'
                  }`}
                >
                  {result === 'spam' ? (
                    <ShieldAlert className="w-6 h-6 text-red-600" />
                  ) : (
                    <Shield className="w-6 h-6 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-xl font-bold ${
                      result === 'spam' ? 'text-red-700' : 'text-emerald-700'
                    }`}
                  >
                    {result === 'spam' ? 'Spam Detected' : 'Not Spam'}
                  </div>
                  <p
                    className={`text-sm mt-0.5 ${
                      result === 'spam' ? 'text-red-500' : 'text-emerald-600'
                    }`}
                  >
                    {result === 'spam'
                      ? 'This email contains suspicious keywords commonly found in spam.'
                      : 'No suspicious keywords were found in this email.'}
                  </p>

                  {result === 'spam' && matchedKeywords.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
                        Flagged Keywords
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {matchedKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full border border-red-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Checks for keywords: {SPAM_KEYWORDS.map((k) => `"${k}"`).join(', ')}
        </p>
      </div>
    </div>
  );
}
