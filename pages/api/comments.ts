import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
import { Session } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session: Session | null = await getServerSession(
      req,
      res,
      authOptions
    );

    if (!session?.user?.email) {
      return res.status(401).json({ error: "Not signed in" });
    }

    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return res.status(401).json({ error: "User not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create comment" });
  }
}
