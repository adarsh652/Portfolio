'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  FileText, 
  ArrowRight, 
  Bell, 
  Clock,
  TrendingUp
} from 'lucide-react';
import { subjectsByBranchSemester, recentUpdates, branches, type Subject } from '@/lib/data';

interface UserProfile {
  name: string;
  college: string;
  branch: string;
  semester: number;
  selectedSubjects: string[];
  customSubjects: string[];
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('aktu-user-profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile) as UserProfile;
      setProfile(parsed);
      
      // Get subjects based on profile
      const allSubjects = subjectsByBranchSemester[parsed.branch]?.[parsed.semester] || [];
      const userSubjects = allSubjects.filter(s => parsed.selectedSubjects.includes(s.id));
      setSubjects(userSubjects);
    }
  }, []);

  const getBranchLabel = (branchValue: string) => {
    return branches.find(b => b.value === branchValue)?.label || branchValue.toUpperCase();
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Welcome to AKTU Hub</CardTitle>
            <CardDescription>Please set up your profile to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/profile-setup">Set Up Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-12 md:pt-0">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {profile.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            {getBranchLabel(profile.branch)} | Semester {profile.semester}
          </p>
        </div>
        <Button asChild>
          <Link href="/profile">
            Edit Profile
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Subjects', value: subjects.length + (profile.customSubjects?.length || 0), icon: BookOpen, color: 'text-blue-400' },
          { label: 'Total Notes', value: subjects.reduce((acc, s) => acc + s.notesCount, 0), icon: FileText, color: 'text-purple-400' },
          { label: 'PYQs Available', value: subjects.reduce((acc, s) => acc + s.pyqCount, 0), icon: TrendingUp, color: 'text-green-400' },
          { label: 'Bookmarks', value: 0, icon: Bell, color: 'text-yellow-400' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-card ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Your Subjects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Your Subjects</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/browse">
              Browse All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="bg-card border-border hover:border-primary/50 transition-all group cursor-pointer"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                      {subject.name}
                    </CardTitle>
                    <CardDescription>{subject.code}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Sem {subject.semester}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{subject.notesCount} Notes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{subject.pyqCount} PYQs</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <Link href={`/notes?subject=${subject.id}`}>Notes</Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/pyq?subject=${subject.id}`}>PYQs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Custom subjects */}
          {profile.customSubjects?.map((subject) => (
            <Card 
              key={subject} 
              className="bg-card border-border hover:border-primary/50 transition-all group cursor-pointer"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {subject}
                  </CardTitle>
                  <Badge variant="outline">Custom</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Custom subject added by you
                </p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href="/browse">Browse Resources</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Updates</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentUpdates.map((update) => (
                <div key={update.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    update.type === 'note' ? 'bg-blue-500/10 text-blue-400' :
                    update.type === 'pyq' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {update.type === 'note' ? <FileText className="w-4 h-4" /> :
                     update.type === 'pyq' ? <BookOpen className="w-4 h-4" /> :
                     <Bell className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium">{update.title}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{update.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
