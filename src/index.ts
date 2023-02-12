import express, { Express } from 'express';
import {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
} from './controllers/StudentController';

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 7420;

app.get('/', getAllStudents);
app.post('/students', createNewStudent);
app.get('/students/:studentName', getStudentByName);
app.get('/students/:studentName/finalExam', getFinalExamScores);
app.post('/students/:studentName/finalExam', calcFinalScore);
app.post('/students/:studentName/grades/:assignmentName', updateGrade);

app.listen(PORT, () => console.log(`Listening on port http://127.0.0.1:${PORT}`));
