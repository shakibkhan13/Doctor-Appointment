import { createContext } from "react";



export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = 'BDT'

    const calculateAge = (dob) => {
        //console.log("Input DOB:", dob);
    
        const dateParts = dob.split("-");
        let formattedDob;
    
        if (dateParts.length === 3) {
            formattedDob = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        } else {
            formattedDob = dob; 
        }
    
        const birthDate = new Date(formattedDob);
    
        if (isNaN(birthDate)) {
            console.error("Invalid date format. Please provide a valid date (e.g., YYYY-MM-DD or DD-MM-YYYY).");
            return null; 
        }
    
        //console.log("Parsed Birth Date:", birthDate);
    
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
    
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
    
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--; 
        }
    
        //console.log("Calculated Age:", age);
        return age;
    };
    
    // calculateAge("1995-12-30"); 
    // calculateAge("21-11-2003");
    
    
    // // Example usage:
    // calculateAge("1995-12-30"); 
    

    const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotData) => {
      const dataArray = slotData.split('-')
      return dataArray[0] + " " + months[Number(dataArray[1])] + " " + dataArray[2]
    }

    const value = {
        calculateAge , slotDateFormat , currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )



}


export default AppContextProvider ; 
