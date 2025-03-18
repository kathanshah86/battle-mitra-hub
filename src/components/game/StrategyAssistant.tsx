
import React, { useState } from 'react';
import { useBackendServices } from '@/hooks/use-backend-services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const StrategyAssistant = ({ gameType }: { gameType?: 'fps' | 'battle-royale' | 'moba' | 'sports' | 'card' | 'fighting' }) => {
  const [prompt, setPrompt] = useState('');
  const [open, setOpen] = useState(false);
  const { getGameStrategy, aiLoading, aiResponse } = useBackendServices();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    await getGameStrategy({ prompt, gameType });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Get Game Strategy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>AI Strategy Assistant</DialogTitle>
          <DialogDescription>
            Ask for strategies, tips, or insights about your game.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., How do I improve my aim in FPS games?"
              className="flex-1"
              disabled={aiLoading}
            />
            <Button type="submit" disabled={aiLoading || !prompt.trim()}>
              {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Ask'}
            </Button>
          </div>
          
          {aiResponse && (
            <div className="mt-4 rounded-md bg-secondary p-4 text-secondary-foreground">
              <p className="text-sm whitespace-pre-line">{aiResponse}</p>
            </div>
          )}
        </form>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
