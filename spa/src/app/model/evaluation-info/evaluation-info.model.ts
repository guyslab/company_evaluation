import { EditableCompanyScore } from "../editable-company-score/editable-company-score.model";

export interface EvaluationInfo {
    updated_utc: number,
    user_id: string,
    results: EditableCompanyScore[];
  }