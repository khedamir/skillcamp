import { useState, useEffect, useRef, useCallback } from "react";

export const useCompleteButton = () => {
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const checkScrollPosition = useCallback(() => {
    if (!contentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if (isNearBottom) {
      timeoutRef.current = setTimeout(() => {
        setShowButton(true);
      }, 2000);
    } else {
      clearTimeout(timeoutRef.current);
      setShowButton(false);
    }
  }, []);

  useEffect(() => {
    const currentRef = contentRef.current;

    if (!currentRef) return;

    currentRef.addEventListener("scroll", checkScrollPosition);

    // Первоначальная проверка
    checkScrollPosition();

    return () => {
      clearTimeout(timeoutRef.current);
      currentRef.removeEventListener("scroll", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return { contentRef, showButton };
};
