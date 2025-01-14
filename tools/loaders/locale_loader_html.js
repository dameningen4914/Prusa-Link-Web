// This file is part of the Prusa Link Web
// Copyright (C) 2021 Prusa Research a.s. - www.prusa3d.com
// SPDX-License-Identifier: GPL-3.0-or-later

const colors = require("colors");
const { saveWords } = require("./shared");

/** @param {String} source html file content */
module.exports = function (source) {

  //console.log(colors.cyan.bold(this.resourcePath));
  const words = getWords(source);
  saveWords(words);
  return source;
}

function getWords(source) {
  /* search for: translate('Some word') | translate("Some word")
   * translate(`Some word`) | translate( 'Some_word ', {param: 32}) | ... */
  let regex = /data-label=\"(.*?)\"/g
  let result = source.match(regex);
  let words = [];

  if (result) {
    for (let match of result) { // data-label="prop.time-est"
      let word = match.replace("data-label=", "").trim(); // remove data-label=
      word = word.substr(1, word.length - 2); // remove quotes
      word = word.replace(/(\\")/g, '"'); // replace /" with "
      word = word.replace(/(\\n)/g, '\n'); // fix problems with \n characters
      words.push(word);
    }
  }

  return words;
}
