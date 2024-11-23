// src/components/Weather.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherRequest } from "../redux/reducers/weatherReducer";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Progress } from "@/components/ui/progress";

const weatherImgaes = {
  Clouds: "https://i.postimg.cc/C552N28D/clouds.png",
  Clear: "https://i.postimg.cc/XqgvfpwX/clear.png",
  Rain: "https://i.postimg.cc/dtBB16Tc/rain.png",
  Drizzle: "https://i.postimg.cc/1RghDgrd/drizzle.png",
  Mist: "https://i.postimg.cc/3rZpCRrg/mist.png",
  Snow: "https://i.postimg.cc/XqNrDfN9/snow.png",
  Thunderstorm: "https://i.postimg.cc/Jnsryph6/thunderstorm.png",
  Haze: "https://i.postimg.cc/wM5VFqzm/fog.png",
  default: "https://i.postimg.cc/XqgvfpwX/clear.png",
};

const Weather = () => {
  const dispatch = useDispatch();
  const { data, loading, progress } = useSelector((state) => state.weather);
  const [city, setCity] = useState("Hyderabad");
  const [debounceCity, setDebounceCity] = useState(city);

  // DEBOUNCE CONCEPT START
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      console.log("debonce is implemented");
      setDebounceCity(city);
    }, 3000);

    return () => clearTimeout(debounceTimer);
  }, [city]);

  useEffect(() => {
    if (debounceCity) {
      dispatch(fetchWeatherRequest({ city: debounceCity }));
    }
  }, [debounceCity, dispatch]);
  // DEBOUNCE CONCEPT END

  //EVENT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchWeatherRequest({ city: debounceCity }));
  };

  const imageValue = () => {
    switch (data.weather[0].main) {
      case "Clouds":
        return weatherImgaes.Clouds;
      case "Clear":
        return weatherImgaes.Clear;
      case "Rain":
        return weatherImgaes.Rain;
      case "Drizzle":
        return weatherImgaes.Drizzle;
      case "Mist":
        return weatherImgaes.Mist;
      case "Snow":
        return weatherImgaes.Snow;
      case "Haze":
        return weatherImgaes.Haze;
      case "Thunderstorm":
        return weatherImgaes.Thunderstorm;
      default:
        return weatherImgaes.Clear;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-5 h-full bg-red-500 text-white rounded-xl">
      <h2 className="text-2xl text-center text-white font-bold mb-5">
        Weather App
      </h2>
      <Form onSubmit={handleSubmit} className="space-y-6">
        <Label className="mx-auto text-1xl" id="city">
          Search Here
        </Label>
        <div className="flex items-center space-x-4 mt-2">
          <Input
            type="text"
            id="city"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl"
          />
          <Button
            type="submit"
            className="px-6 py-2 bg-white slate-900 text-black rounded  hover:bg-lime-500 hover:text-white"
          >
            Get Weather
          </Button>
        </div>
      </Form>

      {loading && (
        <div
          className="mt-3 rounded-xl"
          style={{
            width: "200px",
            height: "20px",
            backgroundColor: "green",
          }}
        >
          <Progress value={progress} />
        </div>
      )}

      {data && (
        <div className="mt-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <p className="text-lg">
              {data.weather[0].description.toUpperCase()}
            </p>
            <p className="text-xl font-medium">
              {Math.round(data.main.temp)}°C
            </p>
          </div>
          <div>
            <p className="text-lg">
              Feels like: {Math.round(data.main.feels_like)}°C{" "}
            </p>
            <img
              src={imageValue()}
              alt="weather icons"
              width={80}
              className="mx-auto"
            />
          </div>
        </div>
      )}

      <div className="mt-5">
        <h1></h1>
      </div>
    </div>
  );
};

export default Weather;
