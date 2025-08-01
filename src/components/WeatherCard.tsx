import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
}

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

export const WeatherCard = ({ weather, className }: WeatherCardProps) => {
  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[iconCode] || '🌤️';
  };

  return (
    <Card className={cn(
      "p-8 bg-gradient-card backdrop-blur-md border-white/20 shadow-card-weather",
      "transform transition-all duration-500 hover:scale-105 animate-slide-in",
      className
    )}>
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{weather.location}</h2>
          <p className="text-muted-foreground capitalize">{weather.description}</p>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <span className="text-6xl animate-float">{getWeatherIcon(weather.icon)}</span>
          <div className="text-left">
            <span className="text-5xl font-bold text-foreground">{Math.round(weather.temperature)}°</span>
            <p className="text-sm text-muted-foreground">Feels like {Math.round(weather.feelsLike)}°</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-xl font-semibold text-weather-blue">{weather.humidity}%</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Wind Speed</p>
            <p className="text-xl font-semibold text-weather-blue">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </Card>
  );
};