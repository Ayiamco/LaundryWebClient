export function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
}

export function validatePassword(password){
        //password must be at least 8 characters containing at least a capital,small letter and special character
        const re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return re.test(String(password))
}

export const NavBarData={
        DashBoard:"fas fa-th",
        Customers:"fas fa-user",
        Services:"fas fa-network-wired",
        Invoices:"fas fa-file-alt",
        Employees:"fas fa-users-cog",
}

export const PasswordsAreNotValid = (setbooleanStates,password,confirmPassword)=> {
        let isPasswordValid=true;
        //check if passwords match
        if(password !== confirmPassword){
            setbooleanStates(prev=>({...prev,isPasswordMatch:false}))
            isPasswordValid=false;
        }
        else{setbooleanStates(prev=>({...prev,isPasswordMatch:true}))}
        //check that password is valid
        if(validatePassword(password) || password===""){
            setbooleanStates(prev=> ({...prev,isValidPassword:true}))
        }
        else{
            setbooleanStates(prev=> ({...prev,isValidPassword:false}));
            isPasswordValid=false;
        }
        return !isPasswordValid;
    }


export function EmailStateIsInvalid(setbooleanStates, username) {
    if (username === "") {
        setbooleanStates(prev => ({ ...prev, "isValidEmail": true, isEmailAvailable: true }));
        return false;
    }
    else if (!validateEmail(username)) {
        setbooleanStates(prev => ({ ...prev, "isValidEmail": false, isEmailAvailable: true }));
        return true;
    }
    else {
        setbooleanStates(prev => ({ ...prev, "isValidEmail": true, isEmailAvailable: true }));
        return false;
    }

}

export  const FormValidationState={
        "isPasswordMatch":true,
        "isValidEmail":true,
        "shouldButtonDisable":true,
        "isRequestProcessing":false,
        "isEmailAvailable":true,
        "isValidPassword":true,
        "isServiceAvailable":true,
    }

export const toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

