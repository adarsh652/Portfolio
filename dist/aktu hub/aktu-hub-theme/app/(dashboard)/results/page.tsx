'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink,
  GraduationCap,
  RefreshCw,
  FileCheck
} from 'lucide-react';

const resultTypes = [
  {
    id: 'regular',
    title: 'Regular Results',
    description: 'View semester examination results for regular students',
    icon: GraduationCap,
    color: 'bg-primary/10 text-primary',
    link: 'https://result.aktu.ac.in/',
  },
  {
    id: 'carryover',
    title: 'Carry-over Results',
    description: 'View carry-over / back paper examination results',
    icon: RefreshCw,
    color: 'bg-secondary/10 text-secondary',
    link: 'https://result.aktu.ac.in/',
  },
  {
    id: 'revaluation',
    title: 'Re-evaluation Results',
    description: 'View re-evaluation and rechecking results',
    icon: FileCheck,
    color: 'bg-amber-500/10 text-amber-500',
    link: 'https://result.aktu.ac.in/',
  },
];

export default function ResultsPage() {
  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Results</h1>
        <p className="text-muted-foreground mt-1">
          Check your examination results on the official AKTU portal
        </p>
      </div>

      {/* Result Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultTypes.map((result) => (
          <Card key={result.id} className="bg-card border-border hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${result.color}`}>
                  <result.icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{result.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {result.description}
              </CardDescription>
              <Button 
                className="w-full" 
                onClick={() => openExternalLink(result.link)}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Result Portal
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Latest Results</h3>
              <p className="text-sm text-muted-foreground">
                Results for Even Semester 2024 examinations have been declared. 
                Check the official portal for your results.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Re-evaluation Process</h3>
              <p className="text-sm text-muted-foreground">
                Apply for revaluation or rechecking within 15 days of result declaration 
                through the official AKTU portal.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Mark Sheet</h3>
              <p className="text-sm text-muted-foreground">
                Original mark sheets can be collected from your college after 
                result declaration.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold text-foreground mb-2">Support</h3>
              <p className="text-sm text-muted-foreground">
                For any result-related queries, contact your college examination cell 
                or AKTU helpdesk.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
