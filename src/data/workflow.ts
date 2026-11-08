import type { WorkflowStep } from "../types";

export const workflow: WorkflowStep[] = [
  { title: "Understand", you: "Define the problem and who it is for.", ai: "Explains unfamiliar concepts and surfaces edge cases." },
  { title: "Plan", you: "Choose scope and priorities.", ai: "Drafts task breakdowns I review and cut down." },
  { title: "Architect", you: "Decide data models and structure.", ai: "Compares options and trade-offs." },
  { title: "Build", you: "Write and own the logic.", ai: "Speeds up boilerplate and suggests approaches." },
  { title: "Test", you: "Run it, break it, read the results.", ai: "Proposes test cases and reproduces bugs." },
  { title: "Improve", you: "Refactor with understanding.", ai: "Reviews code and flags weak spots." },
  { title: "Deploy", you: "Configure hosting and environment.", ai: "Helps debug build and deploy errors." },
];