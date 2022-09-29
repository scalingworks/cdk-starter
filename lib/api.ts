#!/usr/bin/env node
import * as route53 from "aws-cdk-lib/aws-route53";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import { CfnOutput, Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import * as ecr from "aws-cdk-lib/aws-ecr";

export interface APIProps {
  ecrRepositoryName: string;
}

export class API extends Construct {
  constructor(parent: Stack, name: string, props: APIProps) {
    super(parent, name);

    let ecrRepository = ecr.Repository.fromRepositoryName(
      this,
      name,
      props.ecrRepositoryName
    );
    if (ecrRepository.repositoryUri === undefined) {
      ecrRepository = new ecr.Repository(this, name, {
        repositoryName: props.ecrRepositoryName,
      });
    }
    new CfnOutput(this, "EcrRepositoryUri", {
      description: "ECR Repository URI",
      value: ecrRepository.repositoryUri,
    });

    // TODO: Setup AppRunner and custom domain

  }
}
