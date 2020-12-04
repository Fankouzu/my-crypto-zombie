# 区块链收藏游戏：僵尸之谜
[![Build Status](https://travis-ci.org/Fankouzu/my-crypto-zombie.svg?branch=master)](https://travis-ci.org/Fankouzu/my-crypto-zombie)
## Demo
https://fankouzu.github.io/my-crypto-zombie/ <br />
`需要使用Chrome浏览器和Metamask钱包插件`


## 背景
- 这是一个真正的区块链去中心化游戏
- 下载运行之后就可以连接到以太坊智能合约
- 所有人的游戏数据都保存在区块链上
- 无论是谁，无论在何地运行的游戏都可以连接到相同的数据

这个程序是根据 https://cryptozombies.io/ 这里提供的以太坊智能合约课程开发的。并使用了其中的游戏素材，素材版权归 https://cryptozombies.io/ 所有，本项目仅供学习智能合约使用。


## 安装
使用yarn安装更为有效<br />
`yarn install`
## 运行
`yarn start`
## 使用说明
- 这个项目是使用React开发的，运行之后在Chrome浏览器中打开地址 [http://localhost:3000](http://localhost:3000) 请确认你安装了[Metamask插件](https://metamask.io/) <br />
- 项目中已经在[这个文件](https://github.com/Fankouzu/my-crypto-zombie/blob/master/src/ContractAddress.json)中设置好了智能合约的地址,你也可以修改成你自己部署的智能合约合约地址

```json
{
    "3":"0x1a3cA7AbE6370D33986b2D2aC6F1F9A656f87b4D",
    "4":"0xbca6885699Ee9ae9B2255538B5a3EfB3082bE5ac",
    "5":"0x6817c8475Ad33Aa86422160C3d1C673c453A76dE",
    "42":"0x6817c8475Ad33Aa86422160C3d1C673c453A76dE",
    "5777":"0x8b11Af05bdBB4848b59f2C3A5Bf3E2BB24c744fD"
}
```
- 你可以在Metamask中切换你的以太坊网络，每个网络都有我部署的合约，不同的合约地址就像不同的数据库，拥有着不同的游戏数据，地址前面的数字是网络的ID，其中（1）主网我没有部署，（2）已经废弃，（5777）是本地的Ganache软件的模拟网络，需要安装Ganache
```
'1': Ethereum Main Network
'2': Morden Test network
'3': Ropsten Test Network
'4': Rinkeby Test Network
'5': Goerli Test Network
'42': Kovan Test Network
'5777': Ganache localhost:7545
```
## 智能合约
学习智能合约开发，请看[我的B站视频](https://www.bilibili.com/video/av75230620)<br >

本项目所使用的[智能合约源码在这里](https://github.com/Fankouzu/smart-contract/tree/master/Solidity%20Lesson%2004)<br>

ipfs上也有 ipfs://QmTYNvirSHmoHtjCbH77Zc64xNLFUpMq2JSjUmQeDgLvhY
