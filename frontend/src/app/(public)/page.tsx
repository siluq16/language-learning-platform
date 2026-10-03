import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="glass-panel p-12 rounded-3xl max-w-3xl w-full">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/40 text-brand-dark font-semibold text-sm mb-4 border border-primary/60">
          Nền tảng học ngoại ngữ thế hệ mới
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark mb-6 tracking-tight">
          Chinh phục <span className="text-blue-600">IELTS</span> & <span className="text-red-500">HSK</span> theo lộ trình cá nhân hóa
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
          Đánh giá trình độ đầu vào, luyện tập 4 kỹ năng toàn diện với AI và nhận phản hồi chi tiết từ giáo viên.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/courses"
            className="px-6 py-3.5 rounded-xl bg-brand-dark text-white font-medium shadow-lg hover:bg-brand-purple transition-all duration-200"
          >
            Khám phá khóa học
          </Link>
          <Link
            href="/placement-test"
            className="px-6 py-3.5 rounded-xl glass-card text-brand-dark font-medium border border-primary hover:bg-white transition-all duration-200"
          >
            Làm bài test trình độ
          </Link>
        </div>
      </div>
    </main>
  );
}
