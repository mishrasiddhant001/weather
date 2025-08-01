import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
}

const DEMO_CITIES = [
  { name: "Mumbai", temp: 32, desc: "sunny", humidity: 75, wind: 12 },
  { name: "Delhi", temp: 28, desc: "partly cloudy", humidity: 60, wind: 8 },
  { name: "London", temp: 15, desc: "cloudy", humidity: 80, wind: 15 },
  { name: "New York", temp: 22, desc: "clear sky", humidity: 55, wind: 10 },
  { name: "Tokyo", temp: 25, desc: "light rain", humidity: 70, wind: 6 },
  { name: "Sydney", temp: 20, desc: "partly cloudy", humidity: 65, wind: 14 },
  { name: "Paris", temp: 18, desc: "overcast", humidity: 72, wind: 9 },
  { name: "Dubai", temp: 38, desc: "sunny", humidity: 45, wind: 7 },
  { name: "Moscow", temp: 5, desc: "snow", humidity: 85, wind: 18 },
  { name: "Singapore", temp: 30, desc: "thunderstorm", humidity: 85, wind: 5 }
];

const getWeatherIcon = (description: string, temp: number) => {
  if (description.includes('snow')) return '❄️';
  if (description.includes('rain') || description.includes('drizzle')) return '🌧️';
  if (description.includes('thunder')) return '⛈️';
  if (description.includes('cloud')) return temp > 25 ? '⛅' : '☁️';
  if (description.includes('clear') || description.includes('sunny')) return temp > 25 ? '☀️' : '🌤️';
  return '🌤️';
};

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid city name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find matching city or create random data
      const cityData = DEMO_CITIES.find(c => 
        c.name.toLowerCase().includes(city.toLowerCase())
      ) || {
        name: city,
        temp: Math.round(5 + Math.random() * 35), // 5-40°C
        desc: ['sunny', 'partly cloudy', 'cloudy', 'light rain', 'clear sky'][Math.floor(Math.random() * 5)],
        humidity: Math.round(40 + Math.random() * 45), // 40-85%
        wind: Math.round(3 + Math.random() * 20) // 3-23 km/h
      };

      const weatherData: WeatherData = {
        location: cityData.name,
        temperature: cityData.temp,
        description: cityData.desc,
        humidity: cityData.humidity,
        windSpeed: cityData.wind,
        icon: getWeatherIcon(cityData.desc, cityData.temp),
        feelsLike: cityData.temp + Math.round((Math.random() - 0.5) * 6), // ±3°C variation
      };

      setWeather(weatherData);
      
      toast({
        title: "Weather Updated",
        description: `Showing weather for ${weatherData.location}`,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    
    try {
      // Simulate getting current location
      await new Promise(resolve => setTimeout(resolve, 1000));
      const randomCity = DEMO_CITIES[Math.floor(Math.random() * DEMO_CITIES.length)];
      
      const weatherData: WeatherData = {
        location: `${randomCity.name} (Current Location)`,
        temperature: randomCity.temp,
        description: randomCity.desc,
        humidity: randomCity.humidity,
        windSpeed: randomCity.wind,
        icon: getWeatherIcon(randomCity.desc, randomCity.temp),
        feelsLike: randomCity.temp + Math.round((Math.random() - 0.5) * 6),
      };

      setWeather(weatherData);
      toast({
        title: "Location Weather",
        description: `Showing weather for your current location`,
      });
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to get your current location",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    loading,
    error,
    fetchWeather,
    getCurrentLocation,
  };
};