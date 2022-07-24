import { NextApiRequest, NextApiResponse } from "next";

type iParam = {
    search: string;
    id: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { search, id } = req.query as iParam;

    console.log(req.query);

    res.status(200).json({
      id: id,
      name: search + " Doe",
      phone: "1198986565",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error Connecting");
  }
};