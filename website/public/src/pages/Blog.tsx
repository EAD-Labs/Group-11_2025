import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import "./Blog.css";

interface Blog {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  released: boolean;
  createdAt: string;
  updatedAt: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/blog`
        );
        const data = await response.json();

        if (data.success) {
          setBlogs(data.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError("Error fetching blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover insights, tips, and stories about learning, productivity,
              and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                No blog posts yet
              </h2>
              <p className="text-muted-foreground">
                Check back soon for new content!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog._id} className="blog-card">
                  <div className="blog-image-container">
                    {blog.image && blog.image.trim() !== "" ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="blog-image"
                      />
                    ) : (
                      <div className="blog-placeholder">
                        <div className="blog-placeholder-icon">📝</div>
                      </div>
                    )}
                  </div>

                  <div className="blog-content">
                    <div className="blog-meta">
                      <div className="blog-meta-item">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                    </div>

                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="blog-excerpt">{blog.shortDescription}</p>

                    <Link to={`/blog/${blog._id}`} className="blog-read-more">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
