
export interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: number;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  position: number;
  surveyResponses?: SurveyResponse;
}

export interface SurveyResponse {
  painPoint: string;
  currentSolution: string;
  willingnessToPay: 'Low' | 'Medium' | 'High';
}

export interface AIAnalysisResult {
  summary: string;
  keyThemes: string[];
  suggestedFeatures: string[];
  marketFitScore: number;
}
