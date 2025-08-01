import { useEffect, useMemo } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { SearchBox } from "@/components/SearchBox";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/useWeather";
import { MapPin, RefreshCw } from "lucide-react";

const Index = () => {
  const { weather, loading, fetchWeather, getCurrentLocation } = useWeather();

  // Dynamic background based on temperature
  const backgroundClass = useMemo(() => {
    if (!weather) return "bg-gradient-to-br from-primary to-primary/80";
    
    const temp = weather.temperature;
    if (temp <= 10) return "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400"; // Cold
    if (temp <= 20) return "bg-gradient-to-br from-blue-500 via-emerald-400 to-teal-400"; // Mild
    if (temp <= 30) return "bg-gradient-to-br from-orange-400 via-yellow-400 to-amber-300"; // Warm
    return "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400"; // Hot
  }, [weather]);

  useEffect(() => {
    // Load default weather for demonstration
    fetchWeather("Mumbai");
  }, []);

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-1000 ease-in-out`}>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-slide-in">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              SkyScope
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md">
              Advanced weather intelligence platform
            </p>
          </div>

          {/* Search Section */}
          <div className="space-y-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <SearchBox onSearch={fetchWeather} loading={loading} />
            
            <div className="flex justify-center">
              <Button
                onClick={getCurrentLocation}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 
                          backdrop-blur-sm transition-all duration-300"
                disabled={loading}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Use Current Location
              </Button>
            </div>
          </div>

          {/* Weather Display */}
          {weather && (
            <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
              <WeatherCard weather={weather} />
            </div>
          )}

          {/* Loading State */}
          {loading && !weather && (
            <div className="text-center py-12 animate-slide-in">
              <RefreshCw className="w-12 h-12 text-white mx-auto mb-4 animate-spin" />
              <p className="text-white/80 text-lg">Fetching weather data...</p>
            </div>
          )}

          {/* Empty State */}
          {!weather && !loading && (
            <div className="text-center py-12 animate-slide-in">
              <div className="text-6xl mb-4">🌤️</div>
              <p className="text-white/80 text-lg">Search for a city to see the weather</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
