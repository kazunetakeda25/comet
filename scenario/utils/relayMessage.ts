import { DeploymentManager } from '../../plugins/deployment_manager';
import relayMumbaiMessage from './relayMumbaiMessage';
import relayPolygonMessage from './relayPolygonMessage';

export default async function relayMessage(
  governanceDeploymentManager: DeploymentManager,
  bridgeDeploymentManager: DeploymentManager
) {
  const bridgeNetwork = bridgeDeploymentManager.network;
  switch (bridgeNetwork) {
    case 'optimism':
      await relayPolygonMessage(governanceDeploymentManager, bridgeDeploymentManager);
      break;
    case 'mumbai':
      await relayMumbaiMessage(governanceDeploymentManager, bridgeDeploymentManager);
      break;
    default:
      throw new Error(`No message relay implementation from ${bridgeNetwork} -> ${governanceDeploymentManager.network}`);
  }
}
