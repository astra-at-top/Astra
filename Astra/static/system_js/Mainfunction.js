function MainFun () {
    let mo = {
        isInit :  false,
        url : null,
        init : () => {
            try{
                if(!mo.isInit){
                    mo.isInit = true
                    return mo.isInit
                }
            }catch(Err){

            }
        },
        sendError : ({errMsg}) => {
            console.log("Make the backend", errMsg)
        },
        commanAjax : (obj) => {
            try{
                if(!mo.isInit) throw Error("mainfun is not init")
                if(!obj.url && !mo.url) throw Error("No url found")
                const fetchObj = {
                    method : obj.method || "GET",
                }
                if(obj.data) fetchObj["body"] = obj.data
                fetch(obj.url,fetchObj)
            }catch(err){
                // mo.commanAjax({

                // })
            }
        }
    }

    if (mo.init()) return {
        commanAjax : mo.commanAjax
    }
    return {}
}

export {MainFun}