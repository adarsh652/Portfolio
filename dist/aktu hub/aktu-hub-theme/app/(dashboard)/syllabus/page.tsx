'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Download, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { subjectsByBranchSemester, branches, semesters, type Subject } from '@/lib/data';

interface UserProfile {
  branch: string;
  semester: number;
  selectedSubjects: string[];
}

// Mock syllabus data
const syllabusUnits = [
  { unit: 1, title: 'Introduction and Fundamentals', topics: ['Basic concepts', 'History and evolution', 'Applications'] },
  { unit: 2, title: 'Core Concepts', topics: ['Theoretical foundations', 'Key principles', 'Problem solving'] },
  { unit: 3, title: 'Advanced Topics', topics: ['Complex systems', 'Modern approaches', 'Case studies'] },
  { unit: 4, title: 'Practical Applications', topics: ['Implementation', 'Real-world examples', 'Best practices'] },
  { unit: 5, title: 'Future Directions', topics: ['Emerging trends', 'Research areas', 'Industry applications'] },
];

export default function SyllabusPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userSubjects, setUserSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [browseBranch, setBrowseBranch] = useState<string>('');
  const [browseSemester, setBrowseSemester] = useState<string>('');
  const [browseSubjects, setBrowseSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('aktu-user-profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile) as UserProfile;
      setProfile(parsed);
      
      const allSubjects = subjectsByBranchSemester[parsed.branch]?.[parsed.semester] || [];
      const subjects = allSubjects.filter(s => parsed.selectedSubjects.includes(s.id));
      setUserSubjects(subjects);
      
      if (subjects.length > 0) {
        setSelectedSubject(subjects[0].id);
      }
    }
  }, []);

  useEffect(() => {
    if (browseBranch && browseSemester) {
      const subjects = subjectsByBranchSemester[browseBranch]?.[parseInt(browseSemester)] || [];
      setBrowseSubjects(subjects);
    }
  }, [browseBranch, browseSemester]);

  const currentSubject = userSubjects.find(s => s.id === selectedSubject);

  const SyllabusContent = ({ subject }: { subject: Subject }) => (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{subject.name}</CardTitle>
              <CardDescription>{subject.code} | Semester {subject.semester}</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {syllabusUnits.map((unit) => (
            <div key={unit.unit} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Unit {unit.unit}
                </Badge>
                <h3 className="font-semibold text-foreground">{unit.title}</h3>
              </div>
              <ul className="space-y-1 ml-4">
                {unit.topics.map((topic, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <ChevronRight className="w-3 h-3" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Syllabus</h1>
        <p className="text-muted-foreground mt-1">
          Stay updated with the latest syllabus for your subjects
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="your-syllabus" className="space-y-6">
        <TabsList className="bg-card">
          <TabsTrigger value="your-syllabus">Your Syllabus</TabsTrigger>
          <TabsTrigger value="browse-all">Browse All</TabsTrigger>
        </TabsList>

        <TabsContent value="your-syllabus" className="space-y-4">
          {userSubjects.length > 0 ? (
            <>
              {/* Subject selector */}
              <div className="flex flex-wrap gap-2">
                {userSubjects.map((subject) => (
                  <Button
                    key={subject.id}
                    variant={selectedSubject === subject.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSubject(subject.id)}
                  >
                    {subject.name}
                  </Button>
                ))}
              </div>

              {currentSubject && <SyllabusContent subject={currentSubject} />}
            </>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No subjects selected. Please update your profile.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="browse-all" className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Select value={browseBranch} onValueChange={setBrowseBranch}>
              <SelectTrigger className="w-[200px] bg-input border-border">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.value} value={branch.value}>
                    {branch.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={browseSemester} onValueChange={setBrowseSemester}>
              <SelectTrigger className="w-[150px] bg-input border-border">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((sem) => (
                  <SelectItem key={sem.value} value={sem.value.toString()}>
                    {sem.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {browseSubjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {browseSubjects.map((subject) => (
                <Card key={subject.id} className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription>{subject.code}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Syllabus
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Select a branch and semester to browse syllabus.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
