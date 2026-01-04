import { GoogleGenAI, Type } from "@google/genai";

export const convertTextToContextJson = async (text: string, apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Aşağıdaki dağınık notları veya proje özetini, bir yazılım projesi bağlam aktarımı için standart bir JSON formatına dönüştür.
      
      Girdi Metni:
      ${text}`,
      config: {
        systemInstruction: "Sen deneyimli bir teknik proje yöneticisisin. Verilen metni analiz et ve katı bir JSON şemasına dönüştür. Sadece JSON döndür.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "Projenin tek cümlelik özeti" },
            tech_stack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Kullanılan teknolojiler" },
            current_state: { type: Type.STRING, description: "Mevcut durum açıklaması" },
            last_active_problem: { type: Type.STRING, description: "Son çözülen veya devam eden hata" },
            code_context: { type: Type.STRING, description: "İlgili kod parçacıkları veya dosya isimleri" },
            next_step: { type: Type.STRING, description: "Bir sonraki adım" }
          },
          required: ["summary", "tech_stack", "current_state", "next_step"]
        }
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Gemini Conversion Error:", error);
    throw error;
  }
};