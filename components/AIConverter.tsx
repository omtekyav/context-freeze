import React, { useState } from 'react';
import { Wand2, Loader2, ArrowRightCircle, AlertTriangle } from 'lucide-react';
import { convertTextToContextJson } from '../services/geminiService';

interface AIConverterProps {
  onConversionComplete: (json: string) => void;
}

const AIConverter: React.FC<AIConverterProps> = ({ onConversionComplete }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const jsonResult = await convertTextToContextJson(inputText);
      onConversionComplete(jsonResult);
    } catch (err) {
      setError("Dönüştürme sırasında bir hata oluştu. API anahtarınızı kontrol edin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 h-full justify-center">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Wand2 className="text-purple-400" />
          Akıllı Dönüştürücü
        </h2>
        <p className="text-slate-400">
          Elinizdeki dağınık notları, proje taslaklarını veya eski sohbet dökümlerini yapıştırın.
          Gemini 2.5 Flash bunları standart <strong>Context JSON</strong> formatına dönüştürsün.
        </p>
      </div>

      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Örnek: React ile bir todo uygulaması yapıyorum, bileşenleri ayırdım ama state yönetiminde sorun yaşıyorum. Tailwind kullanıyorum..."
          className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-5 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none shadow-inner"
        />
        <div className="absolute bottom-4 right-4">
           <button
            onClick={handleConvert}
            disabled={isLoading || !inputText.trim()}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all ${
              isLoading || !inputText.trim()
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:scale-105 hover:shadow-purple-500/25'
            }`}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
            {isLoading ? 'İşleniyor...' : 'Dönüştür'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg flex items-center gap-3">
          <AlertTriangle className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {!process.env.API_KEY && (
         <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 p-4 rounded-lg text-sm text-center">
           ⚠️ Bu özelliğin çalışması için <code>API_KEY</code> ortam değişkeni gereklidir.
         </div>
      )}
    </div>
  );
};

export default AIConverter;