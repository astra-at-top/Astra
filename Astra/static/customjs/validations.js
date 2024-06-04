class Validation {
    constructor({form}){
        this.form = form
        this.requiredField = this.form.querySelectorAll("[data-required]")
        this.defaultAlert = null
    }
    resetForm = () => {
        this.form.reset()
    }
    resetError = () => {
        let AllErrorComponent =  $(".form-element")
        Array.from(AllErrorComponent).forEach(Element => {
            $(Element).find(".border-danger").removeClass("border-danger")
            $(Element).find(".error_msg").text("")
        })
    }
    __fillFormValue = (values) => {
        // console.log(values,"values")
        if(values){
            Object.entries(values).forEach(([key, value], i) => {
                console.log(key,value,"dat")
                let El = $(this.form).find(`[name='${key}']`)
                El.val(value)
                console.log(El,"elll")
            })

           
        }
        // console.log(Array.Entries(values))
    }
    __showHideErrors = ({field, msg , show = true}) => {
       let fieldElement = field.closest(".form-element")
       if(!fieldElement) return alert("Element not found")

       if(show){
           fieldElement.querySelector(".error_msg").textContent = msg ?? "Field is required"
   
           fieldElement.querySelector(".error_border") ? 
               fieldElement.querySelector(".error_border").classList.add("border-danger") : 
               field.classList.add("border-danger") 
       }else{
            fieldElement.querySelector(".error_msg").textContent = ""
    
            fieldElement.querySelector(".error_border") ? 
                fieldElement.querySelector(".error_border").classList.remove("border-danger") : 
                field.classList.remove("border-danger") 
       }
        
    }
    __showAlert = ({success_msg, error_msg, key, success_callBack, error_callBack}) => {
        try{
            if(!key) throw Error("Key not found")
            let successalert = $(`[data-success="${key}"]`)
            let dangeralert = $(`[data-danger="${key}"]`)
            successalert.addClass("d-none")
            dangeralert.addClass("d-none")

            if(success_msg) (successalert.removeClass("d-none"), successalert.text(success_msg),success_callBack && success_callBack())
            if(error_msg) (dangeralert.removeClass("d-none"), dangeralert.text(error_msg), error_callBack && error_callBack())
        }catch(err){
            console.log(err)
            alert("Error in show Alert ")
        }
    }
    __setDefault = ({alert}) => {
        alert[0] === "." || alert[0] === "#" ? this.defaultAlert = alert : alert("Values can be only id or class")
    }

    validate = () => {
        try{
            let Validate = true 
            Array.from(this.requiredField).filter(field => field.dataset.required === "true").forEach(field => {
                if(!field.value || field.value.trim().length === 0){
                    this.__showHideErrors({field})  
                    Validate = false                 
                }else{
                    this.__showHideErrors({field, show : false})
                }
            })
            return Validate
        }catch(err){
            console.log(err)
            alert("Error in validate")
        }     
    }
}

/**
 * the word bind should be unique
 * 
 * <alert data-success="bind"  />
 * <alert data-danger="bind" />
 * 
 */