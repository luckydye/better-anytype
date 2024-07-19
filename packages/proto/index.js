import Struct from "google-protobuf/google/protobuf/struct_pb.js";

const { Commands, Model, Events, Service } = {
	Commands: require("./lib/pb/protos/commands_pb.js"),
	Model: require("./lib/pkg/lib/pb/model/protos/models_pb.js"),
	Events: require("./lib/pb/protos/events_pb.js"),
	Service: require("./lib/pb/protos/service/service_grpc_web_pb.js"),
};

const Rpc = Commands.Rpc;
const Empty = Commands.Empty;

const prepare = (o) => {
	if (typeof o === "undefined") {
		o = null;
	} else if (typeof o === "object") {
		for (const k in o) {
			if (typeof o[k] === "object") {
				o[k] = prepare(o[k]);
			} else if (typeof o[k] === "undefined") {
				o[k] = null;
			}
		}
	}
	return o;
};

class Encode {
	static struct(obj) {
		return Struct.Struct.fromJavaScript(prepare(obj));
	}

	static value(value) {
		return Struct.Value.fromJavaScript(prepare(value));
	}
}

class Decode {
	static value(value) {
		let data = null;
		try {
			data = value ? value.toJavaScript() : null;
		} catch (e) {
			/**/
		}
		return data;
	}

	static struct(struct) {
		let data = {};
		try {
			data = struct ? struct.toJavaScript() : {};
		} catch (e) {
			/**/
		}
		return data;
	}
}

module.exports = {
	Commands,
	Model,
	Events,
	Service,
	Rpc,
	Empty,
	Encode,
	Decode,
};
