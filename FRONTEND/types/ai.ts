export type AIModelStatus = "Active" | "Inactive" | "Testing";
export type AIModelHealth = "Healthy" | "Degraded" | "Unavailable";
export type DeploymentStatus = "Deployed" | "Undeployed" | "Deploying";

export interface AIModel {
  modelId: string;
  modelName: string;
  modelVersion: string;
  modelType: string;
  domain: "Attendance" | "Recruitment" | "Payroll" | "Leave" | "Employees" | "Documents";
  description: string;
  provider: string;
  framework: string;
  environment: "Production" | "Staging" | "Development";
  status: AIModelStatus;
  health: AIModelHealth;
  deploymentStatus: DeploymentStatus;
  inputSchema: Record<string, string>;
  outputSchema: Record<string, string>;
  lastPrediction: string;
  predictionCount: number;
  performanceMetrics: Record<string, number>;
  owner: string;
  versions: string[];
  createdAt: string;
  updatedAt: string;
}

export type PredictionRisk = "Low" | "Medium" | "High" | "Critical";
export type PredictionStatus =
  | "Ready"
  | "Warning"
  | "Requires Human Review"
  | "Low Confidence"
  | "Stale Prediction"
  | "Model Unavailable";

export interface AIPrediction {
  entityId: string;
  entityType: string;
  modelId: string;
  modelVersion: string;
  prediction: string;
  confidence: number;
  riskLevel: PredictionRisk;
  explanation: string;
  recommendedAction: string;
  status: PredictionStatus;
  createdAt: string;
  updatedAt: string;
  predictionType?: string;
  sourceModule?: string;
  inputReference?: string;
  processingTime?: number;
  reviewStatus?: "Pending" | "Reviewed" | "Dismissed";
  reviewedBy?: string;
  reviewedAt?: string;
  feedback?: string;
  metadata?: Record<string, string | number | boolean>;
}
