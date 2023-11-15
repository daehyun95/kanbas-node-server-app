import { assert } from 'console';

import courses from "./courses.json" assert { type: "json" };
import modules from "./modules.json" assert { type: "json" };
import assignments from "./assignments.json" assert { type: "json" };
import users from "./users.json" assert { type: "json" };
import enrollments from "./enrollments.json" assert { type: "json" };
import grades from "./grades.json" assert { type: "json" };
import quizzes from "./quizzes.json" assert { type: "json" };
import exams from "./exams.json" assert { type: "json" };
import projects from "./projects.json" assert { type: "json" };


export default {
  courses,
  modules,
  assignments,
  quizzes,
  exams,
  users,
  enrollments,
  grades,
  projects
  
};
