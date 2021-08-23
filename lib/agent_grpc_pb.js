// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
//
// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
//
'use strict';
var grpc = require('@grpc/grpc-js');
var agent_pb = require('./agent_pb.js');

function serialize_AWS_SageMaker_Edge_CaptureDataRequest(arg) {
  if (!(arg instanceof agent_pb.CaptureDataRequest)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.CaptureDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_CaptureDataRequest(buffer_arg) {
  return agent_pb.CaptureDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_CaptureDataResponse(arg) {
  if (!(arg instanceof agent_pb.CaptureDataResponse)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.CaptureDataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_CaptureDataResponse(buffer_arg) {
  return agent_pb.CaptureDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_DescribeModelRequest(arg) {
  if (!(arg instanceof agent_pb.DescribeModelRequest)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.DescribeModelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_DescribeModelRequest(buffer_arg) {
  return agent_pb.DescribeModelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_DescribeModelResponse(arg) {
  if (!(arg instanceof agent_pb.DescribeModelResponse)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.DescribeModelResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_DescribeModelResponse(buffer_arg) {
  return agent_pb.DescribeModelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_GetCaptureDataStatusRequest(arg) {
  if (!(arg instanceof agent_pb.GetCaptureDataStatusRequest)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.GetCaptureDataStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_GetCaptureDataStatusRequest(buffer_arg) {
  return agent_pb.GetCaptureDataStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_GetCaptureDataStatusResponse(arg) {
  if (!(arg instanceof agent_pb.GetCaptureDataStatusResponse)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.GetCaptureDataStatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_GetCaptureDataStatusResponse(buffer_arg) {
  return agent_pb.GetCaptureDataStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_ListModelsRequest(arg) {
  if (!(arg instanceof agent_pb.ListModelsRequest)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.ListModelsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_ListModelsRequest(buffer_arg) {
  return agent_pb.ListModelsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_ListModelsResponse(arg) {
  if (!(arg instanceof agent_pb.ListModelsResponse)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.ListModelsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_ListModelsResponse(buffer_arg) {
  return agent_pb.ListModelsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_LoadModelRequest(arg) {
  if (!(arg instanceof agent_pb.LoadModelRequest)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.LoadModelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_LoadModelRequest(buffer_arg) {
  return agent_pb.LoadModelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_LoadModelResponse(arg) {
  if (!(arg instanceof agent_pb.LoadModelResponse)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.LoadModelResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_LoadModelResponse(buffer_arg) {
  return agent_pb.LoadModelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_PredictRequest(arg) {
  if (!(arg instanceof agent_pb.PredictRequest)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.PredictRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_PredictRequest(buffer_arg) {
  return agent_pb.PredictRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_PredictResponse(arg) {
  if (!(arg instanceof agent_pb.PredictResponse)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.PredictResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_PredictResponse(buffer_arg) {
  return agent_pb.PredictResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_UnLoadModelRequest(arg) {
  if (!(arg instanceof agent_pb.UnLoadModelRequest)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.UnLoadModelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_UnLoadModelRequest(buffer_arg) {
  return agent_pb.UnLoadModelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AWS_SageMaker_Edge_UnLoadModelResponse(arg) {
  if (!(arg instanceof agent_pb.UnLoadModelResponse)) {
    throw new Error('Expected argument of type AWS.SageMaker.Edge.UnLoadModelResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AWS_SageMaker_Edge_UnLoadModelResponse(buffer_arg) {
  return agent_pb.UnLoadModelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AgentService = exports.AgentService = {
  //
//  perform inference on a model.
//
// Note:
//  1. users can chose to send the tensor data in the protobuf message or
//       through a shared memory segment on a per tensor basis, the Predict
//       method with handle the decode transparently.
//  2. serializing large tensors into the protobuf message can be quite expensive,
//       based on our measurements it is recommended to use shared memory of
//       tenors larger than 256KB.
//  3. SMEdge IPC server will not use shared memory for returning output tensors,
//       i.e., the output tensor data will always send in byte form encoded
//       in the tensors of PredictResponse.
//  4. currently SMEdge IPC server cannot handle concurrent predict calls, all
//       these call will be serialized under the hood. this shall be addressed
//       in a later release.
// Status Codes:
//  1. OK - prediction is successful
//  2. UNKNOWN - unknown error has occurred
//  3. INTERNAL - an internal error has occurred
//  4. NOT_FOUND - when model not found
//  5. INVALID_ARGUMENT - when tenors types mismatch
//
predict: {
    path: '/AWS.SageMaker.Edge.Agent/Predict',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.PredictRequest,
    responseType: agent_pb.PredictResponse,
    requestSerialize: serialize_AWS_SageMaker_Edge_PredictRequest,
    requestDeserialize: deserialize_AWS_SageMaker_Edge_PredictRequest,
    responseSerialize: serialize_AWS_SageMaker_Edge_PredictResponse,
    responseDeserialize: deserialize_AWS_SageMaker_Edge_PredictResponse,
  },
  //
//  perform load for a model
// Note:
//  1. currently only local filesystem paths are supported for loading models.
//  2. currently only one model could be loaded at any time, loading of multiple
//       models simultaneously shall be implemented in the future.
//  3. users are required to unload any loaded model to load another model.
// Status Codes:
//  1. OK - load is successful
//  2. UNKNOWN - unknown error has occurred
//  3. INTERNAL - an internal error has occurred
//  4. NOT_FOUND - model doesn't exist at the url
//  5. ALREADY_EXISTS - model with the same name is already loaded
//  6. RESOURCE_EXHAUSTED - memory is not available to load the model
//  7. FAILED_PRECONDITION - model package could not be loaded
//
loadModel: {
    path: '/AWS.SageMaker.Edge.Agent/LoadModel',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.LoadModelRequest,
    responseType: agent_pb.LoadModelResponse,
    requestSerialize: serialize_AWS_SageMaker_Edge_LoadModelRequest,
    requestDeserialize: deserialize_AWS_SageMaker_Edge_LoadModelRequest,
    responseSerialize: serialize_AWS_SageMaker_Edge_LoadModelResponse,
    responseDeserialize: deserialize_AWS_SageMaker_Edge_LoadModelResponse,
  },
  //
//  perform unload for a model
// Status Codes:
//  1. OK - unload is successful
//  2. UNKNOWN - unknown error has occurred
//  3. INTERNAL - an internal error has occurred
//  4. NOT_FOUND - model doesn't exist
//
unLoadModel: {
    path: '/AWS.SageMaker.Edge.Agent/UnLoadModel',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.UnLoadModelRequest,
    responseType: agent_pb.UnLoadModelResponse,
    requestSerialize: serialize_AWS_SageMaker_Edge_UnLoadModelRequest,
    requestDeserialize: deserialize_AWS_SageMaker_Edge_UnLoadModelRequest,
    responseSerialize: serialize_AWS_SageMaker_Edge_UnLoadModelResponse,
    responseDeserialize: deserialize_AWS_SageMaker_Edge_UnLoadModelResponse,
  },
  //
//  lists the loaded models
// Status Codes:
//  1. OK - unload is successful
//  2. UNKNOWN - unknown error has occurred
//  3. INTERNAL - an internal error has occurred
//
listModels: {
    path: '/AWS.SageMaker.Edge.Agent/ListModels',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.ListModelsRequest,
    responseType: agent_pb.ListModelsResponse,
    requestSerialize: serialize_AWS_SageMaker_Edge_ListModelsRequest,
    requestDeserialize: deserialize_AWS_SageMaker_Edge_ListModelsRequest,
    responseSerialize: serialize_AWS_SageMaker_Edge_ListModelsResponse,
    responseDeserialize: deserialize_AWS_SageMaker_Edge_ListModelsResponse,
  },
  //
//  describes a model
// Status Codes:
//  1. OK - load is successful
//  2. UNKNOWN - unknown error has occurred
//  3. INTERNAL - an internal error has occurred
//  4. NOT_FOUND - model doesn't exist at the url
//
describeModel: {
    path: '/AWS.SageMaker.Edge.Agent/DescribeModel',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.DescribeModelRequest,
    responseType: agent_pb.DescribeModelResponse,
    requestSerialize: serialize_AWS_SageMaker_Edge_DescribeModelRequest,
    requestDeserialize: deserialize_AWS_SageMaker_Edge_DescribeModelRequest,
    responseSerialize: serialize_AWS_SageMaker_Edge_DescribeModelResponse,
    responseDeserialize: deserialize_AWS_SageMaker_Edge_DescribeModelResponse,
  },
  //
//  allows users to capture input and output tensors along with auxiliary data.
// Status Codes:
//  1. OK - data capture successfully initiated
//  2. UNKNOWN - unknown error has occurred
//  3. INTERNAL - an internal error has occurred
//  5. ALREADY_EXISTS - capture initiated for the given `capture_id`
//  6. RESOURCE_EXHAUSTED - buffer is full cannot accept any more requests.
//  7. OUT_OF_RANGE - timestamp is in the future.
//  8. INVALID_ARGUMENT - capture_id is not of expected format or input tensor paramater is invalid
//  9. FAILED_PRECONDITION - Indicates failed network access, when using cloud for capture data.
//
captureData: {
    path: '/AWS.SageMaker.Edge.Agent/CaptureData',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.CaptureDataRequest,
    responseType: agent_pb.CaptureDataResponse,
    requestSerialize: serialize_AWS_SageMaker_Edge_CaptureDataRequest,
    requestDeserialize: deserialize_AWS_SageMaker_Edge_CaptureDataRequest,
    responseSerialize: serialize_AWS_SageMaker_Edge_CaptureDataResponse,
    responseDeserialize: deserialize_AWS_SageMaker_Edge_CaptureDataResponse,
  },
  //
//  allows users to query status of capture data operation
// Status Codes:
//  1. OK - data capture successfully initiated
//  2. UNKNOWN - unknown error has occurred
//  3. INTERNAL - an internal error has occurred
//  4. NOT_FOUND - given capture id doesn't exist.
//
getCaptureDataStatus: {
    path: '/AWS.SageMaker.Edge.Agent/GetCaptureDataStatus',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.GetCaptureDataStatusRequest,
    responseType: agent_pb.GetCaptureDataStatusResponse,
    requestSerialize: serialize_AWS_SageMaker_Edge_GetCaptureDataStatusRequest,
    requestDeserialize: deserialize_AWS_SageMaker_Edge_GetCaptureDataStatusRequest,
    responseSerialize: serialize_AWS_SageMaker_Edge_GetCaptureDataStatusResponse,
    responseDeserialize: deserialize_AWS_SageMaker_Edge_GetCaptureDataStatusResponse,
  },
};

exports.AgentClient = grpc.makeGenericClientConstructor(AgentService);
