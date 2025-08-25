import { Router } from 'express';
import { makeOwnerController } from "../../app/factories/ownerControllerFactory.js";

const router = Router();
const { getOwnerAllUseCase } = makeOwnerController();

// Passando uma função de callback corretamente
router.get('/', async (req, res) => {
  try {
    const owners = await getOwnerAllUseCase.execute();
    res.json(owners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
