import { Request, Response } from "express";
import prisma from "../db";

export const getAllPortfolios = async (req: Request, res: Response) => {
  const { email } = req.user;
  const portfolios = await prisma.portfolio.findMany({
    where: {
      user: {
        email,
      },
    },
    include: {
      canvases: true,
    },
  });
  res.json({ data: portfolios });
};

export const getSinglePortfolio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      id,
    },
  });

  res.json({ data: portfolio });
};

export const createPortfolio = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.user;
  const portfolio = await prisma.portfolio.create({
    data: {
      name,
      userId: id,
    },
  });
  res.json({ data: portfolio });
};

export const updatePortfolio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.id;
  const portfolio = await prisma.portfolio.update({
    where: {
      id_userId: {
        id: id,
        userId: userId,
      },
    },
    data: {
      name,
    },
  });

  res.json({ data: portfolio });
};

export const deletePortfolio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  const portfolio = await prisma.portfolio.delete({
    where: {
      id_userId: {
        id: id,
        userId: userId,
      },
    },
  });

  res.json({ data: portfolio });
};
