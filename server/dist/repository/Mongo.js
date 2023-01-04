"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_NAME, ESP32_COLLECTION, CONSUMPTION_TIME_COLLECTION } = process.env;
class Mongo {
    constructor(uri) {
        this._uri = uri;
        this._client = new mongodb_1.MongoClient(this._uri);
    }
    Connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._client.connect();
                console.log("connected database");
            }
            catch (error) {
                console.log("Database failed to connect");
                console.error(error);
            }
        });
    }
    InsertData(result = '') {
        try {
            const db = this._client.db(String(DB_NAME));
            const collection = db.collection(String(ESP32_COLLECTION));
            collection.insertOne({
                update_date: new Date().toLocaleDateString(),
                update_time: new Date().toLocaleTimeString(),
                result
            });
            console.log("successfully added sensor data");
        }
        catch (error) {
            console.error(error);
        }
    }
    InsertConsumptionTime() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = this._client.db(String(DB_NAME));
                const collection = yield db.createCollection(String(CONSUMPTION_TIME_COLLECTION));
                // collection.insertOne({
                //   params
                // })
                console.log("successfully added consumption time data");
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    List() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = this._client.db(String(DB_NAME));
                const dhtCollection = yield db.collection(String(ESP32_COLLECTION));
                return dhtCollection.find().toArray();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Mongo;
