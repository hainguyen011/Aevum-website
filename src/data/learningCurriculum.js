// Open Knowledge Repository & Educational Curriculum: Khám phá Kỉ nguyên AI
// Designed for lifelong learning, conceptual clarity, and developer mastery
// Spanning from universal concepts for all audiences to deep technical engineering
// Authored collaboratively by the full AevumOS Agent Squad

import { foundationsModule } from './curriculum/foundations.js';
import { applicationsModule } from './curriculum/applications.js';
import { agenticModule } from './curriculum/agentic.js';
import { contextMcpModule } from './curriculum/contextMcp.js';
import { cognitiveMemoryModule } from './curriculum/cognitiveMemory.js';
import { squadBlackboardModule } from './curriculum/squadBlackboard.js';

export const curriculumModules = [
  foundationsModule,
  applicationsModule,
  agenticModule,
  contextMcpModule,
  cognitiveMemoryModule,
  squadBlackboardModule
];

// Helper to find a lesson by ID
export const findLessonById = (lessonId) => {
  for (const mod of curriculumModules) {
    const found = mod.lessons.find((l) => l.id === lessonId);
    if (found) {
      return { lesson: found, module: mod };
    }
  }
  return { lesson: curriculumModules[0].lessons[0], module: curriculumModules[0] };
};
