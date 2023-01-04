import http from "http"
import Mongo from "./repository/Mongo";
import dotenv from "dotenv";
import nodeMailer from "nodemailer";

dotenv.config()

const { URI } = process.env
const db: Mongo = new Mongo(String(URI))

db.Connect()

http.createServer((req, res) => {
  switch (String(req.method)) {
    case "POST":
      console.log("POST /")
      let body = '';
      req.on('data', (data) => {
        body += data

        let result = JSON.parse(body)
        // sendMail()
        console.log(result)
        db.InsertData(result)


        let msg: Object = msgResponse()
        let jsonStr = JSON.stringify(msg)
        res.write(jsonStr)
        res.end()

      })
      req.on('end', function () {
        // console.log(JSON.parse(body));

      });
      break;
    case "GET":
      res.setHeader('Content-Type', 'application/json')
      console.log('GET /')

      sendDataToClient(req, res)

      break;

    default:
      break;
  }
})
  .listen(8080, () => console.log(`http://localhost:8080`))

const msgResponse = () => {
  return {
    message: 'Data sent successfully',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  }
}

async function sendDataToClient(req: any, res: any) {
  const add = []
  const x = await db.List()
  // add.push(x)
  res.write(JSON.stringify(x))
  res.end()
}

function sendMail() {
  var transporter = nodeMailer.createTransport({
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

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
  });
}