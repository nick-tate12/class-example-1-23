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

export { students, addStudent, getStudent };
