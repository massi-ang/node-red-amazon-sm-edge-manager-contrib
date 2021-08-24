// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const messages = require('./lib/agent_pb');
const client = require('./lib/agent_client');

module.exports = function(RED) {
	"use strict";

	function SMEdgeManagerPredictNode(n) {
		RED.nodes.createNode(this,n);
        const node = this;
        node.model = RED.nodes.getNode(n.model);

        if (node.model === undefined) {
            node.status({fill:"red",shape:"ring",text:"no model configured"});
            node.error(`Model ${n.model}`);
            return;
        }
        var req = new messages.LoadModelRequest();
        req.setName(node.model.modelName);
        req.setUrl(node.model.modelUri);

        client.service.loadModel(req, function(err, response) {
            if (err) {
                if (err.toString().includes('6')) {
                    node.status({fill:"yellow",shape:"ring",text:"model already loaded"});
                } else {
                    node.status({fill:"red",shape:"ring",text:"error loading model"});
                    node.error(`Model URL: ${node.model.modelUri} Error ${err}`);
                    return;
                }
            } 
            node.status({fill:"green",shape:"dot",text:"ready"});
        })
        var modelReq = new messages.DescribeModelRequest();
        
        modelReq.setName(node.model.modelName);

        client.service.describeModel(modelReq, function (err, response) {
            if (err) {
                node.status({fill:"red",shape:"ring",text:"cannot retrieve model"});
                node.error(err);
                return;
            }
            const model = response.getModel();
            // We assume only one tensor model for now
            const metadata = model.getInputTensorMetadatasList();
            if (metadata.length > 1) {
                node.status({fill:"red",shape:"ring",text:"model requires >1 tensors"});
                return;
            }
            node.tensorMetadata = metadata[0];
        });

		node.on("input", function(msg) {
			var sendMsg = function (err, data) {
				if (err) {
				    node.status({fill:"red",shape:"ring",text:"error"});
                    node.error("failed: " + err.toString(), msg);
                    node.send([null, { err: err }]);
    				return;
				} 
                msg.payload = data;
                node.status({});
				node.send([msg,null]);
			};
            var req = new messages.PredictRequest();
            var t = new messages.Tensor();
            var meta = new messages.TensorMetadata();

            meta.setName(node.tensorMetadata.getName());
            meta.setDataType(node.tensorMetadata.getDataType());
            meta.setShapeList(node.tensorMetadata.getShapeList());
            t.setTensorMetadata(meta);
            t.setByteData(msg.payload);
            req.setName(node.model.modelName);
            req.addTensor(t); 

            client.service.predict(req, function(err, response) {
                sendMsg(err, response);
            })
            
		});
	}
	RED.nodes.registerType("predict", SMEdgeManagerPredictNode);
};