import { Request, Response } from "express";
import prisma from "../db";

export const createCanvas = async (req: Request, res: Response) => {
  const { name, portfolioId } = req.body;
  const userId = req.user.id;

  const canvas = await prisma.canvas.create({
    data: {
      name,
      portfolioId,
      userId,
    },
  });

  res.json({ data: canvas });
};

export const getCanvas = async (req: Request, res: Response) => {
  const { id } = req.params;

  const canvas = await prisma.canvas.findUnique({
    where: {
      id: id,
    },
  });

  res.json({ data: canvas });
};

export const getAllCanvases = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const canvases = await prisma.canvas.findMany({
    where: {
      userId,
    },
  });

  res.json({ data: canvases });
};

export const updateCanvas = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, sketch } = req.body;

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
};

export const deleteCanvas = async (req: Request, res: Response) => {
  const { id } = req.params;

  const canvas = await prisma.canvas.delete({
    where: {
      id: id,
    },
  });

  res.json({ data: canvas });
};
