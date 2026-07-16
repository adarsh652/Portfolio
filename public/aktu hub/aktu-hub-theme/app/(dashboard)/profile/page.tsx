'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  School, 
  BookOpen, 
  Calendar,
  Edit2,
  Save,
  X
} from 'lucide-react';
import { branches, semesters, subjectsByBranchSemester, type Subject } from '@/lib/data';

interface UserProfile {
  name: string;
  college: string;
  branch: string;
  semester: number;
  selectedSubjects: string[];
  customSubjects: string[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('aktu-user-profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile) as UserProfile;
      setProfile(parsed);
      setEditedProfile(parsed);
      
      const allSubjects = subjectsByBranchSemester[parsed.branch]?.[parsed.semester] || [];
      const userSubjects = allSubjects.filter(s => parsed.selectedSubjects.includes(s.id));
      setSubjects(userSubjects);
    }
  }, []);

  const getBranchLabel = (branchValue: string) => {
    return branches.find(b => b.value === branchValue)?.label || branchValue.toUpperCase();
  };

  const handleSave = () => {
    if (editedProfile) {
      localStorage.setItem('aktu-user-profile', JSON.stringify(editedProfile));
      setProfile(editedProfile);
      setIsEditing(false);
      
      // Update subjects if branch/semester changed
      const allSubjects = subjectsByBranchSemester[editedProfile.branch]?.[editedProfile.semester] || [];
      const userSubjects = allSubjects.filter(s => editedProfile.selectedSubjects.includes(s.id));
      setSubjects(userSubjects);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle>No Profile Found</CardTitle>
            <CardDescription>Please set up your profile first</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/profile-setup')} className="w-full">
              Set Up Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-12 md:pt-0 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <CardDescription>{profile.college}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing && editedProfile ? (
            // Edit mode
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College Name</Label>
                  <Input
                    id="college"
                    value={editedProfile.college}
                    onChange={(e) => setEditedProfile({ ...editedProfile, college: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Select 
                    value={editedProfile.branch} 
                    onValueChange={(value) => setEditedProfile({ ...editedProfile, branch: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
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
                    value={editedProfile.semester.toString()} 
                    onValueChange={(value) => setEditedProfile({ ...editedProfile, semester: parseInt(value) })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
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
              </div>
            </div>
          ) : (
            // View mode
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <School className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-medium text-foreground">{getBranchLabel(profile.branch)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Semester</p>
                  <p className="font-medium text-foreground">Semester {profile.semester}</p>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Selected Subjects */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Selected Subjects
            </h3>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Badge key={subject.id} variant="secondary" className="bg-primary/10 text-primary">
                  {subject.name}
                </Badge>
              ))}
              {profile.customSubjects?.map((subject) => (
                <Badge key={subject} variant="outline">
                  {subject}
                </Badge>
              ))}
              {subjects.length === 0 && !profile.customSubjects?.length && (
                <p className="text-muted-foreground text-sm">No subjects selected</p>
              )}
            </div>
          </div>

          {/* Update subjects link */}
          <Button variant="outline" onClick={() => router.push('/profile-setup')} className="w-full md:w-auto">
            Update Subject Selection
          </Button>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-foreground">{subjects.length + (profile.customSubjects?.length || 0)}</p>
              <p className="text-sm text-muted-foreground">Subjects</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Downloads</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Bookmarks</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-foreground">Semester {profile.semester}</p>
              <p className="text-sm text-muted-foreground">Current</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
