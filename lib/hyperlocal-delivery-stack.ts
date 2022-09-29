import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { API } from './api';
import { AdminPortal } from './admin-portal';

interface IEnvironmentConfig {
  domain: string;
  api: { ecrRepositoryName: string };
  adminPortal: {domain: string; subDomain: string};
}
export class HyperlocalDeliveryStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const environment: string = process.env.ENV || 'local';
    const config: IEnvironmentConfig = scope.node.tryGetContext(environment);
    new API(this, 'hyperlocal-delivery-api', {
      ecrRepositoryName: config.api.ecrRepositoryName
    });

    new AdminPortal(this, 'hyperlocal-delivery-admin', {
      domainName: config.domain,
      siteSubDomain: config.adminPortal.subDomain,
  });
  }
}