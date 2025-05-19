
import { Card } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

const TestimonialCard = ({ quote, author, role, image }: TestimonialCardProps) => {
  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="mb-4 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.685.41-2.205.3-.53.71-.873 1.24-1.03R3.055 11.67c-.42.852-.63 1.717-.63 2.583v.19c0 .852.21 1.627.63 2.326.52.908 1.24 1.363 2.175 1.363 1.003 0 1.74-.287 2.204-.858.465-.57.697-1.252.697-2.047v-.346zm10.15 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.09-1.685.41-2.205.3-.53.71-.873 1.23-1.03L13.192 11.67c-.39.852-.63 1.717-.63 2.583v.19c0 .852.23 1.627.63 2.326.52.908 1.24 1.363 2.177 1.363.993 0 1.73-.287 2.204-.858.485-.57.705-1.252.705-2.047v-.346z" />
        </svg>
      </div>
      
      <p className="italic text-gray-600 mb-6 flex-grow">{quote}</p>
      
      <div className="flex items-center mt-auto">
        {image && (
          <div className="mr-4">
            <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" />
          </div>
        )}
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
