import React from "react";
import Layout from "../components/Layout";

// Trang Thống kê (Stats) — placeholder ban đầu
export default function Stats() {
  return (
    <Layout>
      <div className="space-y-4">
        <section className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <h2 className="text-lg font-semibold text-slate-100">Thống kê</h2>
          <p className="text-slate-400 text-sm">
            Biểu đồ và lịch sử tập luyện sẽ hiển thị ở đây. (Chức năng đang phát
            triển)
          </p>
        </section>
      </div>
    </Layout>
  );
}
