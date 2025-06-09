import { Router } from "express";
import * as locationControllers from "../controllers/location.controllers.js";

const router = Router();

router.route("/countries").get(locationControllers.getAllCountries);
router
  .route("/states/:countryCode")
  .get(locationControllers.getStatesOfCountry);
router
  .route("/cities/:countryCode/:stateCode")
  .get(locationControllers.getCitiesOfState);

export default router;
