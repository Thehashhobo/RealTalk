"use client";
import { useState, FormEvent } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    topic: "philosophy",
    controversial: "medium",
    relationship: "friends",
  });
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTopics([]);
    try {
      const res = await fetch("/api/generate-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Assuming controversial defaults to "medium" if not provided by the form.
        body: JSON.stringify({ ...formData, controversial: "medium" }),
      });
      const data = await res.json();
      console.log("data is", data);
      if (data.error) {
        setError(data.error);
      } else {
        setTopics(data.topics);
      }
    } catch (err) {
      setError("Error fetching topics");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 -z-10 [background:radial-gradient(135%_135%_at_50%_20%,#000_40%,#241a63_70%)]">
      <main className="flex flex-col justify-self-center items-center justify-center max-w-9/10 min-h-screen py-2 gap-3">
        {/* Hero Text */}
        <h1 className="text-3xl font-bold text-center lg:text-5xl">
          Profound, Personalized Conversations Tailored To You
        </h1>

        {/* Selectors Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10 w-full max-w-md">
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-40">
            <div className="flex flex-col">
              <label htmlFor="topic" className="mb-1 font-medium">
                Topics
              </label>
              <select
                id="topic"
                name="topic"
                className="p-2 border rounded w-48 text-blue-800"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              >
                <option value="philosophy">Philosophy</option>
                <option value="technology">Technology</option>
                <option value="politics">Politics</option>
                <option value="art">Art</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="topic" className="mb-1 font-medium">
              Controversial Level
              </label>
              <select
                id="topic"
                name="topic"
                className="p-2 border rounded w-48 text-blue-800"
                value={formData.controversial}
                onChange={(e) => setFormData({ ...formData, controversial: e.target.value })}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="relationship" className="mb-1 font-medium">
                Relationship Type
              </label>
              <select
                id="relationship"
                name="relationship"
                className="p-2 border rounded w-48 text-blue-800"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              >
                <option value="friends">Friends</option>
                <option value="colleagues">Colleagues</option>
                <option value="family">Family</option>
                <option value="acquaintances">Acquaintances</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="group relative overflow-hidden mt-4 rounded-full border border-solid transition-all duration-500 ease-in-out transform hover:scale-115 hover:shadow-[0_0_40px_#372899] flex items-center justify-center bg-foreground text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            {/* This span mimics the ::before pseudo-element for a holographic hover effect */}
            <span className="absolute top-[-50%] left-[-10%] w-[200%] h-[200%] bg-gradient-to-t from-transparent via-transparent to-[#241a63] rotate-[-45deg] transition-all duration-800 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-[100%] pointer-events-none"></span>
            Generate Topic
          </button>
        </form>

        {/* Display loading, error or topics */}
        {loading && <p className="mt-4 text-center">Loading topics...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {topics.length > 0 && (
          <div className="mt-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Generated Topics</h2>
            <ul className="space-y-4">
              {topics.map((topic, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-4 border rounded hover:shadow-md transition-shadow"
                >
                  <span>{topic}</span>
                  <button
                    className="px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    onClick={() => alert(`Liked: ${topic}`)}
                  >
                    Like
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
