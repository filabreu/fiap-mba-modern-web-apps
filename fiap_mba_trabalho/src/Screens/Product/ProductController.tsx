import React, { FC, useState, useEffect } from "react";

import useAPI, {
  useApiReturnType,
} from "../../../pages/Services/APIs/Common/useAPI";
import getProduct from "../../../pages/Services/APIs/Persons/Persons";
import ProductView from "./ProductView";
import { Product } from "../../Models/ProductDetail";
import { QueryResult } from "material-table";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { UserInfo } from "../../Interfaces/UserInfo";
import RoutesFunction from "../../Routes/Routes";

type iProps = {
  userInfo: UserInfo;
};

const ProductController: FC<iProps> = ({}) => {
  const getProductAPI: useApiReturnType = useAPI(getProduct);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const router = useRouter();

  let infoSaved = null;
  let config: any;
  useEffect(() => {
    infoSaved = localStorage.getItem("userInfoToken") as String | null;

    if (infoSaved !== "" && infoSaved !== null) {
      let userInfoLoaded: UserInfo = JSON.parse(infoSaved + "") as UserInfo;
      if (userInfoLoaded.token !== "" && userInfoLoaded.token !== undefined) {
        config = {
          headers: {
            Authorization: `Bearer ${userInfoLoaded.token}`,
          },
        };
      } else {
        router.push("/login");
      }
    }
  }, []);

  const onChangePage = (product: Product) => {
    router.push("detail/" + product._id);
  };

  const getData = (query: any): Promise<QueryResult<{ [x: string]: {} }>> => {
    return new Promise((resolve, reject) => {
      console.log(query);

      let page = query.page + 1;
      let info = `page=${page}&perPage=${query.pageSize}`;
      if (query.orderBy !== undefined && query.orderBy !== "") {
        info += `&orderBy=${query.orderBy.field}`;
      }
      if (query.orderDirection !== undefined && query.orderDirection !== "") {
        info += `&orderDirection=${query.orderDirection}`;
      }
      if (query.search !== undefined && query.search !== "") {
        info += `&search=${query.search}`;
      }
      console.log("OPA " + info + config);

      axios
        .get(
          "https://fiap-reactjs-presencial.herokuapp.com/storeProducts",
          config
        )
        .then((info: any) => {
          console.log("NOSSOS PRODUCTS" + info.data);
          //setLoading(true);
          resolve({
            data: info.data.products,
            page: info.data.page - 1,
            totalCount: info.data.totalItems,
          });
          setLoading(false);
          setData(data);
        })
        .catch((error: string) => {
          console.log("ERRRRRRROOOO" + error);
        });
    });
  };

  return (
    <>
      <Header />
      <ProductView
        loading={getProductAPI.loading}
        onChangePage={onChangePage}
        getData={getData}
      />
    </>
  );
};

export default ProductController;
