export const DateFieldShow = (str) => {
    if (str === null) return;
    let date = new Date(str);
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let year = date.getFullYear();
    return `${year + "-" + mnth + "-" + day}`;
};

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const DateConverterTypeSec = (str) => {
    if (str === null) return "Present";
    let date = new Date(str);
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let year = date.getFullYear();
    return `${monthNames[mnth - 1] + " " + day + " " + year}`;
};

export const subString = (s, n) => {
    if (s === undefined || s === null) return;

    if (s.length === 0) return;

    let str = s.substring(n);

    return str;
};

export const subStringDescription = (s, st, en) => {
    if (s === undefined || s === null) return;

    if (s.length === 0) return;

    let str = s.substring(st, en);

    return str;
};

export const numberOfSkill = (arr) => {
    if (Object.keys(arr[0]).length === 0) arr.shift();

    if (arr.length < 3) return false;

    return true;
};

export const trimString = (s) => {
    let str = s.trim();
    return str;
};

// export const recommenderDescription = (s, n) => {
//     if (s.length >= n) return true;

//     return false;
// };

export const checkSkillLength = (arr) => {
    if (Object.keys(arr[0]).length === 0) arr.shift();

    if (arr.length < 3) return false;

    return true;
};

export const checkRequired = (arr) => {
    const res = arr.some((x) => x.rating === 0);

    return res;
};
export const checkRequiredExp = (arr) => {
    const res = arr.some((x) => x.experience === 0);

    return res;
};

// export const checkSkillRating = (arr) => {
//     return arr.some(function (el) {
//         return el.rating === 0;
//     });
// };

export const fileSizeValidate = (data) => {
    let val = data / 1024;

    const MIN_FILE_SIZE = 1024;
    if (val > MIN_FILE_SIZE) {
        return false;
    }
    return true;
};

export const picSizeValidate = (data) => {
    let val = data / 1024;

    const MIN_PIC_SIZE = 512;
    if (val > MIN_PIC_SIZE) {
        return false;
    }
    return true;
};
export const checkIfUrlsAreSame = (url1, url2) => {
    const id1 = url1.split("/in/")[1].split("/")[0];
    const id2 = url2.split("/in/")[1].split("/")[0];
    return id1 === id2;
};

// export const replaceHeadersWithParagraphs = (inputString) => {
//     // header conversion
//     return inputString.replace(/<h(\d)>(.*?)<\/h\1>/gi, "<p><b>$2</b></p>");
// };



export const calculateProfileStrength = (data)  => {
    let value = 30;
    if (data.recommendations && data.recommendations.length > 0) {
        if (data.recommendations.length === 3) {
            value += 15 + 10 + 10; 
        } else if (data.recommendations.length === 2) {
            value += 15 + 10; 
        } else {
            value += 15;
        }
    }

    if (data.resumeLink) {
        value += 10;
    }

    if (data.skills && data.skills.length > 0) {
        value += 20; 
    }

    return value;
}