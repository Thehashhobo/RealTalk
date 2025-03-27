"use client";
import { useState, FormEvent, startTransition } from "react";
import Head from "next/head";
import Switch from "react-switch";
import Typet from "next/font/google";

export default function Home() {
  const [formData, setFormData] = useState({
    type: "debate",
    topic: "philosophy",
    personal: "false",
    relationship: "friends",
    keyword: "",
  });
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [play, setPlay] = useState<boolean>(false);

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
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
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
    <>
    <Head>
        <title>Real Talk</title>
        <meta name="description" content="Spark meaningful conversations with curated deep discussion topics. Build authentic human connections through thoughtful dialogue and intentional communication." />
        <meta property="og:title" content="Let's Talk !" />
        <meta property="og:description" content="Spark meaningful conversations with curated deep discussion topics. Build authentic human connections through thoughtful dialogue and intentional communication." />
        <meta property="og:image" content="/path/to/image.jpg" />
        <meta name="robots" content="index, follow" />
    </Head>
    <div className="inset-0 -z-10 [background:radial-gradient(135%_135%_at_50%_20%,#000_40%,#241a63_70%)]">
      <main className="flex flex-col justify-self-center items-center justify-center max-w-9/10 min-h-screen py-2 gap-3">
        {/* Hero Text */}
        <h1 className={"text-3xl font-bold text-center lg:text-5xl mb-4 " + (play ? "animate-slide-h1" : "")}>
          Profound, <span className="font-serif">Personalized</span> Conversations <span className="font-mono">Tailored</span> To <span className="underline">You</span>
        </h1>

        {/* Selectors Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 w-full max-w-md">
        <div className={"flex flex-col gap-3 lg:flex-row lg:gap-20 " + (play ? "animate-slide-input" : "")}>
        <div className="flex flex-col">
              <label htmlFor="type" className="mb-1 font-medium">
                Type
              </label>
              <select
                id="type"
                name="type"
                className="p-2 border rounded w-48 text-blue-800"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="debate">Debate</option>
                <option value="dialogue">Dialogue</option>

                
              </select>
            </div>

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
                <option value="art">Art</option>
                <option value="economics">Economics</option>
                <option value="health">Health</option>
                <option value="history">History</option>
                <option value="philosophy">Philosophy</option>
                <option value="politics">Politics</option>
                <option value="psychology">Psychology</option>
                <option value="religion">Religion</option>
                <option value="recreation">Recreation</option>
                <option value="technology">Technology</option>
                
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
                <option value="couples">Couples</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="colleagues">Colleagues</option>
                <option value="acquaintances">Acquaintances</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="keyword" className="mb-1 font-medium">Keyword</label>
              <input
                type="text"
                id="keyword"
                name="keyword"
                placeholder="ex.Love"
                className="p-2 border rounded w-48 text-blue-800"
                value={formData.keyword || ""}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="personal" className="mb-1 font-medium">
              Personal
              </label>
              <div className="flex items-center space-x-2 mt-1.5">
              <Switch
                id="personal"
                checked={formData.personal === "true"}
                onChange={(checked: boolean) =>
                setFormData({ ...formData, personal: checked.toString() })
                }
                offColor="#ccc"
                onColor="#0b5ed7"
              />
              <span>{formData.personal === "true" ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
                  {/* Display loading, error or topics */}
        {loading && <p className="mt-4 text-center">Loading topics...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {topics.length > 0 && (
          <div className={"mt-8 w-full max-w-md " + (play ? "translate-y-[-18vh] lg:translate-y-[-2vh]" : "")}>
            <h2 className="text-2xl font-bold mb-4 text-center">Generated Topics</h2>
            <ul className="space-y-4">
              {topics.map((topic, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-4 border rounded transition-shadow hover:shadow-md hover:-translate-y-1"
                >
                  <span>{topic}</span>
                  {/* <button
                    className="px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    onClick={() => alert(`Liked: ${topic}`)}
                  >
                    Like
                  </button> */}
                </li>
              ))}
            </ul>
          </div>
        )}
          <button
            onClick={() => setPlay(true)}
            type="submit"
            className={"group relative overflow-hidden mt-4 rounded-full border border-solid transition-all duration-500 ease-in-out transform hover:scale-115 hover:shadow-[0_0_40px_#372899] flex items-center justify-center bg-foreground text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 " + (play ? "animate-slide-button translate-y-[-22vh] lg:translate-y-[0]" : "")}
          >
            {/* This span mimics the ::before pseudo-element for a holographic hover effect */}
            <span className="absolute top-[-50%] left-[-10%] w-[200%] h-[200%] bg-gradient-to-t from-transparent via-transparent to-[#241a63] rotate-[-45deg] transition-all duration-800 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-[100%] pointer-events-none"></span>
            Generate Topics
          </button>
        </form>


      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>

        {/* Custom CSS animations */}
  <style jsx>{`
    .animate-slide-h1 {
      animation: slideUpOut 1.5s ease-in-out forwards;
    }
    @keyframes slideUpOut {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(-5vh);
        opacity: 0;
      }
    }

    .animate-slide-input {
      animation: slideUpSmall 1.5s ease-in-out forwards;
    }

    @media (min-width: 1024px) {
    .animate-slide-input {
      animation: slideUpSmallB 1.5s ease-in-out forwards;
      }
    }
    @keyframes slideUpSmall {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-18vh);
      }
    }
    
    @keyframes slideUpSmallB {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-8vh);
      }
    }

 /* Default animation for smaller screens */
  .animate-slide-button {
    animation: slideDownSmall 1.5s ease-in-out forwards;
  }
  
  /* Override animation for larger screens using a media query */
  @media (min-width: 1024px) {
    .animate-slide-button {
      animation: slideDownSmallB 1.5s ease-in-out forwards;
    }
  }
  
  @keyframes slideDownSmall {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(15vh);
    }
  }
  
  @keyframes slideDownSmallB {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(2vh);
    }
  }
  `}</style>
    </div>
  </>
  );
}

