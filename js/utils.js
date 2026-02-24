export const caculateAge = (birthDate) => {
    try {
        const today = new Date();
        const birth = new Date(birthDate);
    
        const yearDiff = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();
    
        let age = yearDiff;
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    } catch (error) {
        console.error(error);
        
    }
}