import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';

interface BookmarkletCardProps {
  title: string;
  description: string;
  code: string;
  icon: React.ReactNode;
  colorClass: string;
}

const BookmarkletCard: React.FC<BookmarkletCardProps> = ({ title, description, code, icon, colorClass }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${colorClass} bg-opacity-20`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-400 text-sm">{description}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-4 relative group">
        <code className="text-xs text-slate-300 font-mono break-all line-clamp-3">
          {code}
        </code>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full font-semibold hover:bg-slate-200 transition-colors"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Kopyalandı!' : 'Kodu Kopyala'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-sm text-slate-400">
        <Info size={16} className="mt-0.5 shrink-0" />
        <p>Tarayıcınızın yer imleri çubuğuna sağ tıklayın, "Sayfa Ekle" deyin ve URL kısmına bu kodu yapıştırın.</p>
      </div>
    </div>
  );
};

export default BookmarkletCard;