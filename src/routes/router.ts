import { Router, Request, Response } from "express";

const router = Router();

/*
 * Portfolio routes
 */
router.get("/portfolio", (req: Request, res: Response) => {
  res.json({ message: "Hello from /portfolio" });
});
router.get("/portfolio/:id", (req: Request, res: Response) => {});
router.post("/portfolio", (req: Request, res: Response) => {});
router.put("/portfolio/:id", (req: Request, res: Response) => {});
router.delete("/portfolio/:id", (req: Request, res: Response) => {});

/*
 * Canvas routes
 */
router.get("/canvas/:id", (req: Request, res: Response) => {});
router.post("/canvas", (req: Request, res: Response) => {});
router.put("/canvas/:id", (req: Request, res: Response) => {});
router.delete("/canvas/:id", (req: Request, res: Response) => {});

export default router;
