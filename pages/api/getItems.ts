import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.query);

    res.status(200).json([
      { id: 1, name: "1" },
      { id: 2, name: "2" },
      { id: 3, name: "3" },
      { id: 4, name: "4" },
    ]);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error Connecting");
  }
};
