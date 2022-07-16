import React, { FC } from "react";
import { GetServerSideProps } from "next";
import DetailController from "../../src/Screens/Detail/DetailController";
import { UserInfo } from "../../src/Interfaces/UserInfo";


type iProps = {
  userInfo: UserInfo
};

const detail:FC<iProps> = ({ userInfo }) => {
  return <DetailController />;
};
export default detail;

export const getServerSideProps: GetServerSideProps = async (context) => {

  console.log("Inicio SSR getServerSideProps");
  const res = await fetch(
    process.env.REACT_APP_URL + `api/getInfo/${context.params!.id}?search=Roberto`
  );
  const userInfo = await res.json() as UserInfo;
  console.log("Checking items");
  console.log(userInfo);

  return {
    props: {
      userInfo: userInfo,
    },
  };
}