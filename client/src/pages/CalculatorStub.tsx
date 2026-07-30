import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CalculatorStub() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
        <Construction className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="font-display text-3xl text-foreground">Under Construction</h1>
        <p className="text-muted-foreground max-w-sm">
          This calculator is currently being built. It will be available in a future update!
        </p>
      </div>
      <Link href="/">
        <Button variant="outline" className="mt-4 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>
      </Link>
    </div>
  );
}
