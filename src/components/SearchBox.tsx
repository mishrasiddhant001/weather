import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  className?: string;
}

export const SearchBox = ({ onSearch, loading = false, className }: SearchBoxProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-3", className)}>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-12 h-12 bg-white/90 border-white/30 backdrop-blur-sm 
                     focus:bg-white focus:border-primary transition-all duration-300
                     placeholder:text-muted-foreground/70"
          disabled={loading}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/70 h-5 w-5" />
      </div>
      <Button 
        type="submit" 
        disabled={loading || !city.trim()}
        className="h-12 px-8 bg-primary hover:bg-primary/90 shadow-weather
                   transition-all duration-300 transform hover:scale-105"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
};