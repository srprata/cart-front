//only numbers allowed
export const onlyNumbers = (val) => {
    // if ((/^\d+$/.test(val) && val !== '0') || val === '') {
    if ((/^\d+$/.test(val) && val !== '0') || val === '') {
        return true
    }else{
        return false
    }
}