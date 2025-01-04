// components/Comments.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, ThumbsUp, Trash2 } from "lucide-react";

interface Comment {
  id: number;
  text: string;
  author: string;
  email: string;
  date: string;
  likes: number;
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Load comments and liked status from localStorage on mount
  useEffect(() => {
    try {
      const savedComments = localStorage.getItem("comments");
      const savedLikedComments = localStorage.getItem("likedComments");

      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }

      if (savedLikedComments) {
        setLikedComments(new Set(JSON.parse(savedLikedComments)));
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  }, []);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("comments", JSON.stringify(comments));
      localStorage.setItem(
        "likedComments",
        JSON.stringify(Array.from(likedComments))
      );
    } catch (error) {
      console.error("Error saving comments:", error);
    }
  }, [comments, likedComments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim() || !email.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      text: newComment,
      author: name,
      email: email,
      date: new Date().toLocaleString(),
      likes: 0,
    };

    setComments((prevComments) => [...prevComments, comment]);
    setNewComment("");
    setName("");
    setEmail("");
  };

  const handleLike = (commentId: number) => {
    setLikedComments((prevLikedComments) => {
      const newLikedComments = new Set(prevLikedComments);
      if (newLikedComments.has(commentId)) {
        newLikedComments.delete(commentId);
      } else {
        newLikedComments.add(commentId);
      }
      return newLikedComments;
    });

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: likedComments.has(commentId)
                ? comment.likes - 1
                : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleDelete = (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      // Remove from liked comments if exists
      setLikedComments((prevLikedComments) => {
        const newLikedComments = new Set(prevLikedComments);
        newLikedComments.delete(commentId);
        return newLikedComments;
      });
    }
  };

  return (
    <div className="mt-12">
      {/* Comment Form */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-6 h-6" />
            <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Textarea
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full min-h-[100px]"
              required
            />
            <Button type="submit" className="w-full md:w-auto">
              Post Comment
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="w-full">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{comment.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {comment.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {comment.text}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
