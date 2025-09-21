import fs from "fs"
import path from "path"
import matter from "gray-matter"

const coursesDirectory = path.join(process.cwd(), "public/courses")

export function getAllCourseIds() {
  const fileNames = fs.readdirSync(coursesDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    }
  })
}

export function getSortedCoursesData() {
    const fileNames = fs.readdirSync(coursesDirectory)
    const allCoursesData = fileNames.map((fileName) => {
        try {
            const id = fileName.replace(/\.md$/, "")
            const fullPath = path.join(coursesDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, "utf8")
            const matterResult = matter(fileContents)

            // Count weeks and projects from content
            const weekCount = (matterResult.content.match(/^## Week/gm) || []).length;
            const projectCount = (matterResult.content.match(/^### Project/gm) || []).length;

            const data = matterResult.data as {
                date: string;
                title: string;
                description: string;
                level: string;
                duration: string;
                projects: number;
                students: number;
                rating: number;
                category: string;
                image: string;
                tags: string[];
                id?: any; // Allow id to exist so we can delete it
            }
            delete data.id // Remove the numeric id from frontmatter
            return {
                ...data,
                duration: `${weekCount} Weeks`, // Override duration
                projects: projectCount, // Override projects
                id, // Use the filename-based id
            }
        } catch (error) {
            console.error(`Error parsing frontmatter from ${fileName}:`, error);
            return null;
        }
    }).filter(course => course !== null); // Filter out any nulls from failed parses

    // @ts-ignore
    return allCoursesData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export async function getCourseData(id: string) {
  const fullPath = path.join(coursesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  const data = matterResult.data as { [key: string]: any }
  delete data.id // Remove the numeric id from frontmatter

  // Count weeks and projects from content
  const weekCount = (matterResult.content.match(/^## Week/gm) || []).length;
  const projectCount = (matterResult.content.match(/^### Project/gm) || []).length;

  // Extract sections and exercise counts
  const sections = [];
  let currentSection: { 
      text: string; 
      slug: string; 
      total_exercises: number; 
      learningObjectives: string[];
  } | null = null;
  
  const contentLines = matterResult.content.split('\n');
  let exerciseCount = 0;
  let isCapturingObjectives = false;
  let objectives: string[] = [];

  for (const line of contentLines) {
    if (line.startsWith('## Week')) {
      if (currentSection) {
        sections.push({ ...currentSection, total_exercises: exerciseCount, learningObjectives: objectives });
      }
      const text = line.replace(/## /g, '').trim();
      const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[?:,]/g, '');
      currentSection = { text, slug, total_exercises: 0, learningObjectives: [] };
      exerciseCount = 0;
      objectives = [];
      isCapturingObjectives = false;
    } else if (line.includes('🎯 Your Mission:') || line.includes('🎯 Learning Goals:') || line.includes('🎯 Learning Objectives:')) {
      isCapturingObjectives = true;
    } else if (isCapturingObjectives && (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('-   ') || line.startsWith('*   '))) {
      objectives.push(line.replace(/^[-*]\s+/g, '').replace(/^[-*]\s{3}/g, '').trim());
    } else if (isCapturingObjectives && !(line.startsWith('- ') || line.startsWith('* ') || line.startsWith('-   ') || line.startsWith('*   ')) && line.trim() !== '') {
      isCapturingObjectives = false;
    } else if (line.includes('Hands-on Challenge')) {
      exerciseCount++;
    }
  }
  if (currentSection) {
    sections.push({ ...currentSection, total_exercises: exerciseCount, learningObjectives: objectives });
  }

  // Combine the data with the id and content
  return {
    ...data,
    id,
    content: matterResult.content,
    duration: `${weekCount} Weeks`, // Override duration
    projects: projectCount, // Override projects
    sections,
    title: data.title || '',
    description: data.description || '',
  }
} 