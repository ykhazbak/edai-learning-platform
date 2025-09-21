"use client";

import { useState, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { BookOpen, CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCourseProgress } from '@/lib/hooks/use-progress';

function romanize(num: number) {
    if (isNaN(num)) return NaN;
    const digits = String(+num).split("");
    const key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                 "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                 "","I","II","III","IV","V","VI","VII","VIII","IX"];
    let roman = "", i = 3;
    while (i--)
        roman = (key[+digits.pop()! + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

const MarkdownContent = ({ content }: { content: string; }) => (
    <ReactMarkdown
        components={{
            h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 border-b-2 border-amber-400 pb-3 text-sky-800" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-8 mb-4 text-sky-700" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-lg text-gray-700" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700" {...props} />,
            a: ({ node, ...props }) => <a className="text-emerald-600 hover:underline" {...props} />,
            code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                return match
                  ? (
                    <pre className="bg-gray-100 text-gray-900 rounded-md p-4 overflow-x-auto mb-4 text-sm">
                      <code {...props} className={className}>
                        {children}
                      </code>
                    </pre>
                    )
                  : (
                    <code {...props} className={`bg-amber-200 text-amber-900 rounded px-1 py-0.5 ${className}`}>
                      {children}
                    </code>
                  );
              },
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-sky-300 pl-4 italic text-gray-600 my-4 bg-sky-50 p-4 rounded-r-lg" {...props} />,
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
    >
        {content}
    </ReactMarkdown>
);

export default function CourseContent({ courseData }: { courseData: any }) {
    const searchParams = useSearchParams();
    const sectionParam = searchParams.get('section');
    
    const [selectedSection, setSelectedSection] = useState(
        sectionParam || courseData.sections[0].slug
    );
    const [completedSections, setCompletedSections] = useState<string[]>([]);
    const [isLessonStarted, setIsLessonStarted] = useState(false);
    const [initialProgressLoaded, setInitialProgressLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession();
    const router = useRouter();
    const { updateProgress } = useCourseProgress(courseData.id);

    useEffect(() => {
        // If the section from the URL is invalid, default to the first section
        const sectionExists = courseData.sections.some((s: any) => s.slug === sectionParam);
        if (sectionParam && !sectionExists) {
            const newUrl = `/courses/${courseData.id}?section=${courseData.sections[0].slug}`;
            router.replace(newUrl, { scroll: false });
            setSelectedSection(courseData.sections[0].slug);
        }
    }, [sectionParam, courseData.id, courseData.sections, router]);

    useEffect(() => {
        const fetchProgress = async () => {
            if (session === undefined) return; 

            if (session?.user && courseData.id) {
                const response = await fetch(`/api/progress/course?courseId=${courseData.id}`);
                if (response.ok) {
                    const progressData = await response.json();
                    if (progressData) {
                        // Only use saved progress if no URL parameter was provided
                        if (progressData.currentSectionSlug && !sectionParam) {
                            setSelectedSection(progressData.currentSectionSlug);
                        }

                        // Reconstruct completed sections based on stored progress percentage
                        // Progress represents the percentage of sections actually completed
                        const completedCount = Math.floor(courseData.sections.length * (progressData.progress / 100));
                        
                        const completed = courseData.sections.slice(0, completedCount).map((s: any) => s.slug);
                        setCompletedSections(completed);
                    }
                }
            }
            setInitialProgressLoaded(true);
            setIsLoading(false);
        };
        fetchProgress();
    }, [session, courseData.id, courseData.sections]);

    useEffect(() => {
        const saveProgress = async () => {
            if (session?.user && courseData.id) {
                // Progress should only reflect completed sections, not current section
                const progress = (completedSections.length / courseData.sections.length) * 100;
                const completed = completedSections.length === courseData.sections.length;

                await updateProgress(
                    courseData.id,
                    progress,
                    completed,
                    selectedSection
                );
            }
        };

        if (initialProgressLoaded) {
            saveProgress();
        }
    }, [session, courseData.id, selectedSection, completedSections, courseData.sections, initialProgressLoaded, updateProgress]);

    const weeklyContent = useMemo(() => {
        // Split content by Week headers specifically
        const weekSections = courseData.content.split(/(?=^## Week)/gm).filter((section: string) => section.trim().length > 0);
        const contentMap: { [key: string]: string } = {};
        
        courseData.sections.forEach((section: any, index: number) => {
            // Find the matching week section (skip the first section which contains frontmatter)
            const weekNumber = index + 1;
            const matchingSection = weekSections.find((weekSection: string) => 
                weekSection.startsWith(`## Week ${weekNumber}:`) || 
                weekSection.startsWith(`## Week ${weekNumber} `)
            );
            if (matchingSection) {
                contentMap[section.slug] = matchingSection;
            } else {
                // Fallback: try to find by section title
                const sectionTitle = section.text.replace(/^Week \d+:\s*/, '');
                const fallbackSection = weekSections.find((weekSection: string) => 
                    weekSection.includes(sectionTitle)
                );
                if (fallbackSection) {
                    contentMap[section.slug] = fallbackSection;
                }
            }
        });
        return contentMap;
    }, [courseData.content, courseData.sections]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const handleSelectSection = async (slug: string) => {
        setSelectedSection(slug);
        setIsLessonStarted(false); // Show Get Started screen for new section
        
        // Update URL to reflect current section
        const newUrl = `/courses/${courseData.id}?section=${slug}`;
        router.replace(newUrl, { scroll: false });
        
        // Update progress - only completed sections count towards progress
        const progressValue = (completedSections.length / courseData.sections.length) * 100;
        await updateProgress(courseData.id, progressValue, completedSections.length === courseData.sections.length, slug);
    };
    
    const handleCompleteSection = async () => {
        let newCompletedSections = [...completedSections];
        if (!newCompletedSections.includes(selectedSection)) {
            newCompletedSections.push(selectedSection);
            setCompletedSections(newCompletedSections);
        }
        const currentIndex = courseData.sections.findIndex((s: any) => s.slug === selectedSection);
        
        if (currentIndex < courseData.sections.length - 1) {
            const nextSlug = courseData.sections[currentIndex + 1].slug;
            // Progress based on actual completed sections
            const progressValue = (newCompletedSections.length / courseData.sections.length) * 100;
            
            setSelectedSection(nextSlug);
            setIsLessonStarted(false);
            
            // Update URL to reflect next section
            const newUrl = `/courses/${courseData.id}?section=${nextSlug}`;
            router.replace(newUrl, { scroll: false });
            
            // Update progress for the completed section and move to the next one
            await updateProgress(courseData.id, progressValue, newCompletedSections.length === courseData.sections.length, nextSlug);
        } else {
            // Course is completed
            await updateProgress(courseData.id, 100, true, selectedSection);
            // Handle course completion logic here
        }
    };

    let currentSectionIndex = courseData.sections.findIndex((s: any) => s.slug === selectedSection);
    // Fallback to the first section if the selected section is not found
    if (currentSectionIndex === -1) {
        currentSectionIndex = 0;
    }
    const currentSectionData = courseData.sections[currentSectionIndex];
    // Calculate progress based on current section position, not just completed sections
    // This gives a more intuitive progress representation
    const baseProgress = Math.max(completedSections.length, currentSectionIndex);
    const progress = Math.min(((baseProgress + 1) / courseData.sections.length) * 100, 100);

    const Header = () => (
        <header className="bg-blue-400 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/courses" className="flex items-center space-x-2 opacity-90 hover:opacity-100">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-semibold">EXIT</span>
                    </Link>
                    <div className="flex items-center space-x-1.5">
                        {[...Array(courseData.sections.length)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-4 h-6" 
                                style={{ 
                                    backgroundColor: i < completedSections.length ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' 
                                }} 
                            />
                        ))}
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">{courseData.title}</p>
                        <p className="text-sm opacity-90">Week {currentSectionIndex + 1} of {courseData.sections.length}</p>
                    </div>
                </div>
            </div>
        </header>
    );

    if (!isLessonStarted) {
        return (
            <div className="flex flex-col flex-1 bg-white min-h-screen">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <h2 className="text-xl font-semibold text-gray-500 uppercase tracking-widest">{courseData.title}</h2>
                    <h1 className="mt-2 text-4xl font-bold text-blue-400 uppercase tracking-wider">{currentSectionData.text}</h1>
                    <p className="mt-6 text-gray-500 font-semibold">WHAT YOU'LL LEARN IN THIS LESSON</p>
                    <div className="mt-8 text-left max-w-2xl w-full mx-auto">
                        <ul className="space-y-4">
                            {currentSectionData.learningObjectives.map((objective: string, index: number) => (
                                <li key={index} className="flex items-start space-x-4 text-lg text-gray-800">
                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <span>{objective}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Button 
                        onClick={() => setIsLessonStarted(true)} 
                        className="mt-12 bg-[#70C44D] hover:bg-[#5a9d3c] text-white font-bold py-4 px-16 rounded-full text-lg uppercase tracking-wider shadow-lg transform hover:scale-105 transition-transform"
                        disabled={isLoading}
                    >
                        Get Started
                    </Button>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 bg-slate-50 min-h-screen">
            <Header />
            <div className="flex flex-1">
                {/* Section Navigation Sidebar */}
                <aside className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Overall Progress</span>
                                <span>{Math.round(progress)}% complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-[#70C44D] h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Lessons</h4>
                        <nav className="space-y-2">
                            {courseData.sections.map((section: any, index: number) => {
                                const isCompleted = completedSections.includes(section.slug);
                                const isCurrent = selectedSection === section.slug;
                                const isAccessible = index === 0 || completedSections.includes(courseData.sections[index - 1].slug);
                                
                                return (
                                    <button
                                        key={section.slug}
                                        onClick={() => isAccessible ? handleSelectSection(section.slug) : null}
                                        disabled={!isAccessible || isLoading}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                                            isCurrent
                                                ? 'bg-blue-400 text-white'
                                                : isCompleted
                                                    ? 'bg-green-50 text-green-800 hover:bg-green-100'
                                                    : isAccessible
                                                        ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                                isCurrent
                                                    ? 'bg-white text-blue-400'
                                                    : isCompleted
                                                        ? 'bg-green-500 text-white'
                                                        : isAccessible
                                                            ? 'bg-gray-300 text-gray-600'
                                                            : 'bg-gray-200 text-gray-400'
                                            }`}>
                                                {isCompleted ? (
                                                    <CheckCircle className="h-4 w-4" />
                                                ) : (
                                                    romanize(index + 1)
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">{section.text}</div>
                                                {isCurrent && (
                                                    <div className="text-xs opacity-90 mt-1">Current Lesson</div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 sm:p-8 md:p-12 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose max-w-none bg-white rounded-xl shadow-lg p-8">
                            <MarkdownContent content={weeklyContent[selectedSection] || ''} />
                        </div>
                        <div className="mt-8 pt-6 flex justify-between items-center">
                            <Button variant="outline" onClick={() => {
                                 if (currentSectionIndex > 0) {
                                     const prevSlug = courseData.sections[currentSectionIndex - 1].slug;
                                     setSelectedSection(prevSlug);
                                     setIsLessonStarted(false);
                                     
                                     // Update URL to reflect previous section
                                     const newUrl = `/courses/${courseData.id}?section=${prevSlug}`;
                                     router.replace(newUrl, { scroll: false });
                                 }
                            }} disabled={currentSectionIndex === 0 || isLoading}>Previous Lesson</Button>
                            <Button onClick={handleCompleteSection} className="bg-[#70C44D] hover:bg-[#5a9d3c] text-white font-bold" disabled={isLoading}>
                                {currentSectionIndex === courseData.sections.length - 1 ? '🎉 Finish Course' : 'Complete & Continue'}
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
} 