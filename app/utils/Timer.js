export default class Timer{

    constructor(reduxDispatcher){
        this.reduxDispatcher = reduxDispatcher;
        this.timer = setInterval(this.reduxDispatcher, 1000);
        this.is_running=true;
    }

    stop(){
        if(this.timer){
            this.is_running=false;
            clearInterval(this.timer);
            return null;
        }
    }

    get isRunning(){
        return this.is_running;
    }
}