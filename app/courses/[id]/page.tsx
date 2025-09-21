import { getCourseData, getAllCourseIds } from "@/lib/courses";
import CourseContent from "./course-content";
import Link from "next/link";
import Image from "next/image";


export async function generateStaticParams() {
    const paths = getAllCourseIds();
    return paths;
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const courseData = await getCourseData(id);

    if (!courseData) {
        return <div>Course not found.</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 flex flex-col">
             <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/courses" className="flex items-center space-x-2">
                    <Image 
                      src="/edai-logo.svg" 
                      alt="EdAI Logo" 
                      width={48} 
                      height={34}
                      className="mr-1"
                    />
                    <span className="text-xl font-bold text-gray-900">EdAI</span>
                    </Link>
                </div>
                </div>
            </header>
            <CourseContent courseData={courseData} />
        </div>
    );
} 