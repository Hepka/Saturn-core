module.exports = (str = '', object = {}, prefix = '') => {
    let regexp;
    Object.keys(object).forEach(property => {
        regexp = new RegExp(`\\${prefix}${property}`, `g`) ;
        str = str.replace(regexp, object[property]);
    })
    return str;
}