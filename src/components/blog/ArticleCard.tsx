import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  author: string;
  category: string;
  imageUrl?: string;
  featured?: boolean;
}

const ArticleCard = ({
  title,
  excerpt,
  slug,
  publishedAt,
  readTime,
  author,
  category,
  imageUrl,
  featured = false,
}: ArticleCardProps) => {
  const cardClasses = featured
    ? "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 lg:col-span-2"
    : "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300";

  return (
    <article className={cardClasses}>
      <Link href={`/blog/${slug}`}>
        <div className="relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={featured ? 800 : 400}
              height={featured ? 400 : 200}
              className="w-full h-48 md:h-56 object-cover"
            />
          ) : (
            <div className="w-full h-48 md:h-56 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">{category}</span>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h2 className={`font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors ${
            featured ? 'text-2xl' : 'text-xl'
          }`}>
            {title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(publishedAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;

