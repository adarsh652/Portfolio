'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Bookmark,
  Trash2
} from 'lucide-react';
import { mockNotes, type Note } from '@/lib/data';

export default function BookmarksPage() {
  const [bookmarkedNotes, setBookmarkedNotes] = useState<Note[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('aktu-bookmarks');
    if (storedBookmarks) {
      const bookmarkIds = JSON.parse(storedBookmarks) as string[];
      setBookmarks(bookmarkIds);
      const notes = mockNotes.filter(note => bookmarkIds.includes(note.id));
      setBookmarkedNotes(notes);
    }
  }, []);

  const removeBookmark = (noteId: string) => {
    const newBookmarks = bookmarks.filter(id => id !== noteId);
    setBookmarks(newBookmarks);
    localStorage.setItem('aktu-bookmarks', JSON.stringify(newBookmarks));
    setBookmarkedNotes(bookmarkedNotes.filter(note => note.id !== noteId));
  };

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bookmarks</h1>
        <p className="text-muted-foreground mt-1">
          Your saved notes and resources
        </p>
      </div>

      {/* Bookmarked Items */}
      {bookmarkedNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarkedNotes.map((note) => (
            <Card key={note.id} className="bg-card border-border hover:border-primary/50 transition-all group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-foreground group-hover:text-primary transition-colors">
                        {note.title}
                      </CardTitle>
                      <CardDescription>{note.subjectName}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeBookmark(note.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{note.downloads} downloads</span>
                  </div>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bookmark className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No bookmarks yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Start bookmarking notes and resources to access them quickly later. 
              Click the bookmark icon on any note to save it here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
