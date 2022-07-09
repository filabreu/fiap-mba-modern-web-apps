import { FC } from "react";
import { ButtonMaxSize, MainStack, TitlePage } from './DetailStyle'

interface iProps {
  infoID: string | undefined;
  onBackButton: Function;
}
const DetailView: FC<iProps> = ({ infoID, onBackButton }) => {
  return (
    <>
      <MainStack spacing={2} >
        <TitlePage
          gutterBottom
          variant="h3"
          color="primary.main"
        >
          Detail = {infoID}
        </TitlePage>
        <ButtonMaxSize variant="primary" onClick={() => onBackButton()}>
          Voltar
        </ButtonMaxSize>
      </MainStack>
    </>
  );
};

export default DetailView;