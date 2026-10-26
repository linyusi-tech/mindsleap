export type ModerationStatus = "submitted" | "approved" | "hidden";

export type ToolReadiness = "ready" | "needs-help" | "not-started";

export interface AiEmployeeParticipant {
  name: string;
  company: string;
  title: string;
  intro: string;
  contact: string;
  consentPublic: boolean;
}

export interface AiEmployeeReadiness {
  operatingSystem: string;
  browser: ToolReadiness;
  codex: ToolReadiness;
  hermes: ToolReadiness;
  node: ToolReadiness;
  git: ToolReadiness;
  blockers: string;
}

export interface AiEmployeeSoloPlan {
  employeeName: string;
  businessScene: string;
  input: string;
  output: string;
  workflow: string;
  tools: string[];
  successCriteria: string;
  resultUrl: string;
}

export interface AiEmployeeTeamPlan {
  teamGoal: string;
  roles: string[];
  collaborationFlow: string;
  humanReviewPoints: string;
  milestones30Day: string;
  resultUrl: string;
}

export interface AiEmployeeModeration {
  status: ModerationStatus;
  tags: string[];
  featured: boolean;
  adminNote: string;
  reviewedAt: string;
}

export interface AiEmployeeSubmission {
  id: string;
  slug: string;
  editToken: string;
  participant: AiEmployeeParticipant;
  readiness: AiEmployeeReadiness;
  soloPlan: AiEmployeeSoloPlan;
  teamPlan: AiEmployeeTeamPlan;
  moderation: AiEmployeeModeration;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AiEmployeePublicWork {
  id: string;
  slug: string;
  participant: Omit<AiEmployeeParticipant, "contact">;
  soloPlan: AiEmployeeSoloPlan;
  teamPlan: AiEmployeeTeamPlan;
  moderation: Omit<AiEmployeeModeration, "adminNote">;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AiEmployeeStore {
  submissions: AiEmployeeSubmission[];
  updatedAt: string;
}

export interface AiEmployeeSubmissionInput {
  id?: string;
  editToken?: string;
  participant?: Partial<AiEmployeeParticipant>;
  readiness?: Partial<AiEmployeeReadiness>;
  soloPlan?: Partial<AiEmployeeSoloPlan> & { toolsText?: string };
  teamPlan?: Partial<AiEmployeeTeamPlan> & { rolesText?: string };
}
