import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useSSE from "@/hooks/useSSE";

export default function ManualRunCard() {
  const { progress, status, startSSE } = useSSE(
    "http://localhost:8080/sse/progress"
  );
  const {
    progress: modelProgress,
    status: modelStatus,
    startSSE: modelStartSSE,
  } = useSSE("http://localhost:8080/sse/progress");

  return (
    <Card title="수동실행">
      <div className="flex flex-col space-y-2">
        <Button onClick={startSSE} className="overflow-x-auto relative">
          {status !== "completed" && (
            <div
              className="absolute inset-0 bg-black/20 transition-transform duration-100 ease-linear z-0"
              style={{ transform: `translateX(${-100 + progress}%)` }}
            />
          )}
          <div className="relative z-10">
            {status === "completed"
              ? "Parsing completed"
              : progress === 0
              ? "Data Parsing"
              : `Data Parsing ${progress}%`}
          </div>
        </Button>
        <Button onClick={modelStartSSE} className="overflow-x-auto relative">
          {modelStatus !== "completed" && (
            <div
              className="absolute inset-0 bg-black/20 transition-transform duration-100 ease-linear z-0"
              style={{ transform: `translateX(${-100 + modelProgress}%)` }}
            />
          )}
          <div className="relative z-10">
            {modelStatus === "completed"
              ? "Learning Completed"
              : modelProgress === 0
              ? "Model Learning"
              : `Model Learning ${modelProgress}%`}
          </div>
        </Button>
      </div>
    </Card>
  );
}
