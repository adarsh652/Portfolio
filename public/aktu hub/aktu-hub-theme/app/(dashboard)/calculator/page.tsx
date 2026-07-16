'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  Plus, 
  Trash2,
  RefreshCw
} from 'lucide-react';
import { grades, gradePoints } from '@/lib/data';

interface SubjectEntry {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

interface SemesterEntry {
  id: string;
  semester: string;
  sgpa: string;
  credits: string;
}

export default function CalculatorPage() {
  // SGPA State
  const [sgpaSubjects, setSgpaSubjects] = useState<SubjectEntry[]>([
    { id: '1', name: '', credits: '', grade: '' },
    { id: '2', name: '', credits: '', grade: '' },
    { id: '3', name: '', credits: '', grade: '' },
  ]);
  const [sgpaResult, setSgpaResult] = useState<number | null>(null);

  // CGPA State
  const [cgpaSemesters, setCgpaSemesters] = useState<SemesterEntry[]>([
    { id: '1', semester: '1', sgpa: '', credits: '' },
    { id: '2', semester: '2', sgpa: '', credits: '' },
  ]);
  const [cgpaResult, setCgpaResult] = useState<number | null>(null);

  // SGPA Functions
  const addSgpaSubject = () => {
    setSgpaSubjects([
      ...sgpaSubjects,
      { id: Date.now().toString(), name: '', credits: '', grade: '' }
    ]);
  };

  const removeSgpaSubject = (id: string) => {
    if (sgpaSubjects.length > 1) {
      setSgpaSubjects(sgpaSubjects.filter(s => s.id !== id));
    }
  };

  const updateSgpaSubject = (id: string, field: keyof SubjectEntry, value: string) => {
    setSgpaSubjects(sgpaSubjects.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const calculateSgpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    for (const subject of sgpaSubjects) {
      const credits = parseFloat(subject.credits);
      const gradePoint = gradePoints[subject.grade];

      if (!isNaN(credits) && gradePoint !== undefined) {
        totalCredits += credits;
        totalPoints += credits * gradePoint;
      }
    }

    if (totalCredits > 0) {
      setSgpaResult(Math.round((totalPoints / totalCredits) * 100) / 100);
    }
  };

  const resetSgpa = () => {
    setSgpaSubjects([
      { id: '1', name: '', credits: '', grade: '' },
      { id: '2', name: '', credits: '', grade: '' },
      { id: '3', name: '', credits: '', grade: '' },
    ]);
    setSgpaResult(null);
  };

  // CGPA Functions
  const addCgpaSemester = () => {
    setCgpaSemesters([
      ...cgpaSemesters,
      { id: Date.now().toString(), semester: (cgpaSemesters.length + 1).toString(), sgpa: '', credits: '' }
    ]);
  };

  const removeCgpaSemester = (id: string) => {
    if (cgpaSemesters.length > 1) {
      setCgpaSemesters(cgpaSemesters.filter(s => s.id !== id));
    }
  };

  const updateCgpaSemester = (id: string, field: keyof SemesterEntry, value: string) => {
    setCgpaSemesters(cgpaSemesters.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const calculateCgpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    for (const semester of cgpaSemesters) {
      const credits = parseFloat(semester.credits);
      const sgpa = parseFloat(semester.sgpa);

      if (!isNaN(credits) && !isNaN(sgpa)) {
        totalCredits += credits;
        totalPoints += credits * sgpa;
      }
    }

    if (totalCredits > 0) {
      setCgpaResult(Math.round((totalPoints / totalCredits) * 100) / 100);
    }
  };

  const resetCgpa = () => {
    setCgpaSemesters([
      { id: '1', semester: '1', sgpa: '', credits: '' },
      { id: '2', semester: '2', sgpa: '', credits: '' },
    ]);
    setCgpaResult(null);
  };

  const getPercentage = (gpa: number) => {
    return ((gpa - 0.75) * 10).toFixed(2);
  };

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">SGPA/CGPA Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate your Semester and Cumulative Grade Point Average
        </p>
      </div>

      {/* Calculator Tabs */}
      <Tabs defaultValue="sgpa" className="space-y-6">
        <TabsList className="bg-card">
          <TabsTrigger value="sgpa">SGPA Calculator</TabsTrigger>
          <TabsTrigger value="cgpa">CGPA Calculator</TabsTrigger>
        </TabsList>

        {/* SGPA Calculator */}
        <TabsContent value="sgpa" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Calculate SGPA</CardTitle>
                  <CardDescription>
                    Enter your subjects, credits, and grades to calculate your SGPA
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject entries */}
              <div className="space-y-3">
                {/* Header row */}
                <div className="hidden md:grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                  <div className="col-span-5">Subject Name</div>
                  <div className="col-span-2">Credits</div>
                  <div className="col-span-4">Grade</div>
                  <div className="col-span-1"></div>
                </div>

                {sgpaSubjects.map((subject, index) => (
                  <div key={subject.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-12 md:col-span-5">
                      <Input
                        placeholder={`Subject ${index + 1}`}
                        value={subject.name}
                        onChange={(e) => updateSgpaSubject(subject.id, 'name', e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="col-span-5 md:col-span-2">
                      <Input
                        type="number"
                        placeholder="Credits"
                        value={subject.credits}
                        onChange={(e) => updateSgpaSubject(subject.id, 'credits', e.target.value)}
                        className="bg-input border-border"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="col-span-5 md:col-span-4">
                      <Select 
                        value={subject.grade} 
                        onValueChange={(value) => updateSgpaSubject(subject.id, 'grade', value)}
                      >
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade} ({gradePoints[grade]} points)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSgpaSubject(subject.id)}
                        disabled={sgpaSubjects.length === 1}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add subject button */}
              <Button variant="outline" onClick={addSgpaSubject} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetSgpa} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={calculateSgpa} className="flex-1">
                  Calculate SGPA
                </Button>
              </div>

              {/* Result */}
              {sgpaResult !== null && (
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground">Your SGPA</p>
                      <p className="text-4xl font-bold text-primary">{sgpaResult}</p>
                      <p className="text-sm text-muted-foreground">
                        Equivalent to {getPercentage(sgpaResult)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* CGPA Calculator */}
        <TabsContent value="cgpa" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Calculator className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <CardTitle>Calculate CGPA</CardTitle>
                  <CardDescription>
                    Enter your semester SGPAs and credits to calculate your CGPA
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Semester entries */}
              <div className="space-y-3">
                {/* Header row */}
                <div className="hidden md:grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                  <div className="col-span-3">Semester</div>
                  <div className="col-span-4">SGPA</div>
                  <div className="col-span-4">Total Credits</div>
                  <div className="col-span-1"></div>
                </div>

                {cgpaSemesters.map((semester) => (
                  <div key={semester.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-12 md:col-span-3">
                      <Input
                        value={`Semester ${semester.semester}`}
                        readOnly
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="col-span-5 md:col-span-4">
                      <Input
                        type="number"
                        placeholder="SGPA"
                        value={semester.sgpa}
                        onChange={(e) => updateCgpaSemester(semester.id, 'sgpa', e.target.value)}
                        className="bg-input border-border"
                        min="0"
                        max="10"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-5 md:col-span-4">
                      <Input
                        type="number"
                        placeholder="Credits"
                        value={semester.credits}
                        onChange={(e) => updateCgpaSemester(semester.id, 'credits', e.target.value)}
                        className="bg-input border-border"
                        min="1"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCgpaSemester(semester.id)}
                        disabled={cgpaSemesters.length === 1}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add semester button */}
              <Button variant="outline" onClick={addCgpaSemester} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Semester
              </Button>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetCgpa} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={calculateCgpa} className="flex-1">
                  Calculate CGPA
                </Button>
              </div>

              {/* Result */}
              {cgpaResult !== null && (
                <Card className="bg-secondary/10 border-secondary/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground">Your CGPA</p>
                      <p className="text-4xl font-bold text-secondary">{cgpaResult}</p>
                      <p className="text-sm text-muted-foreground">
                        Equivalent to {getPercentage(cgpaResult)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Grade Points Reference */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Grade Points Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {grades.map((grade) => (
              <div key={grade} className="text-center p-2 rounded-lg bg-muted">
                <p className="font-semibold text-foreground">{grade}</p>
                <p className="text-sm text-muted-foreground">{gradePoints[grade]}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
