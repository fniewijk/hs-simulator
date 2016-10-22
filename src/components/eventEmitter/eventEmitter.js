let instance = null;

module.exports = class EventEmitter{

    constructor() {
        if(!instance){
              instance = this;
              this.init();
        }

        return instance;
     }

     init() {
         this.index = 0;
         this.subs = [];
     }

     sub(id, type, callback){

         const newIndex = this.index;
         this.subs.push({
             index: newIndex,
             id: id,
             type: type,
             callback: callback
         })
         this.index++;
         return newIndex;
     }

     unsub(index){
         let foundIndex = -1;
         for(let i = 0; i < this.subs.length; i++) {
             if(index === this.subs[i].index){
                 foundIndex = i;
                 break;
             }
         }
         if(foundIndex > 0) {
             this.subs = this.subs.splice(foundIndex, 1);
         }
     }

     pub(type, message) {
          for(let i = 0; i < this.subs.length; i++) {
              if(type === this.subs[i].type || this.subs[i].type === 'all'){
                 this.subs[i].callback(type, message);
              }
          }
     }

}
