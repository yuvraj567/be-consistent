// src/App.js
import React, { useEffect, useState } from "react";

const AUTH_HEADER = "ApiKey theConqueror:1e0c800b85fdf2e2ce5348b668f376e1f7c9e721";
const BASE_URL = "https://clist.by:443/api/v4/contest/?limit=10&upcoming=true&format_time=true";

const PLATFORMS = [
  { key: "codeforces", name: "Codeforces", url: "codeforces.com", color: "#1f8ac0", icon: "🧠" },
  { key: "codechef", name: "CodeChef", url: "codechef.com", color: "#703600", icon: "👨‍🍳" },
  { key: "leetcode", name: "LeetCode", url: "leetcode.com", color: "#f89f1b", icon: "🏢" },
  { key: "atcoder", name: "AtCoder", url: "atcoder.jp", color: "#444444", icon: "🅰️" },
];

function formatSeconds(seconds) {
  if (!seconds || isNaN(seconds) || seconds <= 0) return "N/A";
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const parts = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  return parts.join(" ") || "0m";
}

function safeFormatDate(contest) {
  const s = contest.start_time || contest.start;
  if (!s) return "N/A";
  const maybeDate = new Date(s);
  if (!isNaN(maybeDate.getTime())) return maybeDate.toLocaleString();
  return String(s);
}

export default function App() {
  const [contests, setContests] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePlatform, setActivePlatform] = useState("all");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchPromises = PLATFORMS.map((p) => {
          const url = `${BASE_URL}&resource=${encodeURIComponent(p.url)}`;
          return fetch(url, { headers: { Authorization: AUTH_HEADER } }).then((res) => {
            if (!res.ok) throw new Error(`${p.name} fetch failed (${res.status})`);
            return res.json();
          });
        });

        const results = await Promise.allSettled(fetchPromises);
        const data = {};
        const errors = [];
        results.forEach((r, i) => {
          const platformKey = PLATFORMS[i].key;
          if (r.status === "fulfilled" && r.value && Array.isArray(r.value.objects)) {
            data[platformKey] = r.value.objects;
          } else {
            data[platformKey] = [];
            if (r.status === "rejected") errors.push(`${PLATFORMS[i].name}: ${r.reason}`);
          }
        });
        setContests(data);
        if (errors.length) setError(errors.join("; "));
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filteredContests = activePlatform === "all"
    ? PLATFORMS.flatMap(p => contests[p.key] || []).sort((a, b) => new Date(a.start_time || a.start) - new Date(b.start_time || b.start))
    : contests[activePlatform] || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-24 shadow-lg">
        <h1 className="text-4xl font-bold">Upcoming Coding Contests</h1>
        <p className="mt-2 text-lg opacity-90">Never miss an important programming competition again</p>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Platform Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${activePlatform === "all" ? "bg-indigo-600 text-white shadow-lg" : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow"}`}
            onClick={() => setActivePlatform("all")}
          >
            All Platforms
          </button>
          {PLATFORMS.map(p => (
            <button
              key={p.key}
              className={`px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition-all ${activePlatform === p.key ? "shadow-lg text-white" : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"} `}
              style={activePlatform === p.key ? { backgroundColor: p.color } : {}}
              onClick={() => setActivePlatform(p.key)}
            >
              {p.icon} {p.name}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p>Loading contests...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md shadow-md max-w-2xl mx-auto flex items-center gap-3">
            <span>⚠️</span> <div><strong>Error:</strong> {error}</div>
          </div>
        )}

        {/* Empty */}
        {!loading && filteredContests.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">No upcoming contests found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Check back later for new competitions!</p>
          </div>
        )}

        {/* Contest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {!loading && filteredContests.map(c => {
            const platform = PLATFORMS.find(p => c.host && c.host.includes(p.url)) || PLATFORMS[0];
            return (
              <div key={c.id || c.href} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="h-1.5" style={{ backgroundColor: platform.color }}></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 pr-4 leading-tight">{c.event}</h3>
                    <span className="text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: platform.color }}>
                      {platform.icon} {platform.name}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex justify-between"><strong>📅 Starts:</strong> <span>{safeFormatDate(c)}</span></p>
                    <p className="flex justify-between"><strong>⏰ Ends:</strong> <span>{c.end_time ? new Date(c.end_time).toLocaleString() : c.end || "N/A"}</span></p>
                    <p className="flex justify-between"><strong>⏱️ Duration:</strong> <span>{typeof c.duration === "number" ? formatSeconds(c.duration) : c.duration || "N/A"}</span></p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <a href={c.href || "#"} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold hover:underline">View Contest</a>
                    <button className="text-gray-500 border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Set Reminder</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <footer className="text-center py-8 mt-8 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
        Contest data provided by <a href="https://clist.by/" className="text-indigo-600 dark:text-indigo-400 hover:underline">clist.by</a>
      </footer>
    </div>
  );
}
