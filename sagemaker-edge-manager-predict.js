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

        const getModelDefinition = function() {
            return new Promise((res, rej) => {
                var modelReq = new messages.DescribeModelRequest();
            
                modelReq.setName(node.model.modelName);

                client.service.describeModel(modelReq, function (err, response) {
                    if (err) {
                        node.status({fill:"red",shape:"ring",text:"cannot retrieve model"});
                        rej(err);
                    }
                    const model = response.getModel();
                    // We assume only one tensor model for now
                    const metadata = model.getInputTensorMetadatasList();
                    if (metadata.length > 1) {
                        node.status({fill:"red",shape:"ring",text:"model requires >1 tensors"});
                        rej(new Error("Too many tensors"));
                    }
                    node.tensorMetadata = metadata[0];
                    node.status({fill:"green",shape:"dot",text:"ready"});
                    res();
                });
            });

        }

        const loadModel = function () {
            return new Promise((res, rej) => {
                client.service.loadModel(req, function(err, response) {
                    if (err) {
                        if (err.toString().includes('6')) {
                            node.warn(`Model ${node.model.modelName} is already loaded. It might not be the model you want.`);
                        } else {
                            node.status({fill:"red",shape:"ring",text:"error loading model"});
                            rej(new Error(`Model URL: ${node.model.modelUri} Error ${err}`));
                            return;
                        }
                    } 
                    node.modelName = node.model.modelName;
                    getModelDefinition().then(res).catch(err => {node.error(err);});
                })
            })
        };

        const unloadModel = function() {
            return new Promise((res, rej) => {
                if (!node.modelName) {
                    rej(new Error("no model loaded"));
                }
                var req = new messages.UnLoadModelRequest();
                req.setName(node.modelName);

                client.unLoadModel(req, function(err, response) {
                    if (err) {
                        node.status({fill:"red",shape:"ring",text:"error"});
                        rej(err);
                        return;
                    } 
                    node.status({fill:"yellow", shape:"ring", text: "no model loaded"});
                    res(node.ModelName);
                })
            });
        }
        
        loadModel().catch(err => {node.error(err)});

		node.on("input", function(msg, send, done) {
            const doPrediction = function() {
                var req = new messages.PredictRequest();
                var t = new messages.Tensor();
                var meta = new messages.TensorMetadata();

                meta.setName(node.tensorMetadata.getName());
                meta.setDataType(node.tensorMetadata.getDataType());
                meta.setShapeList(node.tensorMetadata.getShapeList());
                t.setTensorMetadata(meta);
                t.setByteData(msg.payload);
                req.setName(node.model.modelName);
                req.setTensorsList([t]); 

                client.service.predict(req, function(err, response) {
                    if (err) {
                        node.status({fill:"red",shape:"ring",text:"error"});
                        done(err);
                        return;
                    } 
                    const tensors = response.getTensorsList()
                    for (var i in tensors) {
                        msg.payload = tensors[i].getByteData();
                        msg.metadata = tensors[i].getTensorMetadata().getShapeList();
                        msg.modelName = node.model.modelName;
                        send(msg);
                    }
                    done();
                })
            }
            
            if (msg.loadModel) {
                loadModel().then(done).catch(err=>{done(err);});
            } else if (msg.unLoadMode) {
                unloadModel().then(m => { msg.modelName = m; send(msg);}).catch(err => {done(err);});
            } else if (msg.refreshModel) {
                if (!node.tensorMetadata) {
                    done(new Error(`No model loaded`));
                    return;
                }
                getModelDefinition().then(done).catch(err=>{done(err);});
            } else {
                if (!node.tensorMetadata) {
                    done(new Error(`No model loaded`));
                    return;
                }
                doPrediction();
            }
		});
	}
	RED.nodes.registerType("predict", SMEdgeManagerPredictNode);
};