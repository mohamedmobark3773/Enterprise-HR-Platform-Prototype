import { AIModel, AIPrediction } from "@/types/ai";
import { initialAIModels, initialPredictions } from "@/lib/ai/ai-contracts";

class AIService {
  private models: AIModel[] = [...initialAIModels];
  private predictions: AIPrediction[] = [...initialPredictions];

  async getModels(): Promise<AIModel[]> {
    return [...this.models];
  }

  async getModelById(modelId: string): Promise<AIModel | undefined> {
    return this.models.find((m) => m.modelId === modelId);
  }

  async updateModel(modelId: string, patch: Partial<AIModel>): Promise<AIModel> {
    this.models = this.models.map((m) =>
      m.modelId === modelId ? { ...m, ...patch, updatedAt: new Date().toISOString() } : m
    );
    const updated = this.models.find((m) => m.modelId === modelId);
    if (!updated) throw new Error(`Model ${modelId} not found`);
    return updated;
  }

  async getPredictions(): Promise<AIPrediction[]> {
    return [...this.predictions];
  }

  async getPredictionsByModule(module: string): Promise<AIPrediction[]> {
    return this.predictions.filter((p) => p.sourceModule?.toLowerCase() === module.toLowerCase());
  }

  async updatePredictionReview(
    entityId: string,
    status: "Reviewed" | "Dismissed",
    feedback?: string
  ): Promise<AIPrediction> {
    this.predictions = this.predictions.map((p) =>
      p.entityId === entityId
        ? {
            ...p,
            reviewStatus: status,
            reviewedAt: new Date().toISOString(),
            feedback,
            updatedAt: new Date().toISOString(),
          }
        : p
    );
    const updated = this.predictions.find((p) => p.entityId === entityId);
    if (!updated) throw new Error(`Prediction for entity ${entityId} not found`);
    return updated;
  }
}

export const aiService = new AIService();
