import express, { Express } from 'express';
import { getAllStudents ,createNewStudent, getStudentByName } from './controllers/StudentController';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 7420;

app.get('/students', getAllStudents);
app.post('/students', createNewStudent);
app.get('/students/:studentName', getStudentByName);

app.listen(PORT, () => console.log(`Listening on port http://127.0.0.1:${PORT}`));
