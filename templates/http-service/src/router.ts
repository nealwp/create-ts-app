import { Router } from "express";
import service from "./service";

const router = Router();

router.get("/health", (_, res) => {
    return res.status(200).send();
});

router.get("/", (_, res) => {
    try {
        const examples = service.getExamples()
        return res.status(200).json(examples);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
});

router.post("/", (req, res) => {
    try {
        const saved = service.saveExample(req.body)
        return res.status(200).json(saved);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    try {
        const deleted = service.deleteExample(+id)
        return res.status(200).json(deleted);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
});

export default router;
