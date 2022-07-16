import React from "react";
import { Person } from "../../Models/Person";
import DetailView from "./DetailView";
import { useRouter } from "next/router";

type ParamsProps = {
  infoID: string;
};
type LocationProps = {
  personStr: string;
};
const DetailController = () => {
  let personInfo: Person | null = null;
  const router = useRouter();


  const onBackButton = () => {
    router.back;
  };

  return (
    <DetailView
      person={personInfo}
      onBackButton={onBackButton}
    />
  );
};

export default DetailController;