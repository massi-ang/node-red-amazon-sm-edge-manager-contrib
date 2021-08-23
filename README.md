Download SM Edge manager Agent definitions

```bash
aws s3 cp "s3://sagemaker-edge-release-store-us-west-2-linux-x64/Releases/1.20210512.96da6cc/1.20210512.96da6cc.tgz" sm_agent.tgz
```

Extract protobuf definitions:

```bash
tar xf sm_agent.tgz ./docs/api/agent.proto
```

Install the protobuf compiler following the instructions https://github.com/protocolbuffers/protobuf

Ex. for macOSX:

```bash
npm install -g grpc-tools
```

Create the Javascript library:

```bash
grpc_tools_node_protoc  --proto_path=./docs/api --js_out=import_style=commonjs,binary:lib --grpc_out=grpc_js:lib agent.proto
```

Install google protobuf libraries:

```bash
npm install google-protobuf 
```

See https://github.com/grpc/grpc/blob/master/examples/node/static_codegen/greeter_client.js for examples for grpc in node.

## SageMaker Edge Manager Node-RED nodes

### Model (global)
A model configuration represents the model to load in SM Edge Manager. 
It is configured with the model name and the model URI.
On instantiation it Loads the model in SM Edge Manager.

### Predict 
conf: model
input: the byte data encoding the input tensor
output: a TypedArray representing the output tensor

The Predict node creates the necessary SM Edge Manager protobuf messages and invokes the server. 
The server is assumed to be the AWS IoT Greengrass public component one, hence the unix socket configuration (GRPC target) is assumed to be `unix:/tmp/....sock`.

## TypedArray nodes

### TypedArray Convert
config: typeOut
input: typed array
output: typed array of type typeOut based on the input array buffer
(tmp = new in.constructor(in); out = new typeOut(tmp.buffer))

### TypedArray ReType
config: typeOut
input: typed array
output: typed array of type typeOut
out = typeOut(in)

## Tensorflow nodes

In Node-RED there are already nodes to read images, etc. are also providing some nodes that expose the `tensorflow.js` tensors and corresponding operations providing visual pipelines to manipulate them. This might not be performant in all case so use it at your discretion.

### Tensor In
conf: data type
input: array, bytearray, buffer
output: tensor

### Tensor Out
input: tensor
out: Uint8Array

### Tensor Reshape
conf: new shape
input: tensor
output: tensor

### Tensor Slice
conf: slice from, slice to
input: tensor
output: tensor

### Tensor Transpose
conf: transpose indexes
input: tensor
output: tensor

For more advanced tensor operation you can use a Function node.

## Working with binary data in JavaScript

SM Edge Manager input is provided as ByteData which is the byte encoded representation of the tensors. Byte data in JavaScript is represented as Uint8Array. 

In order to covert the byte data to the corresponding Tensor, we need to first decode the byte representation based on the data type. To do this in JavaScript we can take advantage of ArrayBuffer and TypedArray.

Every TypedArray and Buffer in Javascript are backed by an ArrayBuffer that holds the machine byte representation. ArrayBuffer is alway a Uint8Array but it is not directly modifiable. You can only manipulate it via the TypedArray or Buffer using it.

TypedArray can be constructed from another TypedArray or from an ArrayBuffer. In the first case a new ArrayBuffer is created to represent the values. This ArrayBuffer is independent from the original ArrayBuffer.

```javascript
var a = new Uint32Array([1,2,3]);
var b = new Uint8Array(a);

a.buffer
//ArrayBuffer {
//  [Uint8Contents]: <01 00 00 00 02 00 00 00 03 00 00 00>,
//  byteLength: 12
//}

b.buffer
//ArrayBuffer { [Uint8Contents]: <01 02 03>, byteLength: 3 }
```

If the TypedArray is instead created from the backing ArrayBuffer both TypedArray are represented via the same data in memory and the values  depend on each other: manipulating the values of one TypedArray affects the values on the other TypedArray.

```javascript
var a = new Uint32Array([1,2,3]);
var b = new Uint8Array(a.buffer);
// Uint8Array(12) [
//   1, 0, 0, 0, 2,
//   0, 0, 0, 3, 0,
//   0, 0
// ]

b.buffer
// ArrayBuffer {
//   [Uint8Contents]: <01 00 00 00 02 00 00 00 03 00 00 00>,
//   byteLength: 12
// }

b[1] = 1

a
//Uint32Array(3) [ 257, 2, 3 ]
```

Using the above properties we can easily convert the SM EdgeManger inputs and outputs. For tensor operations we can make our life easier using `tensorflow.js`. 

Input tensors
1. acquire the data
1. convert to tensors
1. manipulate tensors if necessary (reshape, slice, transpose)
1. get the byte representation of the tensor
1. set the bytes with Tensor.setByteData() 

Output tensors
1. call Tensor.getByteData()
1. create a TypedArray matching the Tensor data type
1. if you need to manipulate the resulting tensor, create a tf.tensor from the TypedArray
