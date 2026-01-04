import React, { useState } from 'react';
import { Wand2, Loader2, AlertTriangle, Sparkles, Code2, Key } from 'lucide-react';
import { convertTextToContextJson } from '../services/geminiService';

interface AIConverterProps {
  apiKey: string;
  onConversionComplete: (json: string) => void;
  onOpenSettings: () => void;
}

const AIConverter: React.FC<AIConverterProps> = ({ apiKey, onConversionComplete, onOpenSettings }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    if (!apiKey) {
      setError("Dönüştürme işlemi için bir API anahtarı gereklidir. Lütfen ayarlar simgesine tıklayarak anahtarınızı ekleyin.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const jsonResult = await convertTextToContextJson(inputText, apiKey);
      onConversionComplete(jsonResult);
    } catch (err: any) {
      console.error(err);
      setError("Dönüştürme sırasında bir hata oluştu. API anahtarınızın geçerli olduğundan ve internet bağlantınızın olduğundan emin olun.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 h-full justify-center py-10">
      <div className="text-center space-y-4 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles size={12} /> AI Powered
        </div>
        <h2 className="text-4xl font-black text-white tracking-tight">
          Akıllı <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Dönüştürücü</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Dağınık notları, eski sohbetleri veya proje fikirlerini yapıştırın. 
          Gemini 3 Flash ile anında standart <strong>Context JSON</strong> formatına çevirelim.
        </p>
      </div>

      {!apiKey && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in-95">
          <Key className="text-amber-500 w-12 h-12" />
          <div className="space-y-1">
            <h3 className="text-white font-bold text-xl">API Anahtarı Eksik</h3>
            <p className="text-slate-400 max-w-md">
              Bu özelliğin çalışması için kendi Gemini API anahtarınızı kullanmanız gerekir. Anahtarınız tarayıcınızda güvenle saklanır.
            </p>
          </div>
          <button 
            onClick={onOpenSettings}
            className="bg-amber-500 text-slate-950 px-6 py-2 rounded-xl font-bold hover:bg-amber-400 transition-colors"
          >
            Anahtarımı Gir / Ayarlar
          </button>
        </div>
      )}

      <div className={`relative group transition-opacity duration-500 ${!apiKey ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-800/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
            </div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest flex items-center gap-1">
              <Code2 size={10} /> source_input.txt
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={!apiKey}
            placeholder="Örnek: React ile bir todo uygulaması yapıyorum, bileşenleri ayırdım ama state yönetiminde sorun yaşıyorum. Tailwind kullanıyorum..."
            className="w-full h-80 bg-transparent p-6 text-slate-200 focus:outline-none resize-none font-sans leading-relaxed text-lg"
          />
          <div className="absolute bottom-6 right-6">
             <button
              onClick={handleConvert}
              disabled={isLoading || !inputText.trim() || !apiKey}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black shadow-2xl transition-all duration-300 ${
                isLoading || !inputText.trim() || !apiKey
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white hover:scale-105 hover:shadow-purple-500/40 active:scale-95 border border-white/10'
              }`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
              {isLoading ? 'ANALİZ EDİLİYOR...' : 'DÖNÜŞTÜRMEYİ BAŞLAT'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-5 rounded-xl flex items-start gap-4 animate-in slide-in-from-top-2">
          <AlertTriangle className="shrink-0 text-red-500 mt-1" />
          <div className="space-y-1">
            <p className="font-bold">Hata</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-8 mt-4 text-slate-500 text-xs font-medium uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${apiKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
          {apiKey ? 'Gemini 3 Flash Ready' : 'Gemini Key Missing'}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          Zero Log Policy
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          Context Optimization
        </div>
      </div>
    </div>
  );
};

export default AIConverter;