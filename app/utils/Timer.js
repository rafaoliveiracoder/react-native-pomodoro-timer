export default class Timer{
    constructor(){
        this.timer = null;
        this.func = null;
        this.dispatch = null;
        this.is_running = false;
    }

    setDispatcher(dispatch, func){
        this.func = func;
        this.dispatch = dispatch;
    }

    start(){
        if(!this.timer && this.dispatch && this.func){
            //Updates redux timer state from here
            this.timer= setInterval(()=>this.dispatch(this.func()), 1000);
            this.is_running = true;
        }else{
            clearInterval(this.timer);
            this.timer= setInterval(()=>this.dispatch(this.func()), 1000);
            this.is_running = true;
        }
    }
    stop(){
        if(this.timer){
            clearInterval(this.timer);
            this.is_running = false;
        }
    }

    get isRunning(){
        return this.is_running;
    }
}