import React, { useState, useMemo } from 'react';
import { Bookmark, LayoutDashboard, BrainCircuit, Box, Github, UserCog, ChevronDown, ChevronUp } from 'lucide-react';
import BookmarkletCard from './components/BookmarkletCard';
import ContextManager from './components/ContextManager';
import AIConverter from './components/AIConverter';
import { Tab, DEFAULT_USER_PROFILE } from './types';

// FREEZE_CODE (Static)
const FREEZE_CODE = `javascript:(function(){
    const promptText = \`SİSTEM TALİMATI: MEVCUT OTURUMU SONLANDIRIYORUZ. Bu projenin ve sohbetin tüm teknik bağlamını yeni bir oturuma taşımam gerekiyor. Bana şu formatta tek bir JSON bloğu ver (başka konuşma metni istemiyorum, sadece JSON): { "summary": "Projenin tek cümlelik özeti", "tech_stack": ["Kullanılan diller", "Araçlar"], "current_state": "Şu an ne çalışıyor, ne çalışmıyor?", "last_active_problem": "En son hangi hatayı çözüyorduk? Detaylı hata kodu.", "code_context": "En son üzerinde çalıştığımız kritik fonksiyon veya dosya içeriği", "next_step": "Yeni sohbette ilk yapmam gereken iş" }\`;
    const inputArea = document.querySelector('div[contenteditable="true"]');
    if(inputArea){
        inputArea.focus();
        document.execCommand('insertText', false, promptText);
        setTimeout(() => {
            const sendBtn = document.querySelector('button[aria-label="Gönder"]') || document.querySelector('button[aria-label="Send message"]');
            if(sendBtn) sendBtn.click();
        }, 200);
    } else {
        alert("HATA: Yazı alanı bulunamadı. Lütfen sayfayı yenile veya sohbet kutusuna bir kez tıkla.");
    }
})()`.replace(/(\r\n|\n|\r)/gm, "");

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.BOOKMARKLETS);
  const [convertedJson, setConvertedJson] = useState<string | null>(null);
  
  // Profile Configuration State
  const [includeProfile, setIncludeProfile] = useState(true);
  const [userProfile, setUserProfile] = useState(DEFAULT_USER_PROFILE);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const handleConversionComplete = (json: string) => {
    setConvertedJson(json);
    setActiveTab(Tab.MANAGER); // Switch to manager to view result
  };

  // Dynamically generate THAW_CODE based on user settings
  const dynamicThawCode = useMemo(() => {
    // 1. Prepare profile text (Escape backticks and newlines for JS string)
    const safeProfile = userProfile.replace(/`/g, '\\`').replace(/\${/g, '\\${').replace(/\n/g, '\\n');
    
    // 2. Choose the prompt template based on toggle
    if (includeProfile) {
      // V2 Logic: Inject Profile + JSON
      return `javascript:(function(){
    const myProfile = \`${safeProfile}\`;
    const json = prompt("Eski sohbetten kopyaladığın JSON'ı buraya yapıştır:");
    if(json){
        const promptText = \`SİSTEM TALİMATI: BAĞLAM YÜKLEME (FULL RESTORE).\\nAşağıdaki metin, kullanıcının sabit profili (DNA) ve projenin son teknik durumudur (SNAPSHOT).\\nBu bilgileri "System Context" olarak belleğine kazı.\\n\\n\${myProfile}\\n\\nMEVCUT PROJE DURUMU (JSON):\\n\${json}\\n\\nTALİMAT:\\nYukarıdaki Profil kurallarına %100 sadık kalarak ve Proje Durumundaki teknik noktadan devam ederek çalışmaya başla. Hazırsan sadece "Sistem ve Profil Yüklendi." yaz.\`;
        const inputArea = document.querySelector('div[contenteditable="true"]');
        if(inputArea){
            inputArea.focus();
            document.execCommand('insertText', false, promptText);
        } else {
            alert("HATA: Yazı alanı bulunamadı. Lütfen sayfayı yenile veya sohbet kutusuna bir kez tıkla.");
        }
    }
})()`.replace(/(\r\n|\n|\r)/gm, "");
    } else {
      // V1 Logic: JSON Only
      return `javascript:(function(){
    const json = prompt("Eski sohbetten kopyaladığın JSON'ı buraya yapıştır:");
    if(json){
        const promptText = \`SİSTEM TALİMATI: BAĞLAM YÜKLEME. Aşağıdaki JSON verisi önceki oturumun teknik özetidir. Bunu 'System Prompt' olarak kabul et ve projeye kaldığım yerden devam et. Hazırsan onayla.\\n\\nVERİ:\\n\${json}\`;
        const inputArea = document.querySelector('div[contenteditable="true"]');
        if(inputArea){
            inputArea.focus();
            document.execCommand('insertText', false, promptText);
        } else {
            alert("HATA: Yazı alanı bulunamadı. Lütfen sayfayı yenile veya sohbet kutusuna bir kez tıkla.");
        }
    }
})()`.replace(/(\r\n|\n|\r)/gm, "");
    }
  }, [includeProfile, userProfile]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
              <Box size={20} strokeWidth={3} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Context<span className="text-indigo-400">Freeze</span></h1>
          </div>
          
          <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab(Tab.BOOKMARKLETS)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === Tab.BOOKMARKLETS ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Bookmark size={16} />
              Kurulum
            </button>
            <button 
              onClick={() => setActiveTab(Tab.MANAGER)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === Tab.MANAGER ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <LayoutDashboard size={16} />
              Yönetici
            </button>
            <button 
              onClick={() => setActiveTab(Tab.CONVERTER)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === Tab.CONVERTER ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <BrainCircuit size={16} />
              AI Dönüştürücü
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {activeTab === Tab.BOOKMARKLETS && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-3xl font-bold text-white mb-4">Akışınızı Kesmeyin.</h2>
              <p className="text-slate-400 text-lg">
                Yapay zeka sohbetlerinizdeki bağlamı (context) kaybetmeden yeni oturumlara taşıyın. 
                Aşağıdaki butonları tarayıcınıza ekleyerek saniyeler içinde durum kaydedin ve yükleyin.
              </p>
            </div>

            {/* Profile Configuration Section */}
            <div className="max-w-4xl mx-auto bg-slate-900/50 border border-indigo-500/20 rounded-xl overflow-hidden transition-all duration-300">
              <div 
                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                className="p-4 flex items-center justify-between cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                    <UserCog size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Sistem Personası / Kullanıcı Profili</h3>
                    <p className="text-xs text-slate-400">Yükleme (Yeşil) butonunun içine kişisel yönergelerinizi gömün.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <label className="text-sm text-slate-300 cursor-pointer select-none" htmlFor="includeProfile">Aktif</label>
                        <input 
                            id="includeProfile"
                            type="checkbox" 
                            checked={includeProfile}
                            onChange={(e) => setIncludeProfile(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    {isProfileExpanded ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
                </div>
              </div>

              {isProfileExpanded && includeProfile && (
                <div className="p-4 border-t border-slate-800 bg-slate-900 animate-in slide-in-from-top-2">
                  <p className="text-sm text-slate-400 mb-3">
                    Aşağıdaki metin, her "Yükle" işlemi yaptığınızda Gemini'ye proje verisiyle birlikte gönderilir. 
                    Kendinizi tanıtın, kurallar koyun veya öğrenme stilinizi belirtin.
                  </p>
                  <textarea
                    value={userProfile}
                    onChange={(e) => setUserProfile(e.target.value)}
                    className="w-full h-64 bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
                    placeholder="Sistem talimatlarınızı buraya yazın..."
                  />
                  <div className="flex justify-end mt-2">
                      <button 
                        onClick={() => setUserProfile(DEFAULT_USER_PROFILE)}
                        className="text-xs text-slate-500 hover:text-white transition-colors"
                      >
                        Varsayılanı Yükle
                      </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <BookmarkletCard 
                title="🔴 Dondur (Snapshot)"
                description="Mevcut projenin teknik durumunu JSON formatında kaydeder."
                code={FREEZE_CODE}
                icon={<Bookmark className="text-red-400" />}
                colorClass="bg-red-500"
              />
              <BookmarkletCard 
                title={`🟢 Yükle ${includeProfile ? '(Akıllı Profil)' : '(Sade)'}`}
                description={includeProfile 
                    ? "Profilinizi ve proje verisini birleştirip yeni sohbete yükler." 
                    : "Sadece JSON verisini yeni sohbete yükler."}
                code={dynamicThawCode}
                icon={<LayoutDashboard className="text-emerald-400" />}
                colorClass="bg-emerald-500"
              />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-8">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Github size={18}/> Nasıl Kullanılır?
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-400 ml-2">
                <li>Yukarıdaki Profil Ayarlarını istediğiniz gibi düzenleyin.</li>
                <li>Butonların üzerindeki "Kodu Kopyala"ya basın.</li>
                <li>Chrome yer imleri çubuğuna sağ tıklayıp <strong>"Sayfa Ekle"</strong> deyin.</li>
                <li>URL kısmına kopyaladığınız kodu yapıştırın.</li>
                <li><strong>Not:</strong> Profil metnini değiştirdiğinizde "Yükle" butonunun kodunu tekrar kopyalayıp güncellemeniz gerekir.</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === Tab.MANAGER && (
          <div className="h-[calc(100vh-140px)] animate-in zoom-in-95 duration-300">
             {convertedJson ? (
               <div className="mb-4 bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-lg flex items-center justify-between">
                 <span className="text-indigo-300 text-sm">AI tarafından dönüştürülen veriler yüklendi.</span>
                 <button onClick={() => setConvertedJson(null)} className="text-xs text-indigo-400 hover:text-white">Sıfırla</button>
               </div>
             ) : null}
             <ContextManager 
                initialData={convertedJson || ''} 
                userProfile={userProfile}
                includeProfile={includeProfile}
             />
          </div>
        )}

        {activeTab === Tab.CONVERTER && (
          <div className="h-full animate-in zoom-in-95 duration-300">
            <AIConverter onConversionComplete={handleConversionComplete} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;