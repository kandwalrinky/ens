import { isEmpty } from "lodash";
import { v4 as uuidv4 } from 'uuid';
const countObject = (data: object): number => {
    return Object.keys(data).length || 0;
}
const nowTimeSpan = () => {
    return Math.floor(Date.now() / 1000);
}
const toTimestamp = (strDate: string): any => {
    if (new Date(strDate).toString() == 'Invalid Date') return strDate;
    const datum = Date.parse(strDate);
    return datum / 1000;
}
const strToLower = (str: string) => {
    if (str)
        return str.toLowerCase();
    else
        return '';
}

const formatPrice = (price: number, roundNumber: number = 2) => {
    return Number(price).toFixed(roundNumber);
}

const replaceAll = (str: string, search: string, replace: string) => {
    return str.split(search).join(replace);
}

const formatDate = (now: any) => {

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();


    return year + '-' + month + '-' + day;
}
const tomorrowDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
}
const previousDate = (dateStr: string, addDate: number = 1) => {

    const yesterday = new Date(dateStr)
    yesterday.setDate(yesterday.getDate() - addDate);
    return formatDate(yesterday);
}
const todayMDYDate = () => {
    const now = new Date()
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();
    return month + '-' + day + '-' + year;
}
const convertMDYDate = (dateString: any, seprator: string = '-') => { // xb only

    let [day, month, year] = dateString.split(seprator);
    return month + '-' + day + '-' + year;
}
const convertToTime = (timeString: any) => { // xb only

    const inArray = timeString.split('');
    return inArray[0] + inArray[1] + ':' + inArray[2] + inArray[3];
}
const getRandomInteger = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const convertToSlug = (str: string, seprator: any = '-') => {

    //replace all special characters | symbols with a space
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
        .toLowerCase();

    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm, '');

    // replace space with dash/hyphen
    str = str.replace(/\s+/g, seprator);
    return str;
}

const createNDigits = (str: string, strLength: number = 6) => {
    const sLength = str.length;
    let returnStr = str;

    if (sLength == strLength) {
        returnStr = str;
    }
    if (sLength < strLength) {
        returnStr = "0".repeat(strLength - sLength) + str
    }
    if (sLength > strLength) {
        returnStr = str.substring(0, strLength);
    }

    return returnStr;

}
const array_key_exists = (arr: any, search: string) => {

    const keys = Object.keys(arr);

    const index = keys.indexOf(search);

    if (index == -1)
        return false;
    return true;
}
const formatTimeToDate = (timeString: any) => {
    const now = new Date(timeString * 1000);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();


    return year + '-' + month + '-' + day;
}
const formatDateTime = (timeString: any) => {
    const now = new Date(timeString * 1000);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();
    var hours = ("0" + now.getHours()).slice(-2);
    var getMinutes = ("0" + now.getMinutes()).slice(-2);
    var getSeconds = ("0" + now.getSeconds()).slice(-2);


return year + '-' + month + '-' + day + ' ' + hours + ':' + getMinutes + ':' + getSeconds;
}

const generateUUID = () => {
    return getRandomInteger(0, 9999) + '_' + uuidv4() + '_' + getRandomInteger(0, 9999);
}

const removeSpecialChar = (str: string = '') => {
    // console.log('address => '+str);
    // console.log('address replace => '+str.replace(/[`~!@#×’–·—‘“”$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' '));
    if (str)
        return str.replace(/[`~!@#×’–·—‘“”$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').trim();
        
    return str;
}


export { previousDate, removeSpecialChar,generateUUID, countObject, formatDateTime, array_key_exists, nowTimeSpan, formatTimeToDate, toTimestamp, convertMDYDate, convertToTime, strToLower, formatPrice, replaceAll, formatDate, getRandomInteger, tomorrowDate, todayMDYDate, convertToSlug, createNDigits }