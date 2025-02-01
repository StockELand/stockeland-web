import { useState, useEffect, useCallback } from "react";

interface SSEData {
  progress: number;
  state: string;
}

const useSSE = (url: string) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("pending");
  const [isConnected, setIsConnected] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const startSSE = useCallback(() => {
    if (isConnected) return;

    const es = new EventSource(url);

    es.onmessage = (event) => {
      const { progress, state } = JSON.parse(event.data) as SSEData;
      setProgress(progress);
      setStatus(state);
      if (state === "completed") {
        es.close();
        setIsConnected(false);
      }
    };

    es.onerror = (error) => {
      console.error("SSE error:", error);
      es.close();
      setIsConnected(false);
    };

    setEventSource(es);
    setIsConnected(true);
  }, [isConnected, url]);

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return { progress, status, isConnected, startSSE };
};

export default useSSE;
