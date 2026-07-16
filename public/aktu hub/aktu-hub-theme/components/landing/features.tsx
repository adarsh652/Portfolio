'use client';

import { BookOpen, FileText, ScrollText, Megaphone, Calculator, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: BookOpen,
    title: 'Notes',
    description: 'Access comprehensive notes for all subjects, organized by semester and branch.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: FileText,
    title: 'Previous Year Papers',
    description: 'Practice with previous year question papers to ace your exams.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: ScrollText,
    title: 'Syllabus',
    description: 'Stay updated with the latest syllabus for your semester and branch.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Megaphone,
    title: 'Results',
    description: 'Check your results and stay informed about academic updates.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Calculator,
    title: 'SGPA/CGPA Calculator',
    description: 'Calculate your SGPA and CGPA with our easy-to-use calculator.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to{' '}
            <span className="text-primary">Excel</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All your academic resources in one place, personalized for your branch and semester.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card 
              key={feature.title}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  {feature.description}
                </CardDescription>
                <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
