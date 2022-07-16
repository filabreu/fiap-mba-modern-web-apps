import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { MenuInfo } from "../../src/Interfaces/MenuInfo";
import HomeController from "../../src/Screens/Home/HomeController";

type iProps = {
  items: MenuInfo[];
};
const Home: FC<iProps> = ({ items }) => {
  return <HomeController />;
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  console.log("Inicio SSG getStaticProps with params");
  const res = await fetch(process.env.REACT_APP_URL + "api/getItems");
  const items = (await res.json()) as MenuInfo;
  console.log("Checking items");
  console.log(items);

  return {
    props: {
      items: items,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true, // false | blocking
    // false - coloca erro 400 se variável for diferente do array acima
    // true -  se a variável for diferente do array acima, carrega a página sem informação e depois carrega novamente
    // 'blocking' - espera o carregamento da informação para mostrar a página
  };
}