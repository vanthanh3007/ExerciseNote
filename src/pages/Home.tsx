import React, { useState } from "react";
import {
  IconHeart,
  IconMessageCircle,
  IconShare,
  IconDots,
  IconThumbUp,
} from "@tabler/icons-react";
import Layout from "../components/Layout";

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
}

const samplePosts: Post[] = [
  {
    id: "1",
    author: "Gym Tips",
    avatar: "https://ui-avatars.com/api/?name=Gym+Tips&background=10b981&color=fff",
    time: "2 giờ trước",
    content: "💪 Tip hôm nay: Đừng quên uống đủ nước trước, trong và sau khi tập. Cơ thể cần nước để vận chuyển dưỡng chất đến các cơ bắp!",
    likes: 128,
    comments: 23,
    shares: 5,
    liked: false,
  },
  {
    id: "2",
    author: "Fitness Vietnam",
    avatar: "https://ui-avatars.com/api/?name=Fitness+VN&background=3b82f6&color=fff",
    time: "5 giờ trước",
    content: "🏋️ Lịch tập cho người mới bắt đầu:\n\n• Thứ 2: Ngực + Tay sau\n• Thứ 4: Lưng + Tay trước\n• Thứ 6: Chân + Vai\n\nMỗi buổi tập khoảng 45-60 phút là đủ!",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
    likes: 256,
    comments: 45,
    shares: 32,
    liked: true,
  },
  {
    id: "3",
    author: "Nutrition Facts",
    avatar: "https://ui-avatars.com/api/?name=Nutrition&background=f59e0b&color=fff",
    time: "8 giờ trước",
    content: "🥗 Protein cần thiết mỗi ngày:\n\n• Người ít vận động: 0.8g/kg cân nặng\n• Người tập gym: 1.6-2.2g/kg cân nặng\n\nVí dụ: Nếu bạn nặng 70kg và tập gym, bạn cần 112-154g protein/ngày.",
    likes: 89,
    comments: 12,
    shares: 8,
    liked: false,
  },
  {
    id: "4",
    author: "Workout Motivation",
    avatar: "https://ui-avatars.com/api/?name=Workout&background=ef4444&color=fff",
    time: "1 ngày trước",
    content: "\"Cơ thể bạn có thể chịu đựng hầu như mọi thứ. Chính tâm trí bạn mới cần được thuyết phục.\" 🔥\n\nĐừng bỏ cuộc!",
    likes: 512,
    comments: 67,
    shares: 89,
    liked: false,
  },
];

function PostCard({ post, onLike }: { post: Post; onLike: () => void }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold text-slate-100">{post.author}</div>
            <div className="text-xs text-slate-500">{post.time}</div>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-full">
          <IconDots size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-slate-200 whitespace-pre-line">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="w-full">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-slate-500 border-t border-slate-800">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
            <IconThumbUp size={12} className="text-white" />
          </div>
          <span>{post.likes}</span>
        </div>
        <div className="flex gap-3">
          <span>{post.comments} bình luận</span>
          <span>{post.shares} chia sẻ</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-2 py-1 flex border-t border-slate-800">
        <button
          onClick={onLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
            post.liked
              ? "text-emerald-500"
              : "text-slate-400 hover:bg-slate-800"
          }`}
        >
          <IconThumbUp size={20} />
          <span className="text-sm font-medium">Thích</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-slate-400 hover:bg-slate-800">
          <IconMessageCircle size={20} />
          <span className="text-sm font-medium">Bình luận</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-slate-400 hover:bg-slate-800">
          <IconShare size={20} />
          <span className="text-sm font-medium">Chia sẻ</span>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
            />
          ))}
        </div>

        {/* Load more */}
        <div className="text-center py-4">
          <button className="text-emerald-500 text-sm hover:underline">
            Xem thêm bài viết
          </button>
        </div>
      </div>
    </Layout>
  );
}
