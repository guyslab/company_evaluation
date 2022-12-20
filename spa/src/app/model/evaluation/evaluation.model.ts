import { CompanyScore } from "../company-score/company-score.model";

export interface Evaluation {
    updated_utc: number,
    user_id: string,
    results: CompanyScore[];
  }