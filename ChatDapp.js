import {React, useState} from "react";
import "./App.css";
import $ from "jquery";
import {ethers} from "ethers"

export default function App(){

  const address = "";
  const abi = [
	{
		"inputs": [],
		"name": "getMsg",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "message",
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
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_msg",
				"type": "string"
			}
		],
		"name": "sendMsg",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
  ]
  
  const [wallet, setwallet] = useState("Connect")
  const [Provider, setProvider] = useState(null)
  const [Signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  const Wallet = () =>{
      if(window.ethereum){
          window.ethereum.request({method:"eth_requestAccounts"});
          setwallet("Connected")
      }
      else{
          alert("Please install Metamask")
      }

      Contract();
  }

  const Contract = () =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider)
    
    const signer = provider.getSigner();
    setSigner(signer)

    const contract = new ethers.Contract(address, abi, signer);
    setContract(contract)
  }
  const form = (event) =>{
    event.preventDefault();
    const address = event.target.Address.value;
    const Message = event.target.msg.value;
    contract.sendMsg(address, Message);
  }
  
  const getMessage = async() =>{
      const result = await contract.getMsg();
      $("#ReceivedMsg").html(result);
  }
  const msgBoxinc = (e) =>{
    e.target.style.height= "140px";
  }  
  
  const msgBoxdec = (e) =>{
    e.target.style.height= "35px";
  }
  
  return(
      <div>
          <div className = "App">
           <div className ="Header">
            <h1 className = "Chat">Chat</h1>
           </div>
           <div>
               <button onClick = {Wallet}className = "Conct">{wallet}</button>
               <form onSubmit = {form}>
                <label>ToAddress:</label>   
                <input id = "Address" className = "Addr"/>       
                <textarea onMouseOver = {msgBoxinc}
                          onMouseLeave = {msgBoxdec} id = "msg"/> 
                <input type= "submit" className= "sub" value = "Send"/>
               </form><br/>
               <div>
                <button className="get" onClick = {getMessage}>Get</button>
                <div id = "ReceivedMsg" className = "Msg"></div>
               </div>
           </div>
          </div>
      </div>
  )  
}
