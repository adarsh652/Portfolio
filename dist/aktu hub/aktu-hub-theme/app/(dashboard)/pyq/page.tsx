'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  FileText, 
  Calendar,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  FolderOpen,
  ExternalLink,
  Globe
} from 'lucide-react';
import { mockPYQs, subjectsByBranchSemester, branches, semesters, type PYQ, type Subject } from '@/lib/data';

interface UserProfile {
  branch: string;
  semester: number;
  selectedSubjects: string[];
}

type ViewState = 'subjects' | 'years' | 'papers';

export default function PYQPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userSubjects, setUserSubjects] = useState<Subject[]>([]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  
  // Navigation state
  const [viewState, setViewState] = useState<ViewState>('subjects');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  // Browse all filters
  const [browseYear, setBrowseYear] = useState<string>('all');
  const [browseBranch, setBrowseBranch] = useState<string>('all');
  const [browseSemester, setBrowseSemester] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedProfile = localStorage.getItem('aktu-user-profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile) as UserProfile;
      setProfile(parsed);
      
      const allSubjects = subjectsByBranchSemester[parsed.branch]?.[parsed.semester] || [];
      const subjects = allSubjects.filter(s => parsed.selectedSubjects.includes(s.id));
      setUserSubjects(subjects);
    }
    
    const storedBookmarks = localStorage.getItem('aktu-pyq-bookmarks');
    if (storedBookmarks) {
      setBookmarked(JSON.parse(storedBookmarks));
    }
  }, []);

  const toggleBookmark = (id: string) => {
    const newBookmarks = bookmarked.includes(id)
      ? bookmarked.filter(b => b !== id)
      : [...bookmarked, id];
    setBookmarked(newBookmarks);
    localStorage.setItem('aktu-pyq-bookmarks', JSON.stringify(newBookmarks));
  };

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Get subject summary data
  const getSubjectSummary = (subject: Subject) => {
    const subjectPYQs = mockPYQs.filter(p => p.subjectId === subject.id);
    const years = [...new Set(subjectPYQs.map(p => p.year))];
    return {
      yearsAvailable: years.length,
      totalPapers: subjectPYQs.length
    };
  };

  // Get years for a subject
  const getYearsForSubject = (subjectId: string) => {
    const subjectPYQs = mockPYQs.filter(p => p.subjectId === subjectId);
    const yearMap = new Map<number, number>();
    subjectPYQs.forEach(p => {
      yearMap.set(p.year, (yearMap.get(p.year) || 0) + 1);
    });
    return Array.from(yearMap.entries())
      .map(([year, count]) => ({ year, papersCount: count }))
      .sort((a, b) => b.year - a.year);
  };

  // Get papers for a subject and year
  const getPapersForSubjectYear = (subjectId: string, year: number) => {
    return mockPYQs.filter(p => p.subjectId === subjectId && p.year === year);
  };

  // Get all available years
  const allYears = [...new Set(mockPYQs.map(p => p.year))].sort((a, b) => b - a);

  // Get filtered PYQs for browse all
  const getFilteredPYQs = () => {
    let filtered = [...mockPYQs];
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.paperName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (browseYear !== 'all') {
      filtered = filtered.filter(p => p.year.toString() === browseYear);
    }
    
    return filtered;
  };

  // Navigation handlers
  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setViewState('years');
  };

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setViewState('papers');
  };

  const handleBack = () => {
    if (viewState === 'papers') {
      setSelectedYear(null);
      setViewState('years');
    } else if (viewState === 'years') {
      setSelectedSubject(null);
      setViewState('subjects');
    }
  };

  // Subject Card Component
  const SubjectCard = ({ subject }: { subject: Subject }) => {
    const summary = getSubjectSummary(subject);
    return (
      <Card 
        className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
        onClick={() => handleSubjectClick(subject)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-secondary/10 flex-shrink-0">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {subject.name}
              </CardTitle>
              <CardDescription className="mt-1">
                {subject.code}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span>{summary.yearsAvailable} Years Available</span>
            <span>{summary.totalPapers} Papers</span>
          </div>
          <Button className="w-full" size="sm">
            <FolderOpen className="w-4 h-4 mr-2" />
            Open
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Year Card Component
  const YearCard = ({ year, papersCount }: { year: number; papersCount: number }) => (
    <Card 
      className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
      onClick={() => handleYearClick(year)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 flex-shrink-0">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
              {year}
            </CardTitle>
            <CardDescription className="mt-1">
              {papersCount} {papersCount === 1 ? 'Paper' : 'Papers'} Available
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Button className="w-full" size="sm" variant="outline">
          View Papers
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  // Paper Card Component with external links
  const PaperCard = ({ paper }: { paper: PYQ }) => (
    <Card className="bg-card border-border hover:border-primary/50 transition-all flex flex-col h-full overflow-hidden">
      <CardHeader className="pb-2 flex-1">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-secondary/10 flex-shrink-0">
            <FileText className="w-5 h-5 text-secondary" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base text-foreground line-clamp-2">
              {paper.paperName}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-secondary/10 text-secondary text-xs">
                {paper.examType}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {paper.year}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <Globe className="w-3.5 h-3.5" />
              <span>Source: {paper.source}</span>
            </div>
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
              toggleBookmark(paper.id);
            }}
          >
            {bookmarked.includes(paper.id) ? (
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
              openExternalLink(paper.externalLink);
            }}
          >
            <ExternalLink className="w-4 h-4 mr-1.5" />
            <span className="truncate">Open Papers</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Breadcrumb component
  const Breadcrumb = () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <button 
        onClick={() => { setViewState('subjects'); setSelectedSubject(null); setSelectedYear(null); }}
        className="hover:text-foreground transition-colors"
      >
        PYQ
      </button>
      {selectedSubject && (
        <>
          <ChevronRight className="w-4 h-4" />
          <button 
            onClick={() => { setViewState('years'); setSelectedYear(null); }}
            className="hover:text-foreground transition-colors"
          >
            {selectedSubject.name}
          </button>
        </>
      )}
      {selectedYear && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{selectedYear}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Previous Year Papers</h1>
        <p className="text-muted-foreground mt-1">
          Practice with previous year question papers to ace your exams
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="your-subjects" className="space-y-6">
        <TabsList className="bg-card">
          <TabsTrigger value="your-subjects">Your Subjects</TabsTrigger>
          <TabsTrigger value="browse-all">Browse All</TabsTrigger>
        </TabsList>

        {/* Your Subjects Tab */}
        <TabsContent value="your-subjects" className="space-y-4">
          {viewState !== 'subjects' && (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Breadcrumb />
            </div>
          )}

          {/* Subjects View */}
          {viewState === 'subjects' && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Your Subjects</h2>
              {userSubjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userSubjects.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                  ))}
                </div>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      No subjects selected. Please complete your profile setup.
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Years View */}
          {viewState === 'years' && selectedSubject && (
            <>
              <h2 className="text-lg font-semibold text-foreground">
                {selectedSubject.name} - Select Year
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {getYearsForSubject(selectedSubject.id).map(({ year, papersCount }) => (
                  <YearCard key={year} year={year} papersCount={papersCount} />
                ))}
              </div>
            </>
          )}

          {/* Papers View */}
          {viewState === 'papers' && selectedSubject && selectedYear && (
            <>
              <h2 className="text-lg font-semibold text-foreground">
                {selectedSubject.name} - {selectedYear}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getPapersForSubjectYear(selectedSubject.id, selectedYear).map((paper) => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* Browse All Tab */}
        <TabsContent value="browse-all" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={browseBranch} onValueChange={setBrowseBranch}>
                <SelectTrigger className="w-[150px] bg-input border-border">
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
                <SelectTrigger className="w-[140px] bg-input border-border">
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
              <Select value={browseYear} onValueChange={setBrowseYear}>
                <SelectTrigger className="w-[120px] bg-input border-border">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {allYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Browse Results */}
          {getFilteredPYQs().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredPYQs().map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No papers found matching your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
