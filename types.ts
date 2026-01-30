export enum GraduationStatus {
  PASS = 'LULUS',
  FAIL = 'TIDAK LULUS',
  PENDING = 'DITUNDA'
}

export interface SubjectGrade {
  subject: string;
  score: number;
}

export interface Student {
  nisn: string;
  examNumber: string;
  name: string;
  birthPlace: string;
  birthDate: string; // YYYY-MM-DD
  className: string; // e.g., XII MIPA 1
  status: GraduationStatus;
  grades: SubjectGrade[];
  photoUrl?: string;
}

export interface SearchParams {
  query: string; // Can be NISN or Exam Number
}