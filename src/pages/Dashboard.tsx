import React from "react";
import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-slate-600">
              Quick summary and analytics will appear here.
            </p>
          </section>

          <section className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">Recent Workouts</h3>
            <p className="text-slate-500">
              No workouts yet — start logging to see progress.
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-medium">Quick Actions</h4>
            <ul className="mt-3 text-sm text-slate-600">
              <li>- Add workout</li>
              <li>- Import/Export</li>
              <li>- View PRs</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-medium">Goals</h4>
            <p className="text-slate-600 text-sm">
              Set training goals and track your weekly frequency.
            </p>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
