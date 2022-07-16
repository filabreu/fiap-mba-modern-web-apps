import { GetStaticProps } from "next";
import { FC } from "react";
import HomeController from "../../src/Screens/Home/HomeController";
import { MenuInfo } from "../../src/Interfaces/MenuInfo";

type iProps = {
  items: MenuInfo[];
};
const Home: FC<iProps> = ({ items }) => {
  return <HomeController />;
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  console.log("Inicio ISR getStaticProps Revalidate");
  const res = await fetch(process.env.REACT_APP_URL + "api/getItems");
  const items = await res.json() as MenuInfo;
  console.log("Checking items");
  console.log(items);

  return {
    props: {
      items: items,
    },
    revalidate: 10, // Em segundos
  };
};