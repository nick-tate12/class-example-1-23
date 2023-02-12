import { Request, Response } from 'express';
import { students, addStudent, getStudent, calculateFinalExamScore, getLetterGrade, updateStudentGrade } from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  const studentData = req.body as NewStudentRequest;
  const didAddStudent = addStudent(studentData);

  if (!didAddStudent) {
    res.sendStatus(409);
    return;
  }
  res.sendStatus(201);
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404);
    return;
  }
  res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404);
    return;
  }
  const { currentAverage, weights } = student;

  const gradeA = calculateFinalExamScore(currentAverage, weights.finalExamWeight, 90);
  const gradeB = calculateFinalExamScore(currentAverage, weights.finalExamWeight, 80);
  const gradeC = calculateFinalExamScore(currentAverage, weights.finalExamWeight, 70);
  const gradeD = calculateFinalExamScore(currentAverage, weights.finalExamWeight, 60);

  const finalExamScores: FinalExamScores = {
    neededForA: gradeA,
    neededForB: gradeB,
    neededForC: gradeC,
    neededForD: gradeD
  };
  res.json(finalExamScores);
}

function calcFinalScore(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404);
    return;
  }

  const { grade } = req.body as AssignmentGrade;
  const { currentAverage, weights } = student;
  const overallScore = (currentAverage * (100 - weights.finalExamWeight) + grade * weights.finalExamWeight) / 100;
  const letterGrade = getLetterGrade(overallScore);

  const finalGrade: FinalGrade = { overallScore: overallScore, letterGrade: letterGrade};
  res.json(finalGrade);
}

function updateGrade(req: Request, res: Response): void {
  const { studentName, assignmentName } = req.params as GradeUpdateParams;
  const { grade } = req.body as AssignmentGrade;

  const updatedGrade = updateStudentGrade(studentName, assignmentName, grade);
  if (!updatedGrade) {
    res.sendStatus(404);
    return;
  }
   res.sendStatus(200);
}

export { getAllStudents, createNewStudent, getStudentByName, getFinalExamScores, calcFinalScore, updateGrade};
