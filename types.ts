export interface ContextData {
  summary: string;
  tech_stack: string[];
  current_state: string;
  last_active_problem: string;
  code_context?: string;
  critical_context?: string;
  next_step?: string;
  next_immediate_step?: string;
}

export enum Tab {
  BOOKMARKLETS = 'bookmarklets',
  MANAGER = 'manager',
  CONVERTER = 'converter'
}

export const FREEZE_PROMPT_TEMPLATE = `SİSTEM TALİMATI: MEVCUT OTURUMU SONLANDIRIYORUZ. Bu projenin ve sohbetin tüm teknik bağlamını yeni bir oturuma taşımam gerekiyor. Bana şu formatta tek bir JSON bloğu ver (başka konuşma metni istemiyorum, sadece JSON):
{
  "summary": "Projenin tek cümlelik özeti",
  "tech_stack": ["Kullanılan diller", "Araçlar"],
  "current_state": "Şu an ne çalışıyor, ne çalışmıyor?",
  "last_active_problem": "En son hangi hatayı çözüyorduk? Detaylı hata kodu.",
  "code_context": "En son üzerinde çalıştığımız kritik fonksiyon veya dosya içeriği",
  "next_step": "Yeni sohbette ilk yapmam gereken iş"
}`;

export const THAW_PROMPT_PREFIX = `SİSTEM TALİMATI: BAĞLAM YÜKLEME. Aşağıdaki JSON verisi önceki oturumun teknik özetidir. Bunu 'System Prompt' olarak kabul et ve projeye kaldığım yerden devam et. Hazırsan onayla.

VERİ:
`;

export const DEFAULT_USER_PROFILE = `=== KULLANICI PROFİLİ VE ANA YÖNERGELER ===
KİMLİK: [Buraya rolünüzü yazın. Örn: Senior Backend Developer, Öğrenci, Hobi Yazılımcısı]
HEDEF: [Projenin veya kariyerinizin ana hedefi nedir?]
BAĞLAM: [Zaman kısıtı, özel durumlar veya motivasyon kaynağı]

EĞİTİM TERCİHİ:
- [Öğrenme stiliniz. Örn: "Kodu ver geç", "Derinlemesine teorik anlat", "Analoji yap"]

MASTER PLAN (YOL HARİTASI):
- Faz 1: [Kısa vadeli hedef]
- Faz 2: [Orta vadeli hedef]
- Faz 3: [Uzun vadeli hedef]

SİSTEM PERSONASI (AI DAVRANIŞ MODELİ):
1. DÜRÜST VE TEKNİK: Kodda hata veya güvenlik açığı varsa net bir dille uyar.
2. ÇÖZÜM ODAKLI: Sadece hatayı söyleme, best-practice'lere uygun çözümü de sun.
3. KOD KALİTESİ: Clean Code prensiplerine (DRY, SOLID) sadık kal.
4. PROFESYONEL: Gereksiz sohbetten kaçın, teknik detaylara odaklan.
==============================================`;