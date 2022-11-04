import { Constraint } from '../../plugins/scenario';
import { CometContext } from '../context/CometContext';
import { expect } from 'chai';
import { Requirements } from './Requirements';
import { exp } from '../../test/helpers';
import { ComparisonOp, getAssetFromName, parseAmount } from '../utils';

export class PriceConstraint<T extends CometContext, R extends Requirements> implements Constraint<T, R> {
  async solve(requirements: R, _initialContext: T) {
    return async function (ctx: T): Promise<T> {
      const prices = requirements.prices;
      if (prices !== undefined) {
        const assetPriceMap = {};
        for (const [assetAlias, price] of Object.entries(prices)) {
          const cometAsset = await getAssetFromName(assetAlias, ctx);
          assetPriceMap[cometAsset.address] = price;
        }
        await ctx.updatePriceFeeds(assetPriceMap);
      }
      return ctx;
    };
  }

  async check(requirements: R, context: T) {
    // XXX
  }
}