import { Router } from "express";

const router = Router();

router.get("/health", (_, res) => {
    return res.status(200).send();
});

export default router;
