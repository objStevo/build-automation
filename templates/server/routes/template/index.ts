import { Router } from "express";
import { template } from "../../controllers";
const router = Router();

router.get("/template", template);

export { router };
