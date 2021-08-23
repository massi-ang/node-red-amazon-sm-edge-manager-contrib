// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const services = require('./agent_grpc_pb');
const grpc = require('@grpc/grpc-js');

const target = 'unix:///tmp/aws.greengrass.SageMakerEdgeManager.sock';
const service = new services.AgentClient(target, grpc.ChannelCredentials.createInsecure());

module.exports = {
    service
}