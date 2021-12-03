const express = require ('express');
var Web3 = require('web3');
const InputDataDecoder = require('ethereum-input-data-decoder')
const { saveData } = require('./db/saveData');
var app = express();

app.use(express.json())

const port = 3001;
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const abi = [
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_data",
				"type": "string"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

var contractAddr = "0xe21C9Ee6947843f5Fea62DF63C4D16d85f52A26F";

var myContract = new web3.eth.Contract(abi,contractAddr)

var caller = "0x096802f5b2658D0B953D280800644cc46d09568E"
var privKey = "00cf8c8db410bde3deb6c97f438b2e9901fec3333605eed3a9a8834d2b1250fc"

app.get("/test",(req,res)=>{
	web3.eth.getAccounts()
	.then(acc => {
		res.send(acc)
	})
})

async function sendAtContract(data2Chain){
	const transaction = myContract.methods.store(data2Chain)
	const options = {
		to : contractAddr,
		data : transaction.encodeABI(),
		value : 0,
		gas : await transaction.estimateGas({from:caller}),
		gasPrice : "0x01"
	}
	const signed = await web3.eth.accounts.signTransaction(options, privKey)
	const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)
	var txHash = receipt.transactionHash
	return txHash
}
app.post("/store",(req,res)=>{
	var data = req.body
	console.log(data)
	var data2Chain = JSON.stringify(data)
	var deviceId = data.DeviceID.toString()
	var date = data.Date.toString()

	sendAtContract(data2Chain)
	.then(txHash => {
		saveData(deviceId,data2Chain,txHash,date)
		.then(dbTime => {
			res.json({"code":"200","date":dbTime[0].db_time,"message":"数据上链成功"})
		})
	})
})

app.get("/getEle",(req,res)=>{
	res.setHeader("Content-Type","application/json;charset=utf-8")
	var tx = req.query.transactionHash
	const decoder = new InputDataDecoder(abi)
	web3.eth.getTransaction(tx,(err,result)=>{
		if (err){
			console.log(err)
		}else{
			console.log("inputData为：",result.input)
			const decodedInput = decoder.decodeData(result.input)
			res.json(JSON.parse(decodedInput.inputs))
		}
	})

})


app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`);
    console.log("当前时间：", new Date());
})