//SPDX-License-Identifier:MIT 

pragma solidity ^0.8.9;


contract Message{
 
 mapping(address =>string)public message;
    
 function sendMsg(address _to, string memory _msg)public{
       message[_to] = _msg;
 }
 
 function getMsg()public view returns(string memory){
     return message[msg.sender];
 }
}
