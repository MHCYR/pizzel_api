import { NextFunction, Request, Response } from "express";
import prisma from "../db";

export const createCanvas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, portfolioId } = req.body;
  const userId = req.user.id;
  try {
    const canvas = await prisma.canvas.create({
      data: {
        name,
        portfolioId,
        userId,
      },
    });

    res.json({ data: canvas });
  } catch (error) {
    next(error);
  }
};

export const getCanvas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const canvas = await prisma.canvas.findUnique({
      where: {
        id: id,
      },
    });

    res.json({ data: canvas });
  } catch (error) {
    next(error);
  }
};

export const getAllCanvases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  try {
    const canvases = await prisma.canvas.findMany({
      where: {
        userId,
      },
    });

    res.json({ data: canvases });
  } catch (error) {
    next(error);
  }
};

export const updateCanvas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, sketch } = req.body;

  try {
    const canvas = await prisma.canvas.update({
      where: {
        id: id,
      },
      data: {
        name,
        sketch,
      },
    });

    res.json({ data: canvas });
  } catch (error) {
    next(error);
  }
};

export const deleteCanvas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const canvas = await prisma.canvas.delete({
      where: {
        id: id,
      },
    });

    res.json({ data: canvas });
  } catch (error) {
    next(error);
  }
};
