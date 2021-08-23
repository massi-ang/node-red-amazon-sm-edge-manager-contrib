// Copyright 2021 Amazon.com.
// SPDX-License-Identifier: MIT

const messages = require('./lib/agent_pb');
const client = require('./lib/agent_client');

module.exports = function(RED) {
	"use strict";

	function SMEdgeManagerPredictNode(n) {
		RED.nodes.createNode(this,n);
        const node = this;
        var req = new messages.LoadModelRequest();
        req.setName(n.model.modelName);
        req.setUrl(n.model.modelUrl);

        client.service.loadModel(req, function(err, response) {
            if (err) {
                node.status({fill:"red",shape:"ring",text:"error loading model"});
                node.error(err);
                return;
            } 
            node.status({fill:"green",shape:"dot",text:"ready"});
        })


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
            var modelReq = new messages.DescribeModelRequest();
            var modelName = n.model.modelName;
            modelReq.setName(modelName);
            client.service.describeModel(req, function (err, response) {
                if (err) {
                    node.status({fill:"red",shape:"ring",text:"error"});
                    node.error("failed: " + err.toString(), msg);
                    node.send([null, { err: err }]);
    				return;
                }
                response.getName
                var t = new messages.Tensor();
                var meta = new messages.TensorMetadata();
                var model = response.getModel();

                meta.setName(response.getName);
                meta.setDataType(response.getDataType)
                req.setName(modelName);
                req.addTensor(msg.tensor); 

                client.service.predict(req, function(err, response) {
                    sendMsg(err, response);
                })
            })
            
		});
	}
	RED.nodes.registerType("predict", SMEdgeManagerPredictNode);
};