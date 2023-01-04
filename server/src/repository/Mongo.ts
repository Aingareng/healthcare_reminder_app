import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config()
const { DB_NAME, ESP32_COLLECTION, CONSUMPTION_TIME_COLLECTION } = process.env

export default class Mongo {
  private _uri: string
  private _client: MongoClient


  constructor(uri: string) {
    this._uri = uri
    this._client = new MongoClient(this._uri)
  }

  public async Connect() {
    try {
      await this._client.connect()
      console.log("connected database")

    } catch (error) {
      console.log("Database failed to connect")
      console.error(error)
    }
  }

  public InsertData(result: string = '') {
    try {
      const db = this._client.db(String(DB_NAME))
      const collection = db.collection(String(ESP32_COLLECTION))

      collection.insertOne({
        update_date: new Date().toLocaleDateString(),
        update_time: new Date().toLocaleTimeString(),
        result
      })
      console.log("successfully added sensor data")
    } catch (error) {
      console.error(error)
    }
  }
  public async InsertConsumptionTime() {
    try {
      const db = this._client.db(String(DB_NAME))
      const collection = await db.createCollection(String(CONSUMPTION_TIME_COLLECTION))

      // collection.insertOne({
      //   params
      // })
      console.log("successfully added consumption time data")

    } catch (error) {
      console.error(error)
    }

  }

  public async List() {
    try {
      const db = this._client.db(String(DB_NAME))
      const dhtCollection = await db.collection(String(ESP32_COLLECTION))
      return dhtCollection.find().toArray()

    } catch (error) {
      console.log(error)
    }
  }
  // public async List() {
  //   try {
  //     const db = this._client.db(String(DB_NAME))
  //     const dhtCollection = await db.collection(String(ESP32_COLLECTION))
  //     return dhtCollection.find().toArray()

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


}