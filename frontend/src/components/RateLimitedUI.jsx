import { Zap } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="glass-card rounded-xl p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-amber-50 rounded-full p-4">
            <Zap className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-medium text-dark-700">Rate Limit Reached</h3>
          <p className="text-dark-500 text-sm max-w-md">
            You've made too many requests. Please wait a moment before trying again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;