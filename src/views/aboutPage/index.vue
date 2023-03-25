<template>
    <div class="box1">
      <Header :title="$t(`home.about`)"></Header>
      <div class="bg">
          <div class="bg-card">
              <img src="../../assets/images/gongao.png" class="bg-card-tip" alt="">
              <div class="title">关于我们</div>
              <!-- <div class="content2">2023/08/09 11:36</div> -->
              <div class="content3">
                  UNMS是一款以邀请伙伴赚钱分佣而赚取平台币为背景的， 它应用了当前最流行的。
                  投资邀约赚佣概念，完美地融合了产量耕作，让玩家在玩的同时获得娱乐。
                  玩家可以购买或赚钱更多的平台币，他们可以获得直推间推隔代奖励分成，以分享邀约，在交易市场买卖平台币，UNMS
                  符合币安智能链上的BEP721 标准。
              </div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "../../components/header.vue"
  export default {
      name:"aboutPage",
      data(){
          return {
              
          }
      },
      methods:{
  
      },
      components:{
          Header 
      }
  }
  </script>
  
  <style lang="scss" scoped>
//   @media only screen and (max-width: 780px) {
    $design-width:750; //设计稿width
    @function pxttrem($px) {
      @return $px/$design-width*20.06817+rem;//23.4375
    }
    .box1{
      // height: 100vh;
      background: rgba(3, 14, 33, 1);
          .bg{
              z-index: 10;
              height: calc(100vh - 2.56873rem);
              // min-height: 100vh;
              background: rgba(3, 14, 33, 1);
              &-card{
                  margin: pxttrem(40) auto;
                  width: pxttrem(670);
                  min-height: pxttrem(300);
                  background: #322267 !important;
                  border-radius: pxttrem(16);
                  &-tip{
                      width: pxttrem(106);
                      height: pxttrem(104);
                      margin: 0 auto;
                      padding-top: pxttrem(40);
                  }
                  .title{
                      width: pxttrem(590);
                      font-size: pxttrem(36);
                      text-align: center;
                      font-family: PingFangSC-Medium, PingFang SC;
                      font-weight: 500;
                      color: #FFFFFF;
                      margin: pxttrem(48) auto 0;
                  }
                  .content2{
                      width: pxttrem(590);
                      font-size: pxttrem(24);
                      margin: pxttrem(20) auto 0;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #FFFFFF;
                      text-align: right;
                  }
                  .content3{
                      width: pxttrem(590);
                      height: pxttrem(336);
                      font-size: pxttrem(28);
                      margin: pxttrem(20) auto 0;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #FFFFFF;
                  }
              }
          }
      }
//   }
  
  </style>