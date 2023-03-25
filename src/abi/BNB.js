import Web3 from "web3";
import Vue from 'vue';

// import stf_abi3 from "@/abi/stf_abi3.json"
import unms_abi from '@/abi/Unms.json'
import Dapp_abi from '@/abi/Dapp.json'
import Usdt_abi from '@/abi/Usdt.json'

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
    var unms_Coins = '0x649679C910a78629c2011ddDe12E9d62E2D085E6';
    var dapp_addr = '0xacF24F6d42821Be87291D780da6AE3B6ce1f6759';
    var usdt_addr = '0x7848EC33D21561b0755c423C7cf03f5018e18613';
    var PoolIndex = 0;//池索引
    var PoolData = [];//池数据

    //methods
    var unms = new web3.eth.Contract(unms_abi,unms_Coins);
    var dapp = new web3.eth.Contract(Dapp_abi,dapp_addr);
    var usdt = new web3.eth.Contract(Usdt_abi,usdt_addr);

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
                  console.log('钱包余额1=',res)
                  this.$store.commit('user/commitbnbBalance',(Number(res)/Math.pow(10,18)).toFixed(2))
                });
                this.getUnms()
                this.getInfo()
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
                console.log('钱包余额2=',res)
                this.$store.commit('user/commitbnbBalance',(Number(res)/Math.pow(10,18)).toFixed(2))
              });
              this.getUnms()
              this.getInfo()
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
      console.log('WalletAddress=',WalletAddress)
      unms.methods.getTodayLimitAmount(WalletAddress).call().then((res)=>{
        console.log('买的数量-限购总量=',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
      unms.methods.getReleaseableAmount().call().then((res)=>{
        var param = (res/Math.pow(10,18)).toString();
        console.log('查某个地址今天可以买的数量，还顺便返回当天限购总量=',param)
      }).catch((error)=>{
        console.log('error=',error)
      })
      //unms余额
      unms.methods.balanceOf(WalletAddress).call().then((res)=>{
        console.log('数量===',res)
        this.$store.commit("user/commitUNMSBalance",(Number(res)/Math.pow(10,18)).toFixed(2));
      }).catch((error)=>{
        console.log('error=',error)
      })
    }
    // DAPP
    Vue.prototype.getDapp = async function(data){
      var param = (data * Math.pow(10,18)).toString();
      var upadress = this.$store.state.user.myUpaddress;//获取上级地址
      // if(this.$store.state.user.userinfo.parent != 
      //'0x0000000000000000000000000000000000000000'){
      // }
      console.log('参数',param)
      console.log('upadress',upadress)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      try {
        await usdt.methods.approve(dapp_addr,param).send({from:WalletAddress}).then((res)=>{
          if(res.status){
            dapp.methods.invest(param,upadress).send({ from : WalletAddress }).then((res)=>{
                console.log('res=',res)
                loading.close()
              }).catch((error)=>{
                console.log('error=',error)
                loading.close()
            })
          }
        })
      } catch (error) {
        console.log('error=',error)
        loading.close()
      }
    }
    //获取单个用户会员等级
    Vue.prototype.getsingleInfo = async function(data){
        await dapp.methods.getUserInfo(data).call().then((res)=>{
            console.log('用户信息=',res)
            return res.levelRate
        }).catch((error)=>{
            console.log('error=',error)
            return "0";
        })
    }
    // 获取用户信息
    Vue.prototype.getInfo =async function(){
      //查询用户信息
      await dapp.methods.getUserInfo(WalletAddress).call().then((res)=>{
        this.$store.commit("user/commitUserinfo",res);
        console.log('用户信息=',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询已产出的收益
      dapp.methods.queryMintToken(WalletAddress).call().then((res)=>{
        this.$store.commit("user/commitGenerate",res);
        console.log('产出收益=',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询所有的投资用户地址列表
      dapp.methods.getUserList().call().then((res)=>{
        // this.$store.commit("user/commitGenerate",res);
        // console.log('查询所有的投资用户地址列表=',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询当前币价
      dapp.methods.getNowPrice().call().then((res)=>{
        console.log('查询当前币价=',res);
        this.$store.commit("user/commitUNMS_price",(res/Math.pow(10,18)).toFixed(6));
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询团队投入的U
      dapp.methods.queryTeamUsdtAmount(WalletAddress).call().then((res)=>{
        console.log('查询团队投入的usdt=',res);
        this.$store.commit("user/committeamUsdt",(res/Math.pow(10,18)));
      }).catch((error)=>{
        console.log('error=',error)
      })
    }
    //领取收益
    Vue.prototype.claimMintFn = async function(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
        await dapp.methods.claimMintToken().call().then((res)=>{
            console.log('领取res=',res)
            loading.close()
          }).catch((error)=>{
            console.log('领取error=',error)
            loading.close()
        })
    },
    //邀请奖励
    Vue.prototype.claimMintFn2 = async function(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          await dapp.methods.claimInviteBonus().call().then((res)=>{
              console.log('领取res=',res)
              loading.close()
            }).catch((error)=>{
              console.log('领取error=',error)
              loading.close()
          })
      }
  }
}