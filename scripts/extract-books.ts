/**
 * Book Content Extraction Script
 * Extracts chapter names and text from all books
 * Excludes acts/parts - only chapter name and text
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Chapter {
  name: string;
  text: string;
}

interface Book {
  title: string;
  chapters: Chapter[];
}

const BOOKS_PATH = path.resolve(__dirname, '../../Organized_Books');

function extractChapterName(content: string): string {
  // Find the first # heading (chapter title)
  const match = content.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].trim();
  }
  return 'Untitled';
}

function extractChapterText(content: string): string {
  // Remove the first heading line (chapter title)
  let text = content.replace(/^#\s+.+$/m, '').trim();

  // Remove any "## ACT" or "## PART" headings and their markers
  text = text.replace(/^##\s+(ACT|PART)\s+.+$/gim, '');

  // Remove "## Scene X: Title" headings (Project Chimera)
  text = text.replace(/^##\s+Scene\s+\d+:?\s*.+$/gim, '');

  // Remove any other ## headings that might be scene markers
  text = text.replace(/^##\s+.+$/gm, '');

  // Remove horizontal rules that separate acts/parts/scenes
  text = text.replace(/^---+$/gm, '');

  // Clean up excessive whitespace
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  return text;
}

function readChapterFile(filePath: string): Chapter {
  const content = fs.readFileSync(filePath, 'utf-8');
  return {
    name: extractChapterName(content),
    text: extractChapterText(content)
  };
}

function getChapterOrder(filename: string): number {
  // Handle prologue/epilogue
  if (filename.includes('prologue')) return -1;
  if (filename.includes('epilogue')) return 999;

  // Extract chapter number
  const match = filename.match(/chapter_(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 0;
}

function processBook(bookDir: string, bookTitle: string): Book {
  const files = fs.readdirSync(bookDir)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => getChapterOrder(a) - getChapterOrder(b));

  const chapters: Chapter[] = [];

  for (const file of files) {
    const filePath = path.join(bookDir, file);
    const chapter = readChapterFile(filePath);
    chapters.push(chapter);
  }

  return {
    title: bookTitle,
    chapters
  };
}

function main() {
  const books: Book[] = [];

  // Book 1: The Midnight Sun
  const midnightSunPath = path.join(BOOKS_PATH, 'The_Midnight_Sun');
  if (fs.existsSync(midnightSunPath)) {
    books.push(processBook(midnightSunPath, 'Midnight Sun'));
  }

  // Book 2: Project Chimera
  const chimeraPath = path.join(BOOKS_PATH, 'Project_Chimera');
  if (fs.existsSync(chimeraPath)) {
    books.push(processBook(chimeraPath, 'Project Chimera'));
  }

  // Book 3: Perfect
  const perfectPath = path.join(BOOKS_PATH, 'Perfect');
  if (fs.existsSync(perfectPath)) {
    books.push(processBook(perfectPath, 'PERFECT'));
  }

  // Output summary
  console.log('\n===========================================');
  console.log('           BOOK CONTENT EXTRACTED');
  console.log('===========================================\n');

  for (const book of books) {
    console.log(`\n📖 ${book.title.toUpperCase()}`);
    console.log('─'.repeat(40));

    for (let i = 0; i < book.chapters.length; i++) {
      const chapter = book.chapters[i];
      const wordCount = chapter.text.split(/\s+/).length;
      console.log(`  ${(i + 1).toString().padStart(2, '0')}. ${chapter.name} (${wordCount.toLocaleString()} words)`);
    }
  }

  // Generate TypeScript content file
  const outputPath = path.resolve(__dirname, '../src/content/allBooks.ts');

  const tsContent = `// Auto-generated book content
// Generated on: ${new Date().toISOString()}
// Contains: Chapter Name + Text only (no acts/parts)

export interface Chapter {
  name: string;
  text: string;
}

export interface Book {
  title: string;
  chapters: Chapter[];
}

export const books: Book[] = ${JSON.stringify(books, null, 2)};

// Helper functions
export const getBookByTitle = (title: string): Book | undefined => {
  return books.find(b => b.title.toLowerCase() === title.toLowerCase());
};

export const getAllChapters = (): Array<{ bookTitle: string; chapter: Chapter }> => {
  return books.flatMap(book =>
    book.chapters.map(chapter => ({
      bookTitle: book.title,
      chapter
    }))
  );
};

export const getChapterList = (): Array<{ bookTitle: string; chapterName: string; text: string }> => {
  return books.flatMap(book =>
    book.chapters.map(chapter => ({
      bookTitle: book.title,
      chapterName: chapter.name,
      text: chapter.text
    }))
  );
};
`;

  fs.writeFileSync(outputPath, tsContent);
  console.log(`\n✅ Generated: ${outputPath}`);

  // Also output a simple JSON version
  const jsonPath = path.resolve(__dirname, '../src/content/allBooks.json');
  fs.writeFileSync(jsonPath, JSON.stringify(books, null, 2));
  console.log(`✅ Generated: ${jsonPath}`);

  // Summary stats
  const totalChapters = books.reduce((sum, b) => sum + b.chapters.length, 0);
  const totalWords = books.reduce((sum, b) =>
    sum + b.chapters.reduce((cSum, c) => cSum + c.text.split(/\s+/).length, 0), 0
  );

  console.log('\n===========================================');
  console.log('                 SUMMARY');
  console.log('===========================================');
  console.log(`  Books:    ${books.length}`);
  console.log(`  Chapters: ${totalChapters}`);
  console.log(`  Words:    ${totalWords.toLocaleString()}`);
  console.log('===========================================\n');
}

main();
