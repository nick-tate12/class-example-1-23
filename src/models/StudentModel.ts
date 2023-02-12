const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  const totalSum = weights.assignmentWeights.reduce((a, b) => {
    return a + b.grade * b.weight
  }, 0);
  const weightSum = weights.assignmentWeights.reduce((a, b) => {
    return a + b.weight
  }, 0);
  return totalSum / weightSum;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  const { name, weights } = newStudentData;

  if (name in students) {
    return false;
  }

  const avg = calculateAverage(weights);
  const newStudent: Student = {name: name, weights: weights, currentAverage: avg};
  students[name] = newStudent;

  return true
}

function getStudent(studentName: string): Student | undefined {
  if (!(studentName in students)){
    return undefined
  }
  return students[studentName];
}

function calculateFinalExamScore(currentAverage: number, finalExamWeight: number, targetScore: number): number {
  // equation: targetScore = (finalExamWeight * neededFinalExamGrade + (100 - finalExamWeight) * currentAverage) / 100
  // solve for neededFinalExamGrade
  const finalScore = (targetScore * 100 - currentAverage * (100 - finalExamWeight)) / finalExamWeight;
  return finalScore;
}

function getLetterGrade(score: number): string {
  // TODO: Return the appropriate letter grade
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else if (score >= 70) {
    return 'C';
  } else if (score >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

function updateStudentGrade( studentName: string, assignmentName: string, newGrade: number): boolean {
  const student = getStudent(studentName);
  if (!student) {
    console.log("first false");
    return false;
  }

  const assignment = student.weights.assignmentWeights.find((grade) => grade.name === assignmentName);
  console.log("assignment: ", assignment);
  if (!assignment) {
    console.log("second false");
    return false;
  }

  assignment.grade = newGrade;
  student.currentAverage = calculateAverage(student.weights);
  console.log("worked");
  return true;
}

export { students, addStudent, getStudent, calculateFinalExamScore, getLetterGrade, updateStudentGrade };
