import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import "./BlogPost.css";

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

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError("Blog ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/blog/${id}`
        );
        const data = await response.json();

        if (data.success) {
          setBlog(data.data);
        } else {
          setError(data.message || "Blog not found");
        }
      } catch (err) {
        setError("Error fetching blog post");
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

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
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || "Blog post not found"}
          </h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-card text-foreground border border-border px-6 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              View All Posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Back Navigation */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Blog Post Content */}
      <article className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Blog Header */}
            <header className="mb-12">
              <div className="blog-meta mb-6">
                <div className="blog-meta-item">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
              </div>

              <h1 className="blog-post-title">{blog.title}</h1>
            </header>

            {/* Featured Image */}
            {blog.image && blog.image.trim() !== "" && (
              <div className="blog-featured-image-container mb-12">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-featured-image"
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="blog-content">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>

            {/* Call to Action */}
            <div className="blog-cta mt-16">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center border border-primary/10">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to start learning?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of learners who are turning passive watching
                  into active progress.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
