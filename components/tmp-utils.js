export const removeDuplicates = (listOfStrings) => {
    const seen = {};
    return listOfStrings.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
};

export const generateUniqueStringList = (length, generator) => {
    if (length === 0) {
        return [];
    }

    let list = [];
    for (let i = 0; i < length; i++) {
        list.push(generator());
    }

    const uniqueStrings = removeDuplicates(list);

    for (let i = uniqueStrings.length; i < length; i++) {
        let newString = generator();
        console.log('hello')

        let j = 0;
        while (uniqueStrings.includes(newString)) {
            if (j > 10000) throw new Error('Infinite loop');
            newString = generator();
        }
        uniqueStrings.push(newString);
    }

    return uniqueStrings;
};

export const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

export const downloadTextFile = (filename, text) => {
    const el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', filename);

    el.style.display = 'none';
    document.body.appendChild(el);

    el.click();

    document.body.removeChild(el);
};

export const downloadJSONFile = (filename, text) => {
    const el = document.createElement('a');
    el.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', filename);

    el.style.display = 'none';
    document.body.appendChild(el);

    el.click();

    document.body.removeChild(el);
};
