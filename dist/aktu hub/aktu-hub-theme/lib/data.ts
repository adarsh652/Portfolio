// AKTU Hub Data Types and Mock Data

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  branch: string;
  notesCount: number;
  pyqCount: number;
}

export interface Note {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  unitId: string;
  unitName: string;
  downloads: number;
  uploadedAt: string;
  fileType: 'pdf' | 'doc' | 'ppt';
}

export interface Unit {
  id: string;
  name: string;
  subjectId: string;
  notesCount: number;
  externalLink: string;
  source: string;
}

export interface SubjectWithUnits extends Subject {
  units: Unit[];
  totalNotes: number;
}

export interface PYQ {
  id: string;
  subjectId: string;
  subjectName: string;
  year: number;
  semester: number;
  examType: 'Mid Sem' | 'End Sem' | 'Unit Test 1' | 'Unit Test 2' | 'Important Questions';
  paperName: string;
  externalLink: string;
  source: string;
}

export interface PYQYear {
  year: number;
  subjectId: string;
  papersCount: number;
}

export interface SubjectPYQSummary {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  yearsAvailable: number;
  totalPapers: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  semester: number;
  selectedSubjects: string[];
  bookmarks: string[];
}

// Branch options
export const branches = [
  { value: 'cse', label: 'Computer Science & Engineering' },
  { value: 'it', label: 'Information Technology' },
  { value: 'ece', label: 'Electronics & Communication' },
  { value: 'ee', label: 'Electrical Engineering' },
  { value: 'me', label: 'Mechanical Engineering' },
  { value: 'ce', label: 'Civil Engineering' },
];

// Semester options
export const semesters = [
  { value: 1, label: 'Semester 1' },
  { value: 2, label: 'Semester 2' },
  { value: 3, label: 'Semester 3' },
  { value: 4, label: 'Semester 4' },
  { value: 5, label: 'Semester 5' },
  { value: 6, label: 'Semester 6' },
  { value: 7, label: 'Semester 7' },
  { value: 8, label: 'Semester 8' },
];

// Subjects by branch and semester
export const subjectsByBranchSemester: Record<string, Record<number, Subject[]>> = {
  cse: {
    1: [
      { id: 'cse-1-1', name: 'Mathematics-I', code: 'KAS101', semester: 1, branch: 'cse', notesCount: 15, pyqCount: 8 },
      { id: 'cse-1-2', name: 'Physics', code: 'KAS102', semester: 1, branch: 'cse', notesCount: 12, pyqCount: 6 },
      { id: 'cse-1-3', name: 'Chemistry', code: 'KAS103', semester: 1, branch: 'cse', notesCount: 10, pyqCount: 5 },
      { id: 'cse-1-4', name: 'English', code: 'KAS104', semester: 1, branch: 'cse', notesCount: 8, pyqCount: 4 },
      { id: 'cse-1-5', name: 'Programming in C', code: 'KCS101', semester: 1, branch: 'cse', notesCount: 20, pyqCount: 10 },
    ],
    6: [
      { id: 'cse-6-1', name: 'Computer Networks', code: 'KCS601', semester: 6, branch: 'cse', notesCount: 25, pyqCount: 12 },
      { id: 'cse-6-2', name: 'Operating Systems', code: 'KCS602', semester: 6, branch: 'cse', notesCount: 22, pyqCount: 10 },
      { id: 'cse-6-3', name: 'Database Management Systems', code: 'KCS603', semester: 6, branch: 'cse', notesCount: 28, pyqCount: 14 },
      { id: 'cse-6-4', name: 'Compiler Design', code: 'KCS604', semester: 6, branch: 'cse', notesCount: 18, pyqCount: 8 },
      { id: 'cse-6-5', name: 'Software Engineering', code: 'KCS605', semester: 6, branch: 'cse', notesCount: 20, pyqCount: 9 },
    ],
  },
  it: {
    6: [
      { id: 'it-6-1', name: 'Web Technology', code: 'KIT601', semester: 6, branch: 'it', notesCount: 20, pyqCount: 10 },
      { id: 'it-6-2', name: 'Information Security', code: 'KIT602', semester: 6, branch: 'it', notesCount: 18, pyqCount: 8 },
      { id: 'it-6-3', name: 'Data Mining', code: 'KIT603', semester: 6, branch: 'it', notesCount: 15, pyqCount: 7 },
    ],
  },
};

// Units by subject with external links
export const unitsBySubject: Record<string, Unit[]> = {
  'cse-6-1': [
    { id: 'cse-6-1-u1', name: 'Unit 1 - Introduction to Networks', subjectId: 'cse-6-1', notesCount: 5, externalLink: 'https://www.geeksforgeeks.org/computer-network-tutorials/', source: 'GeeksforGeeks' },
    { id: 'cse-6-1-u2', name: 'Unit 2 - OSI & TCP/IP Model', subjectId: 'cse-6-1', notesCount: 6, externalLink: 'https://www.javatpoint.com/osi-model', source: 'JavaTPoint' },
    { id: 'cse-6-1-u3', name: 'Unit 3 - Data Link Layer', subjectId: 'cse-6-1', notesCount: 4, externalLink: 'https://www.tutorialspoint.com/data_communication_computer_network/data_link_layer_introduction.htm', source: 'TutorialsPoint' },
    { id: 'cse-6-1-u4', name: 'Unit 4 - Network Layer', subjectId: 'cse-6-1', notesCount: 5, externalLink: 'https://www.geeksforgeeks.org/network-layer-services-packetizing-routing-and-forwarding/', source: 'GeeksforGeeks' },
    { id: 'cse-6-1-u5', name: 'Unit 5 - Transport & Application Layer', subjectId: 'cse-6-1', notesCount: 5, externalLink: 'https://www.javatpoint.com/transport-layer', source: 'JavaTPoint' },
    { id: 'cse-6-1-complete', name: 'Complete Notes', subjectId: 'cse-6-1', notesCount: 1, externalLink: 'https://aktu.ac.in/', source: 'AKTU Notes Library' },
  ],
  'cse-6-2': [
    { id: 'cse-6-2-u1', name: 'Unit 1 - Introduction to OS', subjectId: 'cse-6-2', notesCount: 4, externalLink: 'https://www.geeksforgeeks.org/introduction-of-operating-system-set-1/', source: 'GeeksforGeeks' },
    { id: 'cse-6-2-u2', name: 'Unit 2 - Process Management', subjectId: 'cse-6-2', notesCount: 5, externalLink: 'https://www.javatpoint.com/os-process-management-introduction', source: 'JavaTPoint' },
    { id: 'cse-6-2-u3', name: 'Unit 3 - Memory Management', subjectId: 'cse-6-2', notesCount: 4, externalLink: 'https://www.tutorialspoint.com/operating_system/os_memory_management.htm', source: 'TutorialsPoint' },
    { id: 'cse-6-2-u4', name: 'Unit 4 - File Systems', subjectId: 'cse-6-2', notesCount: 4, externalLink: 'https://www.geeksforgeeks.org/file-systems-in-operating-system/', source: 'GeeksforGeeks' },
    { id: 'cse-6-2-u5', name: 'Unit 5 - I/O & Security', subjectId: 'cse-6-2', notesCount: 5, externalLink: 'https://www.javatpoint.com/os-io-hardware', source: 'JavaTPoint' },
    { id: 'cse-6-2-complete', name: 'Complete Notes', subjectId: 'cse-6-2', notesCount: 1, externalLink: 'https://aktu.ac.in/', source: 'AKTU Notes Library' },
  ],
  'cse-6-3': [
    { id: 'cse-6-3-u1', name: 'Unit 1 - Introduction to DBMS', subjectId: 'cse-6-3', notesCount: 5, externalLink: 'https://www.geeksforgeeks.org/introduction-of-dbms-database-management-system-set-1/', source: 'GeeksforGeeks' },
    { id: 'cse-6-3-u2', name: 'Unit 2 - ER Model & Relational Model', subjectId: 'cse-6-3', notesCount: 6, externalLink: 'https://www.javatpoint.com/dbms-er-model-concept', source: 'JavaTPoint' },
    { id: 'cse-6-3-u3', name: 'Unit 3 - SQL & Query Processing', subjectId: 'cse-6-3', notesCount: 6, externalLink: 'https://www.w3schools.com/sql/', source: 'W3Schools' },
    { id: 'cse-6-3-u4', name: 'Unit 4 - Transaction & Concurrency', subjectId: 'cse-6-3', notesCount: 5, externalLink: 'https://www.geeksforgeeks.org/concurrency-control-in-dbms/', source: 'GeeksforGeeks' },
    { id: 'cse-6-3-u5', name: 'Unit 5 - Normalization & Recovery', subjectId: 'cse-6-3', notesCount: 6, externalLink: 'https://www.javatpoint.com/dbms-normalization', source: 'JavaTPoint' },
    { id: 'cse-6-3-complete', name: 'Complete Notes', subjectId: 'cse-6-3', notesCount: 1, externalLink: 'https://aktu.ac.in/', source: 'AKTU Notes Library' },
  ],
  'cse-6-4': [
    { id: 'cse-6-4-u1', name: 'Unit 1 - Introduction to Compilers', subjectId: 'cse-6-4', notesCount: 3, externalLink: 'https://www.geeksforgeeks.org/introduction-of-compiler-design/', source: 'GeeksforGeeks' },
    { id: 'cse-6-4-u2', name: 'Unit 2 - Lexical Analysis', subjectId: 'cse-6-4', notesCount: 4, externalLink: 'https://www.javatpoint.com/lexical-analysis', source: 'JavaTPoint' },
    { id: 'cse-6-4-u3', name: 'Unit 3 - Syntax Analysis', subjectId: 'cse-6-4', notesCount: 4, externalLink: 'https://www.tutorialspoint.com/compiler_design/compiler_design_syntax_analysis.htm', source: 'TutorialsPoint' },
    { id: 'cse-6-4-u4', name: 'Unit 4 - Semantic Analysis', subjectId: 'cse-6-4', notesCount: 3, externalLink: 'https://www.geeksforgeeks.org/semantic-analysis-in-compiler-design/', source: 'GeeksforGeeks' },
    { id: 'cse-6-4-u5', name: 'Unit 5 - Code Generation', subjectId: 'cse-6-4', notesCount: 4, externalLink: 'https://www.javatpoint.com/code-generation', source: 'JavaTPoint' },
    { id: 'cse-6-4-complete', name: 'Complete Notes', subjectId: 'cse-6-4', notesCount: 1, externalLink: 'https://aktu.ac.in/', source: 'AKTU Notes Library' },
  ],
  'cse-6-5': [
    { id: 'cse-6-5-u1', name: 'Unit 1 - Software Process Models', subjectId: 'cse-6-5', notesCount: 4, externalLink: 'https://www.geeksforgeeks.org/software-engineering-software-process-models/', source: 'GeeksforGeeks' },
    { id: 'cse-6-5-u2', name: 'Unit 2 - Requirements Engineering', subjectId: 'cse-6-5', notesCount: 4, externalLink: 'https://www.javatpoint.com/software-engineering-requirement-engineering', source: 'JavaTPoint' },
    { id: 'cse-6-5-u3', name: 'Unit 3 - Design Concepts', subjectId: 'cse-6-5', notesCount: 4, externalLink: 'https://www.tutorialspoint.com/software_engineering/software_design_basics.htm', source: 'TutorialsPoint' },
    { id: 'cse-6-5-u4', name: 'Unit 4 - Testing Strategies', subjectId: 'cse-6-5', notesCount: 4, externalLink: 'https://www.geeksforgeeks.org/software-testing-strategies/', source: 'GeeksforGeeks' },
    { id: 'cse-6-5-u5', name: 'Unit 5 - Project Management', subjectId: 'cse-6-5', notesCount: 4, externalLink: 'https://www.javatpoint.com/software-project-management', source: 'JavaTPoint' },
    { id: 'cse-6-5-complete', name: 'Complete Notes', subjectId: 'cse-6-5', notesCount: 1, externalLink: 'https://aktu.ac.in/', source: 'AKTU Notes Library' },
  ],
};

// Mock PYQs data with external links
export const mockPYQs: PYQ[] = [
  // Computer Networks
  { id: 'p1', subjectId: 'cse-6-1', subjectName: 'Computer Networks', year: 2024, semester: 6, examType: 'Mid Sem', paperName: 'Mid Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p2', subjectId: 'cse-6-1', subjectName: 'Computer Networks', year: 2024, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p3', subjectId: 'cse-6-1', subjectName: 'Computer Networks', year: 2024, semester: 6, examType: 'Important Questions', paperName: 'Important Questions', externalLink: 'https://www.studocu.com/', source: 'Studocu' },
  { id: 'p4', subjectId: 'cse-6-1', subjectName: 'Computer Networks', year: 2023, semester: 6, examType: 'Mid Sem', paperName: 'Mid Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p5', subjectId: 'cse-6-1', subjectName: 'Computer Networks', year: 2023, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p6', subjectId: 'cse-6-1', subjectName: 'Computer Networks', year: 2022, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p7', subjectId: 'cse-6-1', subjectName: 'Computer Networks', year: 2021, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  
  // Operating Systems
  { id: 'p8', subjectId: 'cse-6-2', subjectName: 'Operating Systems', year: 2024, semester: 6, examType: 'Mid Sem', paperName: 'Mid Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p9', subjectId: 'cse-6-2', subjectName: 'Operating Systems', year: 2024, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p10', subjectId: 'cse-6-2', subjectName: 'Operating Systems', year: 2024, semester: 6, examType: 'Important Questions', paperName: 'Important Questions', externalLink: 'https://www.studocu.com/', source: 'Studocu' },
  { id: 'p11', subjectId: 'cse-6-2', subjectName: 'Operating Systems', year: 2023, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p12', subjectId: 'cse-6-2', subjectName: 'Operating Systems', year: 2022, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  
  // Database Management Systems
  { id: 'p13', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', year: 2024, semester: 6, examType: 'Mid Sem', paperName: 'Mid Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p14', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', year: 2024, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p15', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', year: 2024, semester: 6, examType: 'Important Questions', paperName: 'Important Questions', externalLink: 'https://www.studocu.com/', source: 'Studocu' },
  { id: 'p16', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', year: 2023, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p17', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', year: 2022, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  
  // Compiler Design
  { id: 'p18', subjectId: 'cse-6-4', subjectName: 'Compiler Design', year: 2024, semester: 6, examType: 'Mid Sem', paperName: 'Mid Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p19', subjectId: 'cse-6-4', subjectName: 'Compiler Design', year: 2024, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p20', subjectId: 'cse-6-4', subjectName: 'Compiler Design', year: 2024, semester: 6, examType: 'Important Questions', paperName: 'Important Questions', externalLink: 'https://www.studocu.com/', source: 'Studocu' },
  { id: 'p21', subjectId: 'cse-6-4', subjectName: 'Compiler Design', year: 2023, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  
  // Software Engineering
  { id: 'p22', subjectId: 'cse-6-5', subjectName: 'Software Engineering', year: 2024, semester: 6, examType: 'Mid Sem', paperName: 'Mid Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p23', subjectId: 'cse-6-5', subjectName: 'Software Engineering', year: 2024, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
  { id: 'p24', subjectId: 'cse-6-5', subjectName: 'Software Engineering', year: 2024, semester: 6, examType: 'Important Questions', paperName: 'Important Questions', externalLink: 'https://www.studocu.com/', source: 'Studocu' },
  { id: 'p25', subjectId: 'cse-6-5', subjectName: 'Software Engineering', year: 2023, semester: 6, examType: 'End Sem', paperName: 'End Semester Examination', externalLink: 'https://aktu.ac.in/pyq', source: 'AKTU PYQ Portal' },
];

// Recent updates
export const recentUpdates = [
  { id: 'u1', type: 'note', title: 'New notes uploaded for Computer Networks Unit 3', time: '2 hours ago' },
  { id: 'u2', type: 'pyq', title: '2023 PYQ added for DBMS', time: '5 hours ago' },
  { id: 'u3', type: 'notice', title: 'Exam schedule released for Even Semester 2024', time: '1 day ago' },
  { id: 'u4', type: 'note', title: 'Operating Systems complete notes available', time: '2 days ago' },
];

// Grade points for SGPA/CGPA calculation
export const gradePoints: Record<string, number> = {
  'A+': 10,
  'A': 9,
  'B+': 8,
  'B': 7,
  'C+': 6,
  'C': 5,
  'D': 4,
  'F': 0,
};

export const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];

// Mock Notes data for bookmarks functionality
export const mockNotes: Note[] = [
  // Computer Networks notes
  { id: 'n1', title: 'Introduction to Networks', subjectId: 'cse-6-1', subjectName: 'Computer Networks', unitId: 'cse-6-1-u1', unitName: 'Unit 1 - Introduction to Networks', downloads: 245, uploadedAt: '2024-02-15', fileType: 'pdf' },
  { id: 'n2', title: 'OSI & TCP/IP Model Complete Notes', subjectId: 'cse-6-1', subjectName: 'Computer Networks', unitId: 'cse-6-1-u2', unitName: 'Unit 2 - OSI & TCP/IP Model', downloads: 312, uploadedAt: '2024-02-10', fileType: 'pdf' },
  { id: 'n3', title: 'Data Link Layer Protocols', subjectId: 'cse-6-1', subjectName: 'Computer Networks', unitId: 'cse-6-1-u3', unitName: 'Unit 3 - Data Link Layer', downloads: 189, uploadedAt: '2024-01-25', fileType: 'pdf' },
  { id: 'n4', title: 'Network Layer & Routing', subjectId: 'cse-6-1', subjectName: 'Computer Networks', unitId: 'cse-6-1-u4', unitName: 'Unit 4 - Network Layer', downloads: 276, uploadedAt: '2024-01-20', fileType: 'pdf' },
  { id: 'n5', title: 'Transport & Application Layer', subjectId: 'cse-6-1', subjectName: 'Computer Networks', unitId: 'cse-6-1-u5', unitName: 'Unit 5 - Transport & Application Layer', downloads: 198, uploadedAt: '2024-01-15', fileType: 'pdf' },
  
  // Operating Systems notes
  { id: 'n6', title: 'Introduction to Operating Systems', subjectId: 'cse-6-2', subjectName: 'Operating Systems', unitId: 'cse-6-2-u1', unitName: 'Unit 1 - Introduction to OS', downloads: 356, uploadedAt: '2024-02-12', fileType: 'pdf' },
  { id: 'n7', title: 'Process Management & Scheduling', subjectId: 'cse-6-2', subjectName: 'Operating Systems', unitId: 'cse-6-2-u2', unitName: 'Unit 2 - Process Management', downloads: 421, uploadedAt: '2024-02-08', fileType: 'pdf' },
  { id: 'n8', title: 'Memory Management Techniques', subjectId: 'cse-6-2', subjectName: 'Operating Systems', unitId: 'cse-6-2-u3', unitName: 'Unit 3 - Memory Management', downloads: 287, uploadedAt: '2024-01-28', fileType: 'pdf' },
  { id: 'n9', title: 'File Systems & Storage', subjectId: 'cse-6-2', subjectName: 'Operating Systems', unitId: 'cse-6-2-u4', unitName: 'Unit 4 - File Systems', downloads: 234, uploadedAt: '2024-01-22', fileType: 'pdf' },
  { id: 'n10', title: 'I/O & Security Concepts', subjectId: 'cse-6-2', subjectName: 'Operating Systems', unitId: 'cse-6-2-u5', unitName: 'Unit 5 - I/O & Security', downloads: 178, uploadedAt: '2024-01-18', fileType: 'pdf' },
  
  // DBMS notes
  { id: 'n11', title: 'Introduction to DBMS', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', unitId: 'cse-6-3-u1', unitName: 'Unit 1 - Introduction to DBMS', downloads: 445, uploadedAt: '2024-02-14', fileType: 'pdf' },
  { id: 'n12', title: 'ER Model & Relational Model', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', unitId: 'cse-6-3-u2', unitName: 'Unit 2 - ER Model & Relational Model', downloads: 389, uploadedAt: '2024-02-09', fileType: 'pdf' },
  { id: 'n13', title: 'SQL Complete Guide', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', unitId: 'cse-6-3-u3', unitName: 'Unit 3 - SQL & Query Processing', downloads: 512, uploadedAt: '2024-01-30', fileType: 'pdf' },
  { id: 'n14', title: 'Transaction & Concurrency Control', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', unitId: 'cse-6-3-u4', unitName: 'Unit 4 - Transaction & Concurrency', downloads: 267, uploadedAt: '2024-01-24', fileType: 'pdf' },
  { id: 'n15', title: 'Normalization & Recovery', subjectId: 'cse-6-3', subjectName: 'Database Management Systems', unitId: 'cse-6-3-u5', unitName: 'Unit 5 - Normalization & Recovery', downloads: 298, uploadedAt: '2024-01-19', fileType: 'pdf' },
  
  // Compiler Design notes
  { id: 'n16', title: 'Introduction to Compilers', subjectId: 'cse-6-4', subjectName: 'Compiler Design', unitId: 'cse-6-4-u1', unitName: 'Unit 1 - Introduction to Compilers', downloads: 156, uploadedAt: '2024-02-11', fileType: 'pdf' },
  { id: 'n17', title: 'Lexical Analysis', subjectId: 'cse-6-4', subjectName: 'Compiler Design', unitId: 'cse-6-4-u2', unitName: 'Unit 2 - Lexical Analysis', downloads: 189, uploadedAt: '2024-02-06', fileType: 'pdf' },
  { id: 'n18', title: 'Syntax Analysis & Parsing', subjectId: 'cse-6-4', subjectName: 'Compiler Design', unitId: 'cse-6-4-u3', unitName: 'Unit 3 - Syntax Analysis', downloads: 212, uploadedAt: '2024-01-27', fileType: 'pdf' },
  
  // Software Engineering notes
  { id: 'n19', title: 'Software Process Models', subjectId: 'cse-6-5', subjectName: 'Software Engineering', unitId: 'cse-6-5-u1', unitName: 'Unit 1 - Software Process Models', downloads: 234, uploadedAt: '2024-02-13', fileType: 'pdf' },
  { id: 'n20', title: 'Requirements Engineering', subjectId: 'cse-6-5', subjectName: 'Software Engineering', unitId: 'cse-6-5-u2', unitName: 'Unit 2 - Requirements Engineering', downloads: 198, uploadedAt: '2024-02-07', fileType: 'pdf' },
];
