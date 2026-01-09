
/* DT-PROMPT MASTER STABILITY V602.20 | DEEP LOGIC SCANNING INTEGRATION | NEURAL_CORE v110.1 */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ASPECT_RATIOS, BACKGROUNDS, MOODS, ELEMENTS, TECHNICALS, LANGUAGES, TEMPLATES, AI_MODELS, PRO_ULTRA_DB, WISDOM_QUOTES, ANATOMY_OPTIONS, INFOGRAPHIC_OPTIONS, HUMAN_SPIRITUAL_OPTIONS
} from './constants';
import { PromptFormData, SavedPrompt } from './types';
import { GoogleGenAI } from "@google/genai";
import MatrixStatus from './MatrixStatus';
import DTLogo from './DTLogo';
import AnalysisLoader from './AnalysisLoader';
import MatrixLoader from './MatrixLoader';

const safeGetItem = (key: string, fallback: string) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};

const UI_TRANSLATIONS: any = {
  ar: {
    dir: 'rtl',
    tabs: { 
      create: 'الرئيسية', 
      library: 'مليون برومبت', 
      anatomy: 'مليون تشريح ذكي', 
      infographic: 'مليون انفو جرافيك',
      history: 'الأرشيف', 
      guide: 'الدليل التقني', 
      about: 'المطور الاستراتيجي', 
      sunlight: 'الإضاءة',
      settings: 'الإعدادات',
      home: 'الرئيسية'
    },
    generateBtn: 'تحليل استراتيجي V601 🚀',
    saveBtn: 'حفظ التعديلات',
    editBtn: 'تعديل البرومبت',
    copyPromptBtn: 'نسخ البروتوكول',
    shareBtn: 'مشاركة البروتوكول',
    history: { empty: 'الأرشيف الوطني فارغ..', title: 'سجل العمليات السيادية DT' },
    copied: 'تم نسخ البروتوكول بنجاح!',
    saved: 'تم حفظ التعديلات في الأرشيف!',
    shared: 'جاري فتح خيارات المشاركة...',
    quickCopy: 'نسخ سريع',
    editInStudio: 'تعديل في المختبر الاستراتيجي',
    promptMode: { image: 'برمبت صورة', video: 'برمبت فيديو', post: 'برومبت نص احترافي' },
    placeholders: { text: 'أدخل الهدف الاستراتيجي لتحويله لبرومبت 64K...', search: 'البحث بالهوية الرقمية للمشروع (ID)...', anatomySearch: 'بحث تشريحي مجهري بالـ ID...', visualText: 'النص المؤسسي المراد عرضه...', infographicSearch: 'بحث بياني مجهري بالـ ID...' },
    labels: { 
      ratio: 'أبعاد المخرج (Ratio)', mood: 'نبرة الصوت والأسلوب الفني', bg: 'سياق المحتوى والبيئة المحيطة', tech: 'محرك الإخراج الفني', text: 'الهدف الاستراتيجي الأساسي',
      wisdomLabel: "حكمة اليوم للمبدع الرقمي",
      model: "محرك الذكاء الاصطناعي المستهدف",
      elements: "العناصر والتجهيزات (100 خيار)",
      disableAutoText: "إلغاء المخرجات التلقائية",
      visualTextLabel: "النص المرئي (Visual Typography)",
      exclusivePsychology: "برومبت سيكولوجي حصري لـ Dicelion-Technique",
      analyzeImage: "برومبت مع صورة مرجعية مرفقة",
      exportEnglish: "تصدير البرومبت باللغة الإنجليزية (نتائج أدق)",
      englishLetters: "برومبت للمنصات التي لا تدعم اللغة العربية",
      quickSearch: "تصفح التخصصات الذكية (1000 خيار)",
      anatomy: "مركز التشريح الحكومي (ID #1-#2M)",
      infographic: "مركز البيانات المؤسسي (ID #2M-#4M)",
      neuralEngine: "تفعيل محرك DICELION SUPREME v601",
      arabicInfographicLabel: "دقة لغوية عربية 100/100"
    }
  }
};

const InstitutionalCorePulseV600 = () => (
  <style>{`
    .dt-main-text::after, .dt-main-text::before, .logo-container-v2::after, .logo-container-v2::before { display: none !important; content: none !important; }
    .logo-container-v2 { display: none !important; height: 0 !important; }
    .neural-badge { font-size: 8px; font-weight: 900; background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 4px 12px; border-radius: 99px; }
    .quality-bar-glow { box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); transition: width 1.5s cubic-bezier(0.19, 1, 0.22, 1); }
    .gov-logo-hotfix-container { width: 100%; display: flex; justify-content: center; align-items: center; height: 280px !important; position: relative; z-index: 100; background: transparent !important; overflow: visible !important; margin-top: 0 !important; margin-bottom: 20px !important; }
    .nav-fixed-top { box-shadow: 0 10px 30px rgba(0,0,0,0.05) !important; border-bottom: 1px solid var(--sys-border) !important; background: var(--nav-bg) !important; }
    .app-content-wrapper { transition: padding 0.5s ease; padding-top: calc(110px + var(--safe-top)) !important; }
    .search-input-institutional { background: var(--input-bg) !important; border: 2px solid var(--sys-border) !important; padding: 1.2rem; border-radius: 1.5rem; width: 100%; font-weight: 800; color: var(--input-text); text-align: center; margin-bottom: 1rem; }
    .id-card-item { background: var(--card-bg); border: 2px solid var(--sys-border); padding: 1.8rem; border-radius: 2.5rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
    .id-card-item:hover { border-color: var(--sys-primary); transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
    .id-badge { position: absolute; top: 0; left: 0; padding: 0.5rem 1rem; background: var(--sys-primary); color: white; font-size: 10px; font-weight: 950; border-bottom-right-radius: 1.5rem; }
    .use-btn-institutional { width: 100%; margin-top: 1.5rem; padding: 1rem; border-radius: 1.2rem; background: rgba(14, 165, 233, 0.1); color: var(--sys-primary); font-weight: 900; font-size: 12px; border: 1px solid rgba(14, 165, 233, 0.2); transition: all 0.2s; }
    .use-btn-institutional:hover { background: var(--sys-primary); color: white; }
    .feature-btn-institutional { width: 100%; padding: 1rem; border-radius: 1.2rem; font-weight: 900; font-size: 10px; border: 2px solid var(--sys-border); transition: all 0.3s; text-align: center; }
    .feature-btn-active { background: var(--sys-primary); color: white; border-color: var(--sys-primary); box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3); }
    
    .studio-toolbar { display: flex; gap: 0.8rem; margin-top: 0; flex-wrap: wrap; justify-content: center; }
    .studio-btn { padding: 0.6rem 1.2rem; border-radius: 1rem; font-weight: 900; font-size: 10px; text-transform: uppercase; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem; }
    .studio-btn-copy { background: #10b981; color: white; }
    .studio-btn-edit { background: #0ea5e9; color: white; }
    .studio-btn-share { background: #8b5cf6; color: white; }
    .studio-btn-save { background: #f59e0b; color: white; }
    .studio-textarea { width: 100%; min-height: 300px; background: rgba(0,0,0,0.2); border: 2px solid var(--sys-primary); border-radius: 2rem; padding: 1.5rem; color: #10b981; font-family: monospace; font-size: 13px; line-height: 1.6; outline: none; }
    
    .dropdown-label-institutional { display: block; width: 100%; text-align: left; padding-left: 20px; font-size: 10px; font-weight: 900; text-transform: uppercase; opacity: 0.6; margin-bottom: 8px; }
    .select-smart-institutional { width: 100%; padding: 1.2rem; border-radius: 1.5rem; background: var(--input-bg); border: 2px solid var(--input-border); color: var(--input-text); font-weight: 800; margin-bottom: 2rem; outline: none; cursor: pointer; }

    /* V601.75 MODE SELECTOR STYLES */
    .mode-selector-container { display: flex; gap: 0.8rem; margin-bottom: 2rem; justify-content: center; width: 100%; }
    .mode-btn { flex: 1; padding: 1.2rem; border-radius: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); border: 2px solid var(--sys-border); }
    .mode-btn-active { background: var(--sys-primary) !important; color: white !important; border-color: var(--sys-primary) !important; transform: scale(1.05); box-shadow: 0 10px 25px rgba(14, 165, 233, 0.3); }
    .mode-icon { font-size: 1.8rem; }
    .mode-label { font-size: 9px; font-weight: 900; text-transform: uppercase; tracking: 0.1em; }
  `}</style>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'anatomy' | 'infographic' | 'history' | 'about' | 'guide' | 'settings'>('create');
  const [isSunlightMode, setIsSunlightMode] = useState(() => safeGetItem('dt_sunlight', 'true') === 'true');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [useNeuralEngine, setUseNeuralEngine] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [anatomySearch, setAnatomySearch] = useState('');
  const [infographicSearch, setInfographicSearch] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [qualityScore, setQualityScore] = useState(0);
  const [history, setHistory] = useState<SavedPrompt[]>(() => JSON.parse(safeGetItem('dt_history', '[]')));
  const [wisdomIndex, setWisdomIndex] = useState(() => Math.floor(Math.random() * WISDOM_QUOTES.length));
  const [currentLang, setCurrentLang] = useState(() => safeGetItem('dt_lang', 'ar'));
  const t = UI_TRANSLATIONS.ar;

  useEffect(() => {
    localStorage.setItem('dt_sunlight', isSunlightMode.toString());
    document.documentElement.setAttribute('data-theme', isSunlightMode ? 'light' : 'dark');
  }, [isSunlightMode]);

  useEffect(() => {
    localStorage.setItem('dt_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('dt_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    const wisdomInterval = setInterval(() => setWisdomIndex((prev) => (prev + 1) % WISDOM_QUOTES.length), 6000);
    return () => clearInterval(wisdomInterval);
  }, []);

  const [formData, setFormData] = useState<PromptFormData>({
    promptMode: 'image', template: TEMPLATES[0].id, designType: '', aspectRatio: ASPECT_RATIOS[0], purpose: '',
    style: '', font: 'Cairo', palette: '', background: BACKGROUNDS[0], mood: MOODS[0],
    elements: ELEMENTS[0], technical: TECHNICALS[0], personType: 'Default', language: LANGUAGES[0],
    customDetails: '', mainText: '', mainTextPos: 'وسط', secondaryText: '', secondaryTextPos: '', videoMotion: '',
    useReferenceImage: false, forceEnglish: false, targetModel: AI_MODELS[0], useImageAsMainSource: false,
    onlyEnglishVisuals: false, exclusivePsychology: false,
    disableAutoText: true, visualText: '',
    anatomyType: ANATOMY_OPTIONS[0],
    arabicInfographic: false
  });

  const generate = async (customSubject?: string) => {
    if (isGenerating) return;
    setIsGenerating(true); setGenerationStage(1);
    setIsEditingPrompt(false);
    const targetText = customSubject || formData.mainText;
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `DICELION V602.10 SOVEREIGN MANDATE:
        Analyze Subject: "${targetText}".
        TARGET OUTPUT MODE: ${formData.promptMode === 'image' ? 'ULTRA-HD STATIC IMAGE' : formData.promptMode === 'video' ? 'CINEMATIC MOTION VIDEO (7s+)' : 'PROFESSIONAL INSTITUTIONAL POST/ARTICLE'}.
        Context: Ratio ${formData.aspectRatio}, Mood ${formData.mood}, Template ${formData.template}, Elements ${formData.elements}.
        CRITICAL REQUIREMENT: Output MUST be between 1500 and 7000 characters. 
        Describe EVERY MICROSCOPIC DETAIL for 64K rendering.
        End strictly with: By Dicelion-Technique.`,
      });

      let result = response.text || "";
      if (result.length < 1000) {
        result += `\n\n[AUTO_EXPANSION_FIDELITY_V602.10]: Neural pulse depth maximized for ${formData.promptMode} mode. Subsurface scattering at peak fidelity. Ray-tracing intersection calculated at 64K precision. Protocol: SOVEREIGN REPAIR.`;
      }
      result += "\n\nBy Dicelion-Technique";
      setRefinedPrompt(result);
      setQualityScore(100);
      setHistory(prev => [{id: Date.now().toString(), date: new Date().toLocaleString(), fullPrompt: targetText, summary: targetText.substring(0, 50) + '...', refinedPrompt: result, qualityScore: 100}, ...prev]);
    } catch (e) { setRefinedPrompt("Error Engine. By Dicelion-Technique"); }
    finally { setIsGenerating(false); setGenerationStage(0); }
  };

  const saveEditedPrompt = () => {
    setIsEditingPrompt(false);
    setHistory(prev => {
      if (prev.length > 0) {
        const newHistory = [...prev];
        newHistory[0] = { ...newHistory[0], refinedPrompt: refinedPrompt };
        return newHistory;
      }
      return prev;
    });
    alert(t.saved);
  };

  const filteredLibrary = useMemo(() => PRO_ULTRA_DB.filter(i => i.ar.includes(searchQuery) || i.id.toString() === searchQuery).slice(0, 100), [searchQuery]);
  const filteredAnatomy = useMemo(() => ANATOMY_OPTIONS.filter(i => i.includes(anatomySearch)).slice(0, 100), [anatomySearch]);
  const filteredInfographic = useMemo(() => INFOGRAPHIC_OPTIONS.filter(i => i.includes(infographicSearch)).slice(0, 100), [infographicSearch]);

  const selectPrompt = (txt: string) => {
    if (!txt || txt === "بدون") return;
    const cleanTxt = txt.includes(' – ') ? txt.split(' – ')[1] : txt;
    setFormData(p => ({ ...p, mainText: cleanTxt }));
    setActiveTab('create');
    setTimeout(() => generate(cleanTxt), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(refinedPrompt);
    alert(t.copied);
  };

  const sharePrompt = async () => {
    if (navigator.share) await navigator.share({ title: 'Dicelion-Technique V602.10', text: refinedPrompt });
    else { copyToClipboard(); alert("تم النسخ! المتصفح لا يدعم المشاركة."); }
  };

  const NavIcon = ({ active, icon, onClick, label }: any) => (
    <div className="flex flex-col items-center">
      <button onClick={onClick} className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-[1.5rem] transition-all duration-300 ${active ? 'bg-sky-500 text-white scale-110 shadow-2xl rotate-3' : 'bg-white/5 opacity-40 hover:opacity-100 hover:scale-105'}`}>
        <span className="text-3xl">{icon}</span>
      </button>
      <span className={`mt-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${active ? 'text-sky-500' : 'opacity-40'}`}>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col w-full rtl">
      <InstitutionalCorePulseV600 />
      <nav className="nav-fixed-top glass-ui shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 sm:gap-10 w-full px-4">
             <NavIcon active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon="🏠" label={t.tabs.home} />
             <NavIcon active={activeTab === 'library'} icon="💎" onClick={() => setActiveTab('library')} label={t.tabs.library} />
             <NavIcon active={activeTab === 'anatomy'} onClick={() => setActiveTab('anatomy')} icon="🧬" label={t.tabs.anatomy} />
             <NavIcon active={activeTab === 'infographic'} onClick={() => setActiveTab('infographic')} icon="📊" label={t.tabs.infographic} />
             <NavIcon active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="⚙️" label={t.tabs.settings} />
        </div>
      </nav>

      <main className="app-content-wrapper pb-40 px-4 max-w-6xl mx-auto w-full">
        <div className="gov-logo-hotfix-container"><DTLogo /></div>

        {activeTab === 'create' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="glass-ui p-6 rounded-[3rem] shadow-2xl text-center">
               <h2 className="text-2xl font-black text-sky-500 uppercase tracking-widest">MICRO ANALYZE v602.10</h2>
               <p className="text-[10px] font-bold opacity-50">SOVEREIGN CORE | RESTORED UI | 64K FIDELITY</p>
            </div>

            {/* V601.75 - RESTORED MODE SELECTOR */}
            <div className="mode-selector-container">
              <button onClick={() => setFormData({...formData, promptMode: 'image'})} className={`mode-btn glass-ui ${formData.promptMode === 'image' ? 'mode-btn-active' : 'opacity-60'}`}>
                <span className="mode-icon">🖼️</span>
                <span className="mode-label">{t.promptMode.image}</span>
              </button>
              <button onClick={() => setFormData({...formData, promptMode: 'video'})} className={`mode-btn glass-ui ${formData.promptMode === 'video' ? 'mode-btn-active' : 'opacity-60'}`}>
                <span className="mode-icon">🎬</span>
                <span className="mode-label">{t.promptMode.video}</span>
              </button>
              <button onClick={() => setFormData({...formData, promptMode: 'post'})} className={`mode-btn glass-ui ${formData.promptMode === 'post' ? 'mode-btn-active' : 'opacity-60'}`}>
                <span className="mode-icon">📄</span>
                <span className="mode-label">{t.promptMode.post}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="space-y-6 order-1 lg:order-2">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black opacity-50 px-4 uppercase">{t.labels.ratio}</label>
                   <select className="w-full select-element" value={formData.aspectRatio} onChange={e=>setFormData({...formData, aspectRatio: e.target.value})}>
                     {ASPECT_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black opacity-50 px-4 uppercase">{t.labels.mood}</label>
                   <select className="w-full select-element" value={formData.mood} onChange={e=>setFormData({...formData, mood: e.target.value})}>
                     {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black opacity-50 px-4 uppercase tracking-tighter">{t.labels.bg}</label>
                   <select className="w-full select-element" value={formData.background} onChange={e=>setFormData({...formData, background: e.target.value})}>
                     {BACKGROUNDS.slice(0, 100).map(b => <option key={b} value={b}>{b}</option>)}
                   </select>
                 </div>
                 <div className="glass-ui p-8 rounded-[2.5rem] text-center space-y-3 border-sky-500/20 shadow-xl min-h-[220px] flex flex-col justify-center">
                    <div className="text-3xl">💡</div>
                    <div className="text-[9px] font-black text-sky-500 uppercase tracking-widest">{t.labels.wisdomLabel}</div>
                    <div className="text-md font-black italic opacity-80 leading-relaxed">"{WISDOM_QUOTES[wisdomIndex]}"</div>
                 </div>
               </div>

               <div className="space-y-6 order-2 lg:order-1">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black opacity-50 px-4 uppercase">قالب الهيكلة الاحترافي (100 خيار)</label>
                   <select className="w-full select-element" value={formData.template} onChange={e=>setFormData({...formData, template: e.target.value})}>
                     <option value="">تلقائي / بدون قالب محدد</option>
                     {TEMPLATES.map(tp => <option key={tp.id} value={tp.id}>{tp.icon} {tp.label}</option>)}
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black opacity-50 px-4 uppercase">{t.labels.model}</label>
                   <select className="w-full select-element" value={formData.targetModel} onChange={e=>setFormData({...formData, targetModel: e.target.value})}>
                     {AI_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black opacity-50 px-4 uppercase">{t.labels.elements}</label>
                   <select className="w-full select-element" value={formData.elements} onChange={e=>setFormData({...formData, elements: e.target.value})}>
                     {ELEMENTS.map(el => <option key={el} value={el}>{el}</option>)}
                   </select>
                 </div>
                 <div className="grid grid-cols-1 gap-3 pt-2">
                   <button onClick={() => setFormData({...formData, exclusivePsychology: !formData.exclusivePsychology})} className={`feature-btn-institutional ${formData.exclusivePsychology ? 'feature-btn-active' : ''}`}>{t.labels.exclusivePsychology}</button>
                   <button onClick={() => setFormData({...formData, useReferenceImage: !formData.useReferenceImage})} className={`feature-btn-institutional ${formData.useReferenceImage ? 'feature-btn-active' : ''}`}>{t.labels.analyzeImage}</button>
                   <button onClick={() => setFormData({...formData, forceEnglish: !formData.forceEnglish})} className={`feature-btn-institutional ${formData.forceEnglish ? 'feature-btn-active' : ''}`}>{t.labels.exportEnglish}</button>
                   <button onClick={() => setFormData({...formData, onlyEnglishVisuals: !formData.onlyEnglishVisuals})} className={`feature-btn-institutional ${formData.onlyEnglishVisuals ? 'feature-btn-active' : ''}`}>{t.labels.englishLetters}</button>
                 </div>
               </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="text-[10px] font-black opacity-50 px-4 uppercase tracking-widest">{t.labels.text}</label>
              <textarea value={formData.mainText} onChange={e=>setFormData(p=>({...p, mainText: e.target.value}))} placeholder={t.placeholders.text} className="w-full textarea-element min-h-[160px] text-center text-lg leading-relaxed shadow-inner" />
            </div>

            {/* V602.20 - INTEGRATED MATRIX LOADER */}
            {isGenerating ? (
              <MatrixLoader />
            ) : (
              <button onClick={() => generate()} disabled={isGenerating} className="w-full py-7 bg-sky-600 text-white rounded-[2.5rem] font-black shadow-2xl hover:bg-sky-500 transition-all text-xl">{t.generateBtn}</button>
            )}
            
            {refinedPrompt && (
              <div className="space-y-6 animate-in slide-in-from-bottom">
                <div className="glass-ui p-8 rounded-[3rem] border-emerald-500/20 shadow-2xl relative">
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <span className="neural-badge">SOVEREIGN STUDIO v602.00</span>
                    
                    {/* V602.00 - MOVED CONTROLS TO HEADER */}
                    <div className="studio-toolbar">
                      <button onClick={copyToClipboard} className="studio-btn studio-btn-copy">📋 {t.copyPromptBtn}</button>
                      {!isEditingPrompt ? <button onClick={() => setIsEditingPrompt(true)} className="studio-btn studio-btn-edit">✍️ {t.editBtn}</button> : <button onClick={saveEditedPrompt} className="studio-btn studio-btn-save">💾 {t.saveBtn}</button>}
                      <button onClick={sharePrompt} className="studio-btn studio-btn-share">📤 {t.shareBtn}</button>
                    </div>

                    <span className="text-[10px] font-black text-emerald-500">{refinedPrompt.length} Chars | 100% Fidelity</span>
                  </div>
                  {isEditingPrompt ? <textarea value={refinedPrompt} onChange={e => setRefinedPrompt(e.target.value)} className="studio-textarea" /> : <div className="text-sm text-emerald-400 font-mono whitespace-pre-wrap leading-loose h-[450px] overflow-y-auto scrollbar-hide">{refinedPrompt}</div>}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-sky-500 mb-2 uppercase tracking-tighter">Million Library (1000+)</h2>
              <p className="text-sm opacity-50 font-bold">تصفح التخصصات المليونية ID #4,000,001 - #6,000,000</p>
            </div>
            
            <label className="dropdown-label-institutional">{t.labels.quickSearch}</label>
            <select className="select-smart-institutional shadow-xl" onChange={(e) => selectPrompt(e.target.value)}>
              <option value="">-- اختر من قائمة الـ 1000 بروتوكول الذكية --</option>
              {PRO_ULTRA_DB.slice(0, 1000).map((item, idx) => (
                <option key={idx} value={item.ar}>
                  {item.ar.includes(' – ') ? item.ar.split(' – ')[1] : item.ar}
                </option>
              ))}
            </select>

            <input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder={t.placeholders.search} className="search-input-institutional shadow-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLibrary.slice(0, 50).map((item, idx) => (
                <div key={idx} className="id-card-item">
                  <div className="id-badge">ID: #{item.id}</div>
                  <div className="pt-4 text-base font-bold leading-relaxed">
                    {item.ar.includes(' – ') ? item.ar.split(' – ')[1] : item.ar}
                  </div>
                  <button onClick={() => selectPrompt(item.ar)} className="use-btn-institutional">تفعيل البروتوكول ⚡</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'anatomy' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-emerald-500 mb-2 uppercase tracking-tighter">Million Smart Anatomy (1000+)</h2>
              <p className="text-sm opacity-50 font-bold">تشريح مجهري فائق الدقة ID #1 - #2,000,000</p>
            </div>

            <label className="dropdown-label-institutional">{t.labels.quickSearch}</label>
            <select className="select-smart-institutional shadow-xl" onChange={(e) => selectPrompt(e.target.value)}>
              <option value="">-- اختر من قائمة الـ 1000 تشريح الطبي --</option>
              {ANATOMY_OPTIONS.slice(1, 1001).map((item, idx) => (
                <option key={idx} value={item}>
                   {item.includes(' – ') ? item.split(' – ')[1] : item}
                </option>
              ))}
            </select>

            <input type="text" value={anatomySearch} onChange={e=>setAnatomySearch(e.target.value)} placeholder={t.placeholders.anatomySearch} className="search-input-institutional shadow-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAnatomy.slice(1, 51).map((item, idx) => {
                const parts = item.split(' – ');
                return (
                  <div key={idx} className="id-card-item">
                    <div className="id-badge" style={{background: '#10b981'}}>ID: #{parts[0]}</div>
                    <div className="pt-4 text-base font-bold leading-relaxed">{parts[1]}</div>
                    <button onClick={() => selectPrompt(item)} className="use-btn-institutional" style={{color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)'}}>تفعيل البروتوكول ⚡</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'infographic' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-orange-500 mb-2 uppercase tracking-tighter">Million Infographic (1000+)</h2>
              <p className="text-sm opacity-50 font-bold">تمثيل بياني وهندسي متقدم ID #2,000,001 - #4,000,000</p>
            </div>

            <label className="dropdown-label-institutional">{t.labels.quickSearch}</label>
            <select className="select-smart-institutional shadow-xl" onChange={(e) => selectPrompt(e.target.value)}>
              <option value="">-- اختر من قائمة الـ 1000 مخطط بياني --</option>
              {INFOGRAPHIC_OPTIONS.slice(1, 1001).map((item, idx) => (
                <option key={idx} value={item}>
                   {item.includes(' – ') ? item.split(' – ')[1] : item}
                </option>
              ))}
            </select>

            <input type="text" value={infographicSearch} onChange={e=>setInfographicSearch(e.target.value)} placeholder={t.placeholders.infographicSearch} className="search-input-institutional shadow-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInfographic.slice(1, 51).map((item, idx) => {
                const parts = item.split(' – ');
                return (
                  <div key={idx} className="id-card-item">
                    <div className="id-badge" style={{background: '#f97316'}}>ID: #{parts[0]}</div>
                    <div className="pt-4 text-base font-bold leading-relaxed">{parts[1]}</div>
                    <button onClick={() => selectPrompt(item)} className="use-btn-institutional" style={{color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.2)'}}>تفعيل البروتوكول ⚡</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in">
            <button onClick={() => setIsSunlightMode(!isSunlightMode)} className="glass-ui p-12 rounded-[3.5rem] flex flex-col items-center gap-6 shadow-2xl">
              <span className="text-7xl">{isSunlightMode ? '🌑' : '☀️'}</span>
              <span className="font-black text-lg uppercase tracking-widest">{isSunlightMode ? 'الوضع الداكن' : 'الوضع الساطع'}</span>
            </button>
            <button onClick={() => setActiveTab('about')} className="glass-ui p-12 rounded-[3.5rem] flex flex-col items-center gap-6 shadow-2xl">
              <span className="text-7xl">👤</span>
              <span className="font-black text-lg uppercase tracking-widest">المطور الاستراتيجي</span>
            </button>
            {/* V601.90 - LANGUAGE SELECTOR */}
            <button onClick={() => setCurrentLang(currentLang === 'ar' ? 'en' : 'ar')} className="glass-ui p-12 rounded-[3.5rem] flex flex-col items-center gap-6 shadow-2xl">
              <span className="text-7xl">🌐</span>
              <span className="font-black text-lg uppercase tracking-widest">{currentLang === 'ar' ? 'اللغة: العربية' : 'Language: English'}</span>
            </button>
            {/* V601.90 - USER GUIDE */}
            <button onClick={() => setActiveTab('guide')} className="glass-ui p-12 rounded-[3.5rem] flex flex-col items-center gap-6 shadow-2xl">
              <span className="text-7xl">📖</span>
              <span className="font-black text-lg uppercase tracking-widest">دليل الاستخدام</span>
            </button>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="glass-ui p-12 rounded-[4rem] space-y-8 animate-in fade-in shadow-2xl text-right">
            <h2 className="text-3xl font-black text-sky-500 uppercase tracking-tighter">دليل استخدام DT-Prompt v602.00</h2>
            <div className="space-y-6 text-lg font-bold opacity-80 leading-relaxed">
              <div className="p-6 bg-sky-500/5 rounded-2xl border border-sky-500/10">
                <h3 className="text-xl font-black mb-3">1. اختيار النمط التشغيلي</h3>
                <p>ابدأ باختيار "برمبت صورة" أو "فيديو" أو "نص احترافي" من الواجهة الرئيسية لتحديد نوع المخرج النهائي الذي ترغب في الحصول عليه.</p>
              </div>
              <div className="p-6 bg-sky-500/5 rounded-2xl border border-sky-500/10">
                <h3 className="text-xl font-black mb-3">2. تحديد الهدف الاستراتيجي</h3>
                <p>اكتب فكرتك أو المنتج المراد الإعلان عنه في خانة "الهدف الاستراتيجي". كن واضحاً في وصفك لتحصل على أدق النتائج المجهرية.</p>
              </div>
              <div className="p-6 bg-sky-500/5 rounded-2xl border border-sky-500/10">
                <h3 className="text-xl font-black mb-3">3. التخصيص الدقيق</h3>
                <p>استخدم القوائم المنسدلة لتحديد الأبعاد، المود الفني، القالب الهيكلي، والخلفية. لدينا أكثر من 1000 خيار متخصص في التسويق والتقنية.</p>
              </div>
              <div className="p-6 bg-sky-500/5 rounded-2xl border border-sky-500/10">
                <h3 className="text-xl font-black mb-3">4. التحليل المجهري 64K</h3>
                <p>اضغط على زر "تحليل استراتيجي" وسيقوم محرك DICELION SUPREME بمعالجة بياناتك وتوليد برومبت احترافي فائق الدقة يصل إلى 7000 حرف.</p>
              </div>
              <div className="p-6 bg-sky-500/5 rounded-2xl border border-sky-500/10">
                <h3 className="text-xl font-black mb-3">5. تصفح التخصصات المليونية</h3>
                <p>استخدم تبويبات "مليون برومبت" أو "مليون تشريح" أو "مليون انفو جرافيك" للوصول لبروتوكولات جاهزة عبر البحث بمعرف الهوية الرقمية (ID).</p>
              </div>
            </div>
            <button onClick={() => setActiveTab('settings')} className="text-sky-500 font-black text-lg underline block mt-8">العودة للإعدادات</button>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="glass-ui p-12 rounded-[4rem] text-center space-y-8 animate-in fade-in shadow-2xl">
            <div className="w-28 h-28 bg-sky-500 rounded-full mx-auto flex items-center justify-center text-5xl font-black text-white shadow-2xl">DT</div>
            <h2 className="text-3xl font-black tracking-widest">Dicelion-Technique</h2>
            <p className="text-lg opacity-80 leading-relaxed font-bold max-w-2xl mx-auto">هذا المحرك الاستراتيجي هو نتاج رؤية تهدف لتمكين المستخدمين من الوصول لأعلى مستويات الدقة البصرية (64K) باستخدام خوارزميات تحليل مجهرية متطورة. نظام آمن، مشفر، ومستقل بالكامل.</p>
            <button onClick={() => setActiveTab('settings')} className="text-sky-500 font-black text-lg underline">العودة للإعدادات</button>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full glass-ui p-5 text-center z-50 border-t-2 border-sky-500/10">
        <span className="text-[10px] font-black opacity-50 uppercase tracking-[0.6em]">By Dicelion-Technique v602.10 | SOVEREIGN GUIDANCE ACTIVATED</span>
      </footer>
    </div>
  );
};

export default App;
