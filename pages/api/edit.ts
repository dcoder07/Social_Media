import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const session = (await getServerSession(req, res, authOptions)) as Session;
    const { name, username, bio, profileImage, coverImage } = req.body;
    console.log("Session: ", session);

    if (!session?.user?.email) {
      return res.status(401).end();
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
