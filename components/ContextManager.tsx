import React, { useState, useEffect } from 'react';
import { Clipboard, ArrowRight, Save, Trash2, Terminal, Code2, AlertCircle, Play } from 'lucide-react';
import { ContextData, THAW_PROMPT_PREFIX } from '../types';

interface ContextManagerProps {
  initialData?: string;
  userProfile?: string;
  includeProfile?: boolean;
}

const ContextManager: React.FC<ContextManagerProps> = ({ 
  initialData = '', 
  userProfile = '', 
  includeProfile = false 
}) => {
  const [jsonInput, setJsonInput] = useState(initialData);
  const [parsedData, setParsedData] = useState<ContextData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    setJsonInput(initialData);
  }, [initialData]);

  useEffect(() => {
    if (!jsonInput.trim()) {
      setParsedData(null);
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      setParsedData(parsed);
      setError(null);
    } catch (e) {
      setParsedData(null);
      // Only show error if user has stopped typing for a bit or input is substantial
      if (jsonInput.length > 10) {
        setError("Geçersiz JSON formatı. Lütfen çıktıyı kontrol edin.");
      }
    }
  }, [jsonInput]);

  const copyLoadPrompt = () => {
    if (!jsonInput) return;
    
    let fullPrompt = '';
    // Format the JSON nicely
    const jsonString = JSON.stringify(parsedData || JSON.parse(jsonInput), null, 2);

    if (includeProfile && userProfile) {
      // Use the Full Restore format with Profile
      fullPrompt = `SİSTEM TALİMATI: BAĞLAM YÜKLEME (FULL RESTORE).
Aşağıdaki metin, kullanıcının sabit profili (DNA) ve projenin son teknik durumudur (SNAPSHOT).
Bu bilgileri "System Context" olarak belleğine kazı.

${userProfile}

MEVCUT PROJE DURUMU (JSON):
${jsonString}

TALİMAT:
Yukarıdaki Profil kurallarına %100 sadık kalarak ve Proje Durumundaki teknik noktadan devam ederek çalışmaya başla. Hazırsan sadece "Sistem ve Profil Yüklendi." yaz.`;
    } else {
      // Use the Simple format
      fullPrompt = `${THAW_PROMPT_PREFIX}${jsonString}`;
    }

    navigator.clipboard.writeText(fullPrompt);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Input Section */}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Terminal size={20} className="text-indigo-400" />
            Ham JSON Verisi
          </h2>
          <button 
            onClick={() => setJsonInput('')}
            className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <Trash2 size={14} /> Temizle
          </button>
        </div>
        <textarea
          className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl p-4 font-mono text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder='Gemini"den aldığınız JSON çıktısını buraya yapıştırın...'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        {error && (
          <div className="text-red-400 text-sm flex items-center gap-2 bg-red-900/20 p-3 rounded-lg border border-red-900/50">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>

      {/* Preview Section */}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Code2 size={20} className="text-emerald-400" />
            Bağlam Önizlemesi
          </h2>
          {parsedData && (
             <button
             onClick={copyLoadPrompt}
             className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
               copyFeedback 
               ? 'bg-emerald-500 text-white' 
               : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white'
             }`}
           >
             {copyFeedback ? <span className="flex items-center gap-1"><Save size={14}/> Kopyalandı</span> : <span className="flex items-center gap-1"><Play size={14}/> Yükleme Komutunu Kopyala</span>}
           </button>
          )}
        </div>

        <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6 overflow-y-auto">
          {!parsedData ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
              <Clipboard size={48} className="opacity-20" />
              <p className="text-center max-w-xs">
                Sol tarafa geçerli bir JSON yapıştırdığınızda burada detaylı önizleme göreceksiniz.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">Özet</h3>
                <p className="text-lg text-white font-medium leading-relaxed">
                  {parsedData.summary}
                </p>
              </div>

              {/* Tech Stack */}
              {parsedData.tech_stack && parsedData.tech_stack.length > 0 && (
                <div>
                   <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">Teknoloji Yığını</h3>
                   <div className="flex flex-wrap gap-2">
                     {parsedData.tech_stack.map((tech, idx) => (
                       <span key={idx} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-sm border border-indigo-500/20">
                         {tech}
                       </span>
                     ))}
                   </div>
                </div>
              )}

              {/* Current State & Next Step */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                   <h3 className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-1">Mevcut Durum</h3>
                   <p className="text-slate-300 text-sm">{parsedData.current_state}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                   <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">Sıradaki Adım</h3>
                   <p className="text-slate-300 text-sm flex items-start gap-2">
                     <ArrowRight size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                     {parsedData.next_step || parsedData.next_immediate_step}
                   </p>
                </div>
              </div>

              {/* Last Problem */}
              {parsedData.last_active_problem && (
                <div className="bg-red-900/10 p-4 rounded-lg border border-red-900/30">
                  <h3 className="text-xs uppercase tracking-wider text-red-400 font-bold mb-2 flex items-center gap-2">
                    <AlertCircle size={14} /> Son Aktif Sorun
                  </h3>
                  <p className="text-red-200/80 text-sm font-mono">{parsedData.last_active_problem}</p>
                </div>
              )}
              
               {/* Critical Context */}
               {parsedData.code_context && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">Kod Bağlamı</h3>
                  <pre className="bg-black/30 p-3 rounded text-xs text-slate-400 font-mono overflow-x-auto">
                    {parsedData.code_context}
                  </pre>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContextManager;