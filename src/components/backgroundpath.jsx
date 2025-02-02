import { useState } from "react";
import { motion } from "framer-motion";
import ChatInput from "./input";
import { useEffect } from "react";

function FloatingPaths({ position = 4 }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-auto">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function ResponseDisplay({ response }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (response === "") return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + response[index]);
      index += 1;

      if (index === response.length) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 50); // Adjust the delay (in ms) to control the speed of text appearing

    return () => clearInterval(interval);
  }, [response]);
  if (response === "") return;
  return (
    <div className="bg-white font-semibold text-black rounded-lg p-4 mt-4 w-full max-w-3xl mx-auto overflow-auto max-h-[60vh]">
      <p>{displayedText}</p>
    </div>
  );
}

export default function BackgroundPaths({ title = "Background Paths" }) {
  const [responseText, setResponseText] = useState("");

  const handleResponse = (response) => {
    setResponseText(response); // This will update the response text
  };

  const words = title.split(" ");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-auto bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <ChatInput onResponse={handleResponse} />{" "}
          {/* Pass the handleResponse function */}
          <ResponseDisplay response={responseText} />{" "}
          {/* Display the response */}
        </motion.div>
      </div>
    </div>
  );
}
