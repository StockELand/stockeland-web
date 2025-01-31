import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ManualRunCard() {
  return (
    <Card title="수동실행">
      <div className="flex flex-col space-y-2">
        <Button>Data Parsing</Button>
        <Button>Model Learning</Button>
      </div>
    </Card>
  );
}
