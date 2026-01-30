import { Student, GraduationStatus } from '../types';

// Mock Data
const MOCK_STUDENTS: Student[] = [
  {
    nisn: "1234567890",
    examNumber: "24-01-001",
    name: "Ahmad Santoso",
    birthPlace: "Bojonegoro",
    birthDate: "2006-05-15",
    className: "XII MIPA 1",
    status: GraduationStatus.PASS,
    photoUrl: "https://picsum.photos/200/300",
    grades: [
      { subject: "Pendidikan Agama", score: 88 },
      { subject: "PPKn", score: 90 },
      { subject: "Bahasa Indonesia", score: 85 },
      { subject: "Matematika (Umum)", score: 82 },
      { subject: "Sejarah Indonesia", score: 88 },
      { subject: "Bahasa Inggris", score: 86 },
      { subject: "Seni Budaya", score: 90 },
      { subject: "PJOK", score: 85 },
      { subject: "Prakarya", score: 88 },
      { subject: "Matematika (Peminatan)", score: 80 },
      { subject: "Biologi", score: 84 },
      { subject: "Fisika", score: 81 },
      { subject: "Kimia", score: 83 },
    ]
  },
  {
    nisn: "0987654321",
    examNumber: "24-02-005",
    name: "Siti Aminah",
    birthPlace: "Padangan",
    birthDate: "2006-08-20",
    className: "XII IPS 2",
    status: GraduationStatus.PASS,
    photoUrl: "https://picsum.photos/200/301",
    grades: [
      { subject: "Pendidikan Agama", score: 92 },
      { subject: "PPKn", score: 88 },
      { subject: "Bahasa Indonesia", score: 90 },
      { subject: "Matematika (Umum)", score: 78 },
      { subject: "Sejarah Indonesia", score: 85 },
      { subject: "Bahasa Inggris", score: 89 },
      { subject: "Geografi", score: 88 },
      { subject: "Sejarah", score: 90 },
      { subject: "Sosiologi", score: 91 },
      { subject: "Ekonomi", score: 87 },
    ]
  },
  {
    nisn: "1122334455",
    examNumber: "24-01-010",
    name: "Budi Setiawan",
    birthPlace: "Cepu",
    birthDate: "2005-11-10",
    className: "XII MIPA 3",
    status: GraduationStatus.FAIL,
    photoUrl: "https://picsum.photos/200/302",
    grades: [
      { subject: "Pendidikan Agama", score: 70 },
      { subject: "Matematika (Umum)", score: 45 },
      { subject: "Fisika", score: 50 },
    ]
  }
];

export const getStudentByQuery = async (query: string): Promise<Student | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const cleanQuery = query.trim();
  return MOCK_STUDENTS.find(s => s.nisn === cleanQuery || s.examNumber === cleanQuery) || null;
};

export const getAllStudents = async (): Promise<Student[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_STUDENTS;
}