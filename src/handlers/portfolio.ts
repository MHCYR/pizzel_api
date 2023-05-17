import { NextFunction, Request, Response } from "express";
import prisma from "../db";

export const getAllPortfolios = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.user;
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getSinglePortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });

    res.json({ data: portfolio });
  } catch (error) {
    next(error);
  }
};

export const createPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const { id } = req.user;
  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        name,
        userId: id,
      },
    });
    res.json({ data: portfolio });
  } catch (error) {
    next(error);
  }
};

export const updatePortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.id;
  try {
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
  } catch (error) {
    next(error);
  }
};

export const deletePortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const portfolio = await prisma.portfolio.delete({
      where: {
        id_userId: {
          id: id,
          userId: userId,
        },
      },
    });

    res.json({ data: portfolio });
  } catch (error) {
    next(error);
  }
};
