import express from 'express'
import cors from 'cors'
import WifiManager from 'node-wifi'
import bodyParser from 'body-parser'
import dgram from 'dgram'

const app = express()
const encoder = bodyParser.urlencoded({extended: true})

// Cria o servidor UDP uma única vez
const server = dgram.createSocket('udp4')
const HOST = '192.168.195.68'
const PORT = 12345

app.use(express.json({
    verify: (req, res, buf) => {
      try {
        // Tentativa de parse para detectar JSON inválido antecipadamente
        if (buf.length > 0) JSON.parse(buf.toString());
      } catch (e) {
        console.error('JSON inválido recebido:', buf.toString());
        throw new Error('Formato JSON inválido');
      }
    }
  }));
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})


const WifiList = []

app.get('/scan', async(req, res) => {
    try {
        WifiManager.init({
            iface: null
        })

        WifiManager.scan((error, networks) => {
            if(networks){
                res.status(200).json(networks)
                WifiList.push(networks)
            }
            else res.status(500).json('Scan failed')
        })
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/connect/:name', (req, res) => {
    WifiManager.init({
        iface: null
    })

    const name = req.params.name
    const password = req.body.password

    WifiManager.connect({ ssid: name, password: password }, (err, data) => {
        if(err) {
            console.log('Erro ao conectar ao wifi:', err)
            res.status(500).json({ error: err.message })
        } else {
            console.log('Connected to wifi:')
            res.json({ success: true, message: 'Conectado com sucesso:', data })
        }    
    })
})

let labelToSend 

app.post('/postData', encoder, (req, res) => {
    const data = req.body
    console.log('Dados recebidos com sucesso!')
    res.status(200).json({message: 'Dados recebidos com sucesso'})

//    console.log('Datas:', data)

    // labelToSend = 

    server.send(Buffer.from(data.label), PORT, HOST, (err) => {
        if(err) console.log('Erro ao enviar para ESP32:', err)
        else{
            console.log("Messagem enviada com sucesso:", data.label)
        }    
    })

    // sendToESP32(data.label)

    //Send the sms to esp

})

// Endpoint modificado para obter dados UDP

const udpMessages = []
// server.on('message', (msg, rinfo) => {
//     // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
//     udpMessages.push({
//         message: msg.toString(),
//         from: `${rinfo.address}:${rinfo.port}`,
//         timestamp: new Date()
//     })

    udpMessages.splice(0, udpMessages.length - 1)

    // const values = udpDatas[0].message.split(',')
    
    // saveData(val1, val2, val3, val4)
// })

app.get('/getUdpData', (req, res) => {
    // Retorna todas as mensagens acumuladas
    // res.json(udpMessages)
    
    // Opcional: limpar as mensagens após enviar
    // udpMessages.length = 0
})

// const readFile = fs.readFileSync('potentiometer-data.json')

app.get('/readFile', (req, res) => {
    // res.status(200).json(JSON.parse(readFile))
    // console.log(JSON.parse(readFile))
})

app.listen(4000, e => {
    if(e) console.log('Erro ao escutar a porta:', e)
    else console.log('App rodando...')    
})