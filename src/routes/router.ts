import { Router } from "express";
import {
  createPortfolio,
  deletePortfolio,
  getAllPortfolios,
  getSinglePortfolio,
  updatePortfolio,
} from "../handlers/portfolio";
import {
  createCanvas,
  deleteCanvas,
  getAllCanvases,
  getCanvas,
  updateCanvas,
} from "../handlers/canvas";

/*
 ********************
 * PROTECTED ROUTES *
 ********************
 */

const router = Router();

/*
 * Portfolio routes
 * TODO: sanitize inputs
 */
router.get("/portfolio", getAllPortfolios);
router.get("/portfolio/:id", getSinglePortfolio);
router.post("/portfolio", createPortfolio);
router.put("/portfolio/:id", updatePortfolio);
router.delete("/portfolio/:id", deletePortfolio);

/*
 * Canvas routes
 * TODO: sanitize inputs
 */
router.get("/canvas", getAllCanvases);
router.get("/canvas/:id", getCanvas);
router.post("/canvas", createCanvas);
router.put("/canvas/:id", updateCanvas);
router.delete("/canvas/:id", deleteCanvas);

export default router;
