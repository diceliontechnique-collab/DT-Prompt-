
export interface PromptFormData {
  promptMode: 'image' | 'video' | 'post';
  template: string;
  designType: string;
  aspectRatio: string;
  purpose: string;
  style: string;
  font: string;
  palette: string;
  background: string;
  mood: string;
  elements: string;
  technical: string;
  personType: string;
  language: string;
  customDetails: string;
  mainText: string;
  mainTextPos: string;
  secondaryText: string;
  secondaryTextPos: string;
  videoMotion: string;
  useReferenceImage: boolean;
  forceEnglish: boolean;
  targetModel: string;
  useImageAsMainSource: boolean;
  onlyEnglishVisuals: boolean;
  exclusivePsychology: boolean;
  disableAutoText: boolean;
  visualText: string;
  anatomyType: string;
  arabicInfographic: boolean;
}

export interface SavedPrompt {
  id: string;
  date: string;
  fullPrompt: string;
  summary: string;
  refinedPrompt?: string;
  qualityScore?: number;
  analysisReport?: string;
}