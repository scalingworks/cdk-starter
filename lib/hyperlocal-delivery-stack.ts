import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class HyperlocalDeliveryStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ecrRepository = new ecr.Repository(this, 'hyperlocal-delivery-api', {
      repositoryName: 'oneretail/hyperlocal-delivery-api'
    });


    new CfnOutput(this, 'EcrRepositoryUri', {
      description: 'ECR Repository URI',
      value: ecrRepository.repositoryUri
    });
  }
}