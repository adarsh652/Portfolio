'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Bookmark, 
  BookmarkCheck,
  ChevronRight,
  ArrowLeft,
  FolderOpen,
  BookOpen,
  ExternalLink,
  Globe
} from 'lucide-react';
import { unitsBySubject, subjectsByBranchSemester, branches, semesters, type Subject, type Unit } from '@/lib/data';

interface UserProfile {
  branch: string;
  semester: number;
  selectedSubjects: string[];
}

type ViewState = 'subjects' | 'units';

export default function NotesPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userSubjects, setUserSubjects] = useState<Subject[]>([]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  
  // Navigation state
  const [viewState, setViewState] = useState<ViewState>('subjects');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  
  // Browse all filters
  const [browseBranch, setBrowseBranch] = useState<string>('all');
  const [browseSemester, setBrowseSemester] = useState<string>('all');

  useEffect(() => {
    const storedProfile = localStorage.getItem('aktu-user-profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile) as UserProfile;
      setProfile(parsed);
      
      const allSubjects = subjectsByBranchSemester[parsed.branch]?.[parsed.semester] || [];
      const subjects = allSubjects.filter(s => parsed.selectedSubjects.includes(s.id));
      setUserSubjects(subjects);
    }

    const storedBookmarks = localStorage.getItem('aktu-notes-bookmarks');
    if (storedBookmarks) {
      setBookmarked(JSON.parse(storedBookmarks));
    }
  }, []);

  const toggleBookmark = (unitId: string) => {
    const newBookmarks = bookmarked.includes(unitId)
      ? bookmarked.filter(id => id !== unitId)
      : [...bookmarked, unitId];
    
    setBookmarked(newBookmarks);
    localStorage.setItem('aktu-notes-bookmarks', JSON.stringify(newBookmarks));
  };

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setViewState('units');
  };

  const handleBack = () => {
    if (viewState === 'units') {
      setSelectedSubject(null);
      setViewState('subjects');
    }
  };

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Get units for selected subject
  const getUnitsForSubject = (subjectId: string): Unit[] => {
    return unitsBySubject[subjectId] || [];
  };

  // Get all subjects for browsing
  const getAllSubjects = (): Subject[] => {
    const allSubjects: Subject[] = [];
    Object.entries(subjectsByBranchSemester).forEach(([branch, semesters]) => {
      Object.entries(semesters).forEach(([, subjects]) => {
        subjects.forEach(subject => {
          if (browseBranch === 'all' || branch === browseBranch) {
            if (browseSemester === 'all' || subject.semester.toString() === browseSemester) {
              allSubjects.push(subject);
            }
          }
        });
      });
    });
    return allSubjects;
  };

  // Filter subjects by search
  const filterSubjects = (subjects: Subject[]): Subject[] => {
    if (!searchQuery) return subjects;
    return subjects.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Subject Card Component
  const SubjectCard = ({ subject }: { subject: Subject }) => {
    const units = getUnitsForSubject(subject.id);
    
    return (
      <Card className="bg-card border-border hover:border-primary/50 transition-all group cursor-pointer" onClick={() => handleSubjectClick(subject)}>
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {subject.name}
              </CardTitle>
              <CardDescription className="mt-1">{subject.code}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4" />
              <span>{units.length} Units</span>
            </div>
          </div>
          <Button className="w-full" variant="secondary">
            Open Subject
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Unit Card Component with external link
  const UnitCard = ({ unit }: { unit: Unit }) => {
    const isComplete = unit.name === 'Complete Notes';
    
    return (
      <Card className={`bg-card border-border hover:border-primary/50 transition-all flex flex-col h-full overflow-hidden ${isComplete ? 'border-primary/30 bg-primary/5' : ''}`}>
        <CardHeader className="pb-3 flex-1">
          <div className="flex items-start gap-3">
            <div className={`p-3 rounded-xl ${isComplete ? 'bg-primary/20' : 'bg-secondary/50'}`}>
              <FolderOpen className={`w-5 h-5 ${isComplete ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base text-foreground line-clamp-2">
                {unit.name}
              </CardTitle>
              <CardDescription className="mt-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Source: {unit.source}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(unit.id);
              }}
            >
              {bookmarked.includes(unit.id) ? (
                <BookmarkCheck className="w-4 h-4 mr-1.5 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4 mr-1.5" />
              )}
              <span className="truncate">Bookmark</span>
            </Button>
            <Button
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                openExternalLink(unit.externalLink);
              }}
            >
              <ExternalLink className="w-4 h-4 mr-1.5" />
              <span className="truncate">Open Notes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Breadcrumb navigation
  const Breadcrumb = () => (
    <div className="flex items-center gap-2 text-sm mb-6">
      <button 
        onClick={() => { setViewState('subjects'); setSelectedSubject(null); }}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Notes
      </button>
      {selectedSubject && (
        <>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium max-w-[200px] truncate">
            {selectedSubject.name}
          </span>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div className="flex items-center gap-4">
        {viewState !== 'subjects' && (
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {viewState === 'subjects' && 'Notes'}
            {viewState === 'units' && selectedSubject?.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {viewState === 'subjects' && 'Select a subject to view notes'}
            {viewState === 'units' && `${getUnitsForSubject(selectedSubject?.id || '').length} units available`}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      {viewState !== 'subjects' && <Breadcrumb />}

      {/* Search (only on subjects view) */}
      {viewState === 'subjects' && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      )}

      {/* Content based on view state */}
      {viewState === 'subjects' && (
        <Tabs defaultValue="your-subjects" className="space-y-6">
          <TabsList className="bg-card">
            <TabsTrigger value="your-subjects">Your Subjects</TabsTrigger>
            <TabsTrigger value="browse-all">Browse All</TabsTrigger>
          </TabsList>

          <TabsContent value="your-subjects" className="space-y-4">
            {filterSubjects(userSubjects).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterSubjects(userSubjects).map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    {searchQuery ? 'No subjects found matching your search.' : 'No subjects selected. Go to profile setup to select subjects.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="browse-all" className="space-y-4">
            {/* Browse filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={browseBranch} onValueChange={setBrowseBranch}>
                <SelectTrigger className="w-[200px] bg-input border-border">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
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
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((sem) => (
                    <SelectItem key={sem.value} value={sem.value.toString()}>
                      {sem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filterSubjects(getAllSubjects()).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterSubjects(getAllSubjects()).map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No subjects found for the selected filters.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Units View */}
      {viewState === 'units' && selectedSubject && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getUnitsForSubject(selectedSubject.id).map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      )}
    </div>
  );
}
