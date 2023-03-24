import Web3 from "web3";
import Vue from 'vue';

// import stf_abi3 from "@/abi/stf_abi3.json"
import unms_abi from '@/abi/Unms.json'

import { Toast } from 'vant';
Vue.use(Toast);
export default {
  install(Vue, options) {

    var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    var WalletAddress = '';//我的地址
    //  正式链
    // var FishToken='0x5d049cfa912d63086385f61f44ea9de7A552e2f3';// 代币
    // var ReleaseToken='0x8503F0006d1D5E6Eb0Bb71f72B4187F04238FfEb';//私募合约

    //  测试UNMS
    var unms_Coins = '0x5896AA889Db096f57Bcdc42c935A56933Fc1AF21';
    var PoolIndex = 0;//池索引
    var PoolData = [];//池数据

    // 链接钱包
    Vue.prototype.LinkBNB = function (e) {
      console.log("进入了链接")
      if (typeof window.ethereum !== 'undefined') {
        ethereum.request({ method: 'net_version' }).then(chain => {
          console.log("当前链ID" + chain)
          // alert(chain) 56主网  97ceshiwang  5Goerli测试网
          console.log(web3.utils.toHex('56'))
          if (chain != 97) {
            const data = [{
              // chainId: '0x38',
              // chainName: 'BNB',
              // nativeCurrency:
              // {
              //   name: 'BNB',
              //   symbol: 'BNB',
              //   decimals: 18
              // },

              chainId: '0x61',
              chainName: 'bnbtest2',
              nativeCurrency:
              {
                name: 'bnbtest2',
                symbol: 'bnbtest2',
                decimals: 18
              },

              // chainId: '0x5',
              // chainName: 'goerli',
              // nativeCurrency:
              // {
              //   name: 'goerli',
              //   symbol: 'goerli',
              //   decimals: 18
              // },
              // rpcUrls: ['https://bsc-dataseed.binance.org/'],
              // blockExplorerUrls: ['https://bscscan.com']
              rpcUrls: ['https://data-seed-prebsc-2-s3.binance.org:8545','https://data-seed-prebsc-1-s2.binance.org:8545'],
              blockExplorerUrls: ['https://testnet.bscscan.com/']
            }]
            ethereum.request({ method: "wallet_addEthereumChain", params: data, }).then((result) => {
              console.log('result1=',result)
              ethereum.enable().then(res => {
                console.log('钱包地址=',res[0])
                WalletAddress = res[0]
                this.$store.commit("user/commitAdress",res[0]);
                //获取钱包余额
                web3.eth.getBalance(res[0]).then(res=>{
                  this.$store.commit('user/commitbnbBalance',(Number(res)/Math.pow(10,18)).toFixed(2))
                });
                this.getUnms()
                if (e != 1) {
                  // this.loginSuccessful(res[0]); 
                }
              }).catch((error) => {
                this.$message.error("请登录1");
              })
            }).catch((error) => {
              this.$message.error("请登录2");
            })
          } else {
            ethereum.enable().then(res => {
              console.log('钱包地址2=',res[0])
              WalletAddress = res[0]
              //钱包地址
              this.$store.commit("user/commitAdress",res[0]);
              //获取钱包余额
              web3.eth.getBalance(res[0]).then(res=>{
                this.$store.commit('user/commitbnbBalance',(Number(res)/Math.pow(10,18)).toFixed(2))
              });
              this.getUnms()
              //   this.ProductListABI(res[0])
              if (e != 1) {
                // this.loginSuccessful(res[0])
              }

            }).catch((error) => {
              this.$message.error("请登录3");
              console.log('error111=',error)
            })
          }
        })
      } else {
        this.$message.error("请登录4");
      }
    };
    // UNMS
    Vue.prototype.getUnms = function(){
      var unms = new web3.eth.Contract(unms_abi,unms_Coins);
      console.log('WalletAddress=',WalletAddress)
      unms.methods.getTodayLimitAmount(WalletAddress).call().then((res)=>{
        console.log('res',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
    }
    // dapp
    
  }
}