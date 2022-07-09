import { useEffect, useState } from "react";
import HomeModel from "./HomeModel";
import HomeView from "./HomeView";

const HomeController = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount((count) => count + 1); //Passando o count
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  console.log("Count" + count);
  return (<HomeView info={count} />);
};

export default HomeController;
