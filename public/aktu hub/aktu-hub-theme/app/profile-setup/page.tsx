'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, X, Check } from 'lucide-react';
import { branches, semesters, subjectsByBranchSemester, type Subject } from '@/lib/data';

export default function ProfileSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState<number | null>(null);
  
  // Subject selection
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [customSubject, setCustomSubject] = useState('');
  const [customSubjects, setCustomSubjects] = useState<string[]>([]);

  // Fetch subjects when branch and semester change
  useEffect(() => {
    if (branch && semester) {
      const subjects = subjectsByBranchSemester[branch]?.[semester] || [];
      setAvailableSubjects(subjects);
      // Auto-select all subjects by default
      setSelectedSubjects(subjects.map(s => s.id));
    }
  }, [branch, semester]);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleAddCustomSubject = () => {
    if (customSubject.trim() && !customSubjects.includes(customSubject.trim())) {
      setCustomSubjects(prev => [...prev, customSubject.trim()]);
      setCustomSubject('');
    }
  };

  const handleRemoveCustomSubject = (subject: string) => {
    setCustomSubjects(prev => prev.filter(s => s !== subject));
  };

  const handleContinue = () => {
    if (step === 1 && name && college) {
      setStep(2);
    } else if (step === 2 && branch && semester) {
      setStep(3);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Save profile to localStorage (in production, this would be saved to a database)
    const profile = {
      name,
      college,
      branch,
      semester,
      selectedSubjects,
      customSubjects,
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('aktu-user-profile', JSON.stringify(profile));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-lg relative z-10 bg-card/80 backdrop-blur-xl border-border">
        <CardHeader className="text-center">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">AKTU Hub</span>
          </Link>
          
          <CardTitle className="text-2xl">
            {step === 1 && 'Set up your profile'}
            {step === 2 && 'Select your branch & semester'}
            {step === 3 && 'Choose your subjects'}
          </CardTitle>
          <CardDescription>
            {step === 1 && 'Tell us about yourself to personalize your experience'}
            {step === 2 && 'This helps us show you relevant content'}
            {step === 3 && 'Select the subjects you are studying this semester'}
          </CardDescription>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-8 bg-primary' : s < step ? 'w-2 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="college">College Name</Label>
                <Input
                  id="college"
                  placeholder="Enter your college name"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleContinue}
                disabled={!name || !college}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Branch & Semester */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Branch</Label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem key={b.value} value={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Semester</Label>
                <Select 
                  value={semester?.toString() || ''} 
                  onValueChange={(v) => setSemester(parseInt(v))}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select your semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((s) => (
                      <SelectItem key={s.value} value={s.value.toString()}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleContinue}
                  disabled={!branch || !semester}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Subject Selection */}
          {step === 3 && (
            <div className="space-y-4">
              {availableSubjects.length > 0 ? (
                <div className="space-y-3">
                  <Label>Your Subjects</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {availableSubjects.map((subject) => (
                      <div
                        key={subject.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                          selectedSubjects.includes(subject.id)
                            ? 'bg-primary/10 border-primary'
                            : 'bg-card border-border hover:border-muted-foreground'
                        }`}
                        onClick={() => handleSubjectToggle(subject.id)}
                      >
                        <Checkbox
                          checked={selectedSubjects.includes(subject.id)}
                          onCheckedChange={() => handleSubjectToggle(subject.id)}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">{subject.code}</p>
                        </div>
                        {selectedSubjects.includes(subject.id) && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No subjects found for this combination.</p>
                  <p className="text-sm">You can add custom subjects below.</p>
                </div>
              )}

              {/* Custom subjects */}
              <div className="space-y-2">
                <Label>Add Custom Subjects</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter subject name"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSubject()}
                    className="bg-input border-border"
                  />
                  <Button size="icon" onClick={handleAddCustomSubject}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {customSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {customSubjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="pl-3 pr-1 py-1">
                        {subject}
                        <button
                          onClick={() => handleRemoveCustomSubject(subject)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleSave}
                  disabled={loading || (selectedSubjects.length === 0 && customSubjects.length === 0)}
                >
                  {loading ? 'Saving...' : 'Save & Continue'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
