import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseMs = 1800,
}: UseTypewriterOptions) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            // Finished typing — pause then start deleting
            setTimeout(() => setIsDeleting(true), pauseMs);
          }
        } else {
          // Deleting
          setText(currentWord.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return { text, isDeleting };
}
