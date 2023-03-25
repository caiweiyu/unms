<template>
    <div class="box1">
      <Header :title="$tc('home.myUNMS')"></Header>
      <div class="bg">
          <ul class="bg-card">
              <li class="bg-card-li">
                  <div class="left">{{ $tc(`home.yue`) }}</div>
                  <div class="right">{{ UNMSBalance }} UNMS</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">我的总投资</div>
                  <div class="right">{{ total_investment }} USDT</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">正在工作投资</div>
                  <div class="right">{{ comingSoon_investment }} USDT</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">已经工作天数</div>
                  <div class="right">{{ getWork_date }} 天</div>
              </li>
              <li class="">
                <div class="left">剩余天数</div>
                <div class="right">{{ last_day }} 天</div>
              </li>
          </ul>
          <div class="bg-tip">团队管理</div>
          <ul class="bg-card">
              <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div>
                  </div>
                  <div class="div right">
                    <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div>
                  </div>
              </li>
              <li class="bg-card-li">
                  <div class="left2">直推列表</div>
                  <div class="right"></div>
              </li>
              <li class="bg-card-li">
                  <div class="left">正在工作投资</div>
                  <div class="left">1000 USDT</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">已经工作天数</div>
                  <div class="left">90 天</div>
              </li>
              <li class="bg-card-li">
                <div class="left">剩余天数</div>
                <div class="left">90 天</div>
              </li>
              <li class="click_more">
                点击查看更多
              </li>
          </ul>
          <!-- <div class="bg-tip">我的奖励</div> -->
          <!-- <ul class="bg-card">
            <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div>
                  </div>
                  <div class="div right">
                    <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div>
                  </div>
              </li>
              <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div>
                  </div>
                  <div class="div right">
                    <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div>
                  </div>
              </li>
          </ul> -->
          <div class="bg-tip">收益</div>
          <ul class="bg-card">
            <div class="bg-card-tip1">
                <div class="bg-card-tip1-title">推广UNMS</div>
                <div class="bg-card-tip1-btn">领取</div>
            </div>
            <div class="bg-card-tip1">
                <div class="bg-card-tip1-title">产出UNMS</div>
                <div class="bg-card-tip1-btn">领取</div>
            </div>
            <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">{{ teamUsdt }} USDT</div>
                    <div class="top2">社区业绩</div>
                  </div>
                  <div class="div right">
                    <!-- <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div> -->
                  </div>
              </li>
              <!-- <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div>
                  </div>
                  <div class="div right">
                    <div class="top1">688,990UNMS</div>
                    <div class="top2">社区业绩</div>
                  </div>
              </li> -->
          </ul>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "../../components/header.vue"
  import { mapState } from "vuex";
  export default {
      name:"myUnms",
      // 每个order有个investTime字段，上整数时间戳，用当前时间
      // 减去，再除以86400就是已经投资的天数，结束时间就是investTime加上100天
      // 100*86400
      data(){
          return {
              
          }
      },
      methods:{
        
      },
      computed:{
        ...mapState({
              UNMSBalance:(state) => state.user.UNMSBalance,
              userinfo:(state) => state.user.userinfo,
              teamUsdt:(state) => state.user.teamUsdt,
        }),
        //总投资额
        total_investment(){
          if(this.userinfo.orders && this.userinfo.orders.length > 0){
            let num = 0;
            for(let i= 0;i< this.userinfo.orders.length;i++){
              num +=this.userinfo.orders[i]['2']/Math.pow(10,18)
            };
            console.log('总投资额=',Number(num).toFixed(2))
            return Number(num).toFixed(2)
          }else{
            return '0.00'
          }
        },
        //正在投资
        comingSoon_investment(){
            if(this.userinfo.orders && this.userinfo.orders.length > 0){
                let num = 0;
                for(let i= 0;i< this.userinfo.orders.length;i++){
                    if(i == this.userinfo.orders.length-1){
                        num =this.userinfo.orders[i]['2']/Math.pow(10,18)
                        // return Number(num).toFixed(2)
                    }
                };
                console.log('投资中=',Number(num).toFixed(2))
                return Number(num).toFixed(2)
            }else{
                return '0.00'
            }
        },
        //已经工作天数
        getWork_date(){
          if(this.userinfo.orders && this.userinfo.orders.length > 0){
                let res = null;
                for(let i= 0;i< this.userinfo.orders.length;i++){
                    if(i == this.userinfo.orders.length-1){
                        res = new Date().getTime() - this.userinfo.orders[i]['investTime']*1000;
                    }
                };
                // console.log('已经工作天数=',res)
                return new Date(res).getDate()
            }else{
                return '0.00'
            }
        },
        //剩余天数
        last_day(){
          return Number(100 - this.getWork_date)
        }
      },
      components:{
          Header 
      },
      mounted(){
        console.log('this.userinfo=',this.userinfo)
      }
  }
  </script>
  
  <style lang="scss" scoped>
  // @media only screen and (max-width: 780px) {
    $design-width:750; //设计稿width
    @function pxttrem($px) {
      @return $px/$design-width*20.06817+rem;//23.4375
    }
    .box1{
      // height: 100vh;
      background: rgba(3, 14, 33, 1);
          .bg{
              z-index: 10;
              min-height: calc(100vh - 2.56873rem);
              // min-height: 100vh;
              background: rgba(3, 14, 33, 1);
              padding-bottom: pxttrem(20);
              &-tip{
                margin: pxttrem(40) 0 pxttrem(20) pxttrem(40);
                font-size: pxttrem(28);
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(256,256,256,0.6);
              }
              &-card{
                width: pxttrem(670);
                min-height: pxttrem(388);
                background: #322267;
                border-radius: pxttrem(16);
                margin: pxttrem(40) auto 0;
                .click_more{
                    color: #FFFFFF;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                }
                &-tip1{
                    &-title{
                        font-size: pxttrem(36);
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                        text-align: center;
                        padding-top: pxttrem(60);
                        // margin: pxttrem(60) auto 0;
                    }
                    &-btn{
                        width: pxttrem(480);
                        height: pxttrem(84);
                        line-height: pxttrem(84);
                        background: linear-gradient(135deg, #593FFB 0%, #BF14F4 100%);
                        border-radius: pxttrem(42);
                        font-size: pxttrem(32);
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                        text-align: center;
                        margin: pxttrem(40) auto 0;
                    }
                }
                &-bold{
                    display: flex !important;
                    justify-content: space-between !important;
                    width: pxttrem(670) !important;
                    height:pxttrem(194) !important;
                    margin: pxttrem(10px) auto !important;
                    .div{
                        // width: pxttrem(335);
                        text-align: center;
                        width: 50%;                  
                        background: #322267;
                        // border-radius: pxttrem(16);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .top1{
                            font-size: pxttrem(32);
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: #FFFFFF;
                        }
                        .top2{
                            font-size: pxttrem(28);
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: rgba(256,256,256,0.6);
                            margin-top: pxttrem(12);
                        }
                    }
                }
                li{
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    height: pxttrem(88);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: pxttrem(589);
                    margin: 0 auto;
                }
                .left2{
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                }
                .left{
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(256,256,256,0.6);
                }
                .right{
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    border-left: pxttrem(2) solid rgba(256,256,256,0.12);
                }
                &-li{
                    width: pxttrem(589);
                    height: pxttrem(2);
                    border-bottom: pxttrem(2) solid rgba(256,256,256,0.08);
                }
              }
          }
      }
  // }
  
  </style>