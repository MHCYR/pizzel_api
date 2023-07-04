import { NextFunction, Request, Response } from "express";
import prisma from "../db";

/*
 * get all portfolios of a user
 * @param {Request} req
 * @param {Request} req.user - user data assigned on login
 * @param {string} req.user.email - user email
 * @param {Response} res
 * @param {object[]} res.data - array of portfolios
 */
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
    });
    res.json({ data: portfolios });
  } catch (error) {
    next(error); // pass error to express error handler
  }
};

/*
 * get a single portfolio from a user
 * @param {Request} req
 * @param {Request} req.user - user data assigned on login
 * @param {string} req.user.email - user email
 * @param {Response} res
 * @param {object} res.data - portfolio object
 * @param {object[]} res.data.canvases - array of canvas objects
 */
// TODO: verify user owns portfolio
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
      include: {
        canvases: true,
      },
    });

    res.json({ data: portfolio });
  } catch (error) {
    next(error);
  }
};

/*
 * create a portfolio for a user
 * @param {Request} req
 * @param {Request} req.user - user data assigned on login
 * @param {string} req.body.name - name of portfolio
 * @param {Response} res
 * @param {object} res.data - portfolio object
 */
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

/*
 * update a portfolio name
 * @param {Request} req
 * @param {Request} req.user - user data assigned on login
 * @param {string} req.params.id - portfolio id
 * @param {string} req.body.name - new name of portfolio
 * @param {Response} res
 * @param {object} res.data - portfolio object
 */
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

/* deletes a portfolio
 * @param {Request} req
 * @param {object} req.user - user data assigned on login
 * @param {string} req.user.id - user id
 * @param {string} req.params.id - portfolio id
 * @param {Response} res
 * @param {object} res.data - portfolio object
 */
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
