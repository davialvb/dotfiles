Vue.component("switcher",{props:["initStatus","id"],data:function(){return{count:0,status:this.initStatus}},methods:{switchOnOff:function(){this.status="on"==this.status?"off":"on",this.$emit("switch-on-off",this.status)}},template:'<div class="switcher" v-bind:class="{\'switcher-on\':status == \'on\'}" @click="switchOnOff"><div class="switcher-block"></div></div>'});