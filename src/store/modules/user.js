const user = {
    namespaced: true,
    state:{
        isPc:true,
        isConnected:false,
        setNetwork:"",
        setWallet:"***",
        setBalance:0,
        setConnected:false,
        setMessage:"Connect Wallet",
        userAddress:null,
        getTickets:0,
        balances:0,
        cbbbalance:0,
        address:null,
        buyNumber:0,
        bnbBalance:0,  //bnb余额
        usdtBalance:0,  //usdt余额
        wandBalance:0,  //stf_token余额
        myCollectList:"",  //我的下级数量
        inviteOrdernum:0,
        viper:0,  //获取vip等级
        userinfo:{

        }, //用户信息
        isSwitch:true //全局关闭窗口
    },
    mutations:{
        commitisConnected: (state, isConnected) => {
            state.isConnected = isConnected;
        },
        commitsetNetwork: (state, setNetwork) => {
            state.setNetwork = setNetwork;
        },
        commitsetWallet: (state, setWallet) => {
            state.setWallet = setWallet;
        },
        commitsetBalance: (state, setBalance) => {
            state.setBalance = setBalance;
        },
        commitsetConnected: (state, setConnected) => {
            state.setConnected = setConnected;
        },
        commitsetMessage: (state, setMessage) => {
            state.setMessage = setMessage;
        },
        commitUserAddress: (state, userAddress) => {
            state.userAddress = userAddress;
        },
        commitGetTickets: (state, getTickets) =>{
            state.getTickets = getTickets;
        },
        commitBalance: (state,balances) =>{
            state.balances = balances;
        },
        commitCbbbalance: (state,cbbbalance) =>{
            state.cbbbalance = cbbbalance;
        },
        commitAdress:(state,address)=>{
            state.address = address;
        },
        commitbuyNumber:(state,buyNumber)=>{
            state.buyNumber = buyNumber;
        },
        commitbnbBalance:(state,bnbBalance)=>{
            state.bnbBalance = bnbBalance;
        },
        commitusdtBalance:(state,usdtBalance)=>{
            state.usdtBalance = usdtBalance;
        },
        commitmyCollectList:(state,myCollectList)=>{
            state.myCollectList = myCollectList;
        },
        commitwandBalance:(state,wandBalance)=>{
            state.wandBalance = wandBalance;
        },
        commitinviteOrdernum:(state,inviteOrdernum)=>{
            state.inviteOrdernum = inviteOrdernum;
        },
        commitViper:(state,viper)=>{
            state.viper = viper;
        },
        commitUserinfo:(state,userinfo)=>{
            state.userinfo = userinfo;
        },
        commitisSwitch:(state,isSwitch)=>{
            state.isSwitch = isSwitch;
        }
    },
    actions:{

    }
}
export default user;