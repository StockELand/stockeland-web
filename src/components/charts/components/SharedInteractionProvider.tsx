import { createContext, useContext, useState } from "react";
import { ChartData } from "../core/types";

// 📌 X축 인터랙션을 공유하는 Context 생성
const SharedInteractionContext = createContext<{
  sharedData: ChartData | null;
  setSharedData: (data: ChartData | null) => void;
} | null>(null);

/**
 * 차트 간 X축 인터랙션을 공유하는 훅
 */
export const useSharedInteraction = () => {
  const context = useContext(SharedInteractionContext);

  if (!context) {
    return {
      sharedData: null,
      setSharedData: () => {},
    };
  }

  return context;
};

/**
 * X축 공유를 위한 Provider
 */
const SharedInteractionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sharedData, setSharedData] = useState<ChartData | null>(null);

  return (
    <SharedInteractionContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </SharedInteractionContext.Provider>
  );
};

export default SharedInteractionProvider;
