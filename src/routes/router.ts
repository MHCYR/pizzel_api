import { Router, Request, Response } from "express";
import {
  createPortfolio,
  deletePortfolio,
  getAllPortfolios,
  getSinglePortfolio,
  updatePortfolio,
} from "../handlers/portfolio";

const router = Router();

/*
 * Portfolio routes
 */
router.get("/portfolio", getAllPortfolios);
router.get("/portfolio/:id", getSinglePortfolio);
router.post("/portfolio", createPortfolio);
router.put("/portfolio/:id", updatePortfolio);
router.delete("/portfolio/:id", deletePortfolio);

/*
 * Canvas routes
 */
router.get("/canvas/:id", (req: Request, res: Response) => {});
router.post("/canvas", (req: Request, res: Response) => {});
router.put("/canvas/:id", (req: Request, res: Response) => {});
router.delete("/canvas/:id", (req: Request, res: Response) => {});

export default router;
