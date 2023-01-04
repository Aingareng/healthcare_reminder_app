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
const http_1 = __importDefault(require("http"));
const Mongo_1 = __importDefault(require("./repository/Mongo"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const { URI } = process.env;
const db = new Mongo_1.default(String(URI));
db.Connect();
http_1.default.createServer((req, res) => {
    switch (String(req.method)) {
        case "POST":
            console.log("POST /");
            let body = '';
            req.on('data', (data) => {
                body += data;
                let result = JSON.parse(body);
                // sendMail()
                console.log(result);
                db.InsertData(result);
                let msg = msgResponse();
                let jsonStr = JSON.stringify(msg);
                res.write(jsonStr);
                res.end();
            });
            req.on('end', function () {
                // console.log(JSON.parse(body));
            });
            break;
        case "GET":
            res.setHeader('Content-Type', 'application/json');
            console.log('GET /');
            sendDataToClient(req, res);
            break;
        default:
            break;
    }
})
    .listen(8080, () => console.log(`http://localhost:8080`));
const msgResponse = () => {
    return {
        message: 'Data sent successfully',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
};
function sendDataToClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const add = [];
        const x = yield db.List();
        // add.push(x)
        res.write(JSON.stringify(x));
        res.end();
    });
}
function sendMail() {
    var transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'ngarengai@gmail.com',
            pass: 'pepabri123'
        }
    });
    var mailOptions = {
        from: 'ngarengai@gmail.com',
        to: 'ngarengai@gmail.com',
        subject: 'Sending Email using Nodejs',
        text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            throw err;
        console.log('Email sent: ' + info.response);
    });
}
