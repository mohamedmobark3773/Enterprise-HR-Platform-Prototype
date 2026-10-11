export interface CandidateSkill {
  skill: string;
  candidate: string;
  required: string;
  match: string;
  gap: string;
}

export interface PipelineStage {
  stage: string;
  people: string[];
}

export const initialSkills: [string, string, string, string, string][] = [
  ["Selenium", "Advanced", "Intermediate", "Strong", "Above requirement"],
  ["Java", "Advanced", "Advanced", "Strong", "Meets requirement"],
  ["API Testing", "Advanced", "Intermediate", "Strong", "Above requirement"],
  ["Performance Testing", "None", "Intermediate", "Missing", "Practical evidence required"],
  ["CI/CD", "Intermediate", "Intermediate", "Match", "Meets requirement"],
];

export const initialPipelineStages: [string, string[]][] = [
  ["Applied", ["Nina Park", "Youssef Khalil", "Eva Martin"]],
  ["Screening", ["Sam Wilson", "Leila Saad"]],
  ["Interview", ["Marcus Reed", "Inès Dubois"]],
  ["Evaluation", ["Hana Ali"]],
  ["Offer", ["Theo James"]],
];
