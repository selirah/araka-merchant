import { GraphData } from './Report';

export interface VASProcessed {
  month: string;
  currency: string;
  totalTransactions: number;
  totalAmountProcessed: number;
  totalFeesCharged: number;
  totalArakaFees: number;
  totalArakaDiscount: number;
  totalArakaIncome: number;
  annualFees: number;
}

export interface VASProcessedReport {
  vasFees: GraphData;
  vasIncome: GraphData;
  vasProcessed: GraphData;
  data: VASProcessed[];
}
