// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const services = require('./agent_grpc_pb');
const grpc = require('@grpc/grpc-js');

const DEFAULT_TARGET = 'unix:///tmp/aws.greengrass.SageMakerEdgeManager.sock';
const service = new services.AgentClient(target, grpc.ChannelCredentials.createInsecure());

module.exports = function (target) {
    return new services.AgentClient(target || DEFAULT_TARGET , grpc.ChannelCredentials.createInsecure());
}
