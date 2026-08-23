import { items as dressesGowns } from "./items/dresses-gowns";
import { items as topsTees } from "./items/tops-tees";
import { items as bottomwear } from "./items/bottomwear";
import { items as kurtiTopwear } from "./items/kurti-topwear";
import { items as feedingBras } from "./items/feeding-bras";
import { items as bras } from "./items/bras";
import { items as panties } from "./items/panties";

export const items = {
  ...dressesGowns,
  ...topsTees,
  ...bottomwear,
  ...kurtiTopwear,
  ...feedingBras,
  ...bras,
  ...panties,
};

export type Item = (typeof items)[keyof typeof items];
