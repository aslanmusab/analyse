export type BusinessType = 'B2B' | 'B2C' | 'Gemengd';
export type OrderValue = 'low' | 'medium' | 'high' | 'enterprise'; // <50, 50-200, 200-1000, >1000
export type Urgency = 'urgent' | 'compare' | 'both';
export type VisualFit = 'yes' | 'no' | 'partial';
export type DecisionTime = 'days' | 'weeks' | 'months';

export interface UserData {
  url: string;
  answers: {
    businessType?: BusinessType;
    orderValue?: OrderValue;
    urgency?: Urgency;
    visualFit?: VisualFit;
    decisionTime?: DecisionTime;
  };
  hasPaid: boolean;
}

export type ChannelStatus = 'fit' | 'risk' | 'bad';

export interface ChannelAnalysis {
  status: ChannelStatus;
  reasons: string[];
  explanation: string;
}

export interface AnalysisResult {
  seo: ChannelAnalysis;
  googleAds: ChannelAnalysis;
  metaAds: ChannelAnalysis;
  competitors: {
    name: string;
    signals: string[];
  }[];
}