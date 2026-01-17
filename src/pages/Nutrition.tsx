import React from "react";
import Layout from "../components/Layout";

// Trang Ăn uống (Nutrition) — placeholder ban đầu
export default function Nutrition() {
  return (
    <Layout>
      <div className="space-y-4">
        <section className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <h2 className="text-lg font-semibold text-slate-100">Ăn uống</h2>
          <p className="text-slate-400 text-sm">
            Ghi chú thực phẩm và calo sẽ được lưu tại đây. (Chức năng đang phát
            triển)
          </p>
        </section>
      </div>
    </Layout>
  );
}
