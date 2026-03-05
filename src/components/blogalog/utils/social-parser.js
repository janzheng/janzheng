


/*

  Social Parser

  Uses social-parser to replace "{{ faceboook }}" with the facebook account information
  given in the socialStr parameter, e.g. "https://twitter.com/yawnxyz | https://facebook.com/janzheng"

  - pretty useful for building contact sheets without having to specify each social account
  - you can just dump a few account values in a string and this will sort it out


  modified to include academic groups
  source: https://www.npmjs.com/package/@salesflare/social-profile-url-parser



  Last updated: 8/8/2020

*/


const internals = {
  // We sometimes use [A-Za-z_]{0,3} instead of www since there are localized urls like au.linkedin.com
  // The {0,3} will get flagged as unsafe but I have not found a better solution yet
  regexes: {
    'email': /([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16})/ig,
    'resume': /.*\/resume.*/ig,
    'aboutme': /(https?:\/\/(www\.)?)?about\.me\/([^ /\\\n]+)/ig,
    'angellist': /(https?:\/\/(www\.)?)?angel\.co\/([^ /\\\n]+)/ig,
    'behance': /(https?:\/\/(www\.)?)?behance\.(com|net)\/([^ /\\\n]+)/ig,
    'blogger': /(https?:\/\/(www\.)?)?blogger\.com\/profile\/([^ /\\\n]+)/ig,
    'coinbase': /(https?:\/\/(www\.)?)?coinbase\.com\/([^ /\\\n]+)/ig,
    'crunchbase': /(https?:\/\/(www\.)?)?crunchbase\.com\/(person|company|organization)\/([^ /\\\n]+)/ig,
    'delicious': /(https?:\/\/(www\.)?)?delicious\.com\/([^ /\\\n]+)/ig,
    'digg': /(https?:\/\/(www\.)?)?digg\.com\/users\/([^ /\\\n]+)/ig,
    'dribbble': /(https?:\/\/(www\.)?)?dribbble\.com\/([^ /\\\n]+)/ig,
    'facebook': /https?:\/\/([A-Za-z_]{0,3}\.|[A-Za-z_]{2}-[A-Za-z_]{2}\.)?(facebook|fb)\.com\/(groups\/)?([^ /\\\n]+)/ig, //eslint-disable-line unicorn/no-unsafe-regex
    'flickr': /(https?:\/\/(www\.)?)?flickr\.com\/(people|photos|groups)\/([^ /\\\n]+)/ig,
    'foursquare': /(https?:\/\/(www\.)?)?foursquare\.com\/(user\/)?([^ /\\\n]+)/ig,
    'github': /(https?:\/\/(www\.)?)?github\.com\/([^ /\\\n]+)/ig,
    'googleplus': /https?:\/\/plus\.google\.com\/u\/0\/\+?([^ /\\\n]+)/ig,
    'gravatar': /https?:\/\/([A-Za-z_]{0,3}\.)?gravatar\.com\/([^ /\\\n]+)/ig, //eslint-disable-line unicorn/no-unsafe-regex
    'instagram': /(https?:\/\/(www\.)?)?instagram\.com\/([^ /\\\n]+)/ig,
    'keybase': /(https?:\/\/(www\.)?)?keybase\.io\/([^ /\\\n]+)/ig,
    'klout': /(https?:\/\/(www\.)?)?klout\.com\/([^ /\\\n]+)/ig,
    'lastfm': /(https?:\/\/(www\.)?)?(last\.fm|lastfm\.com)\/user\/([^ /\\\n]+)/ig,
    'linkedin': /(https?:\/\/([A-Za-z_]{0,3}\.)?)?linkedin\.com\/(((sales\/)?(in|pub|people|company|companies|organization|edu|school|groups)\/)|(profile\/view\?id=[a-zA-Z]))([^ \n]+)/ig,  //eslint-disable-line unicorn/no-unsafe-regex
    'medium': /(https?:\/\/(www\.)?)?medium\.com\/@?([^ /\\\n]+)/ig,
    'myspace': /(https?:\/\/(www\.)?)?myspace\.com\/([^ /\\\n]+)/ig,
    'ok': /(https?:\/\/(www\.)?)?ok\.ru\/(profile\/)?([^ /\\\n]+)/ig,
    'pandora': /(https?:\/\/(www\.)?)?pandora\.com\/people\/([^ /\\\n]+)/ig,
    'pinterest': /https?:\/\/([A-Za-z_]{0,3}\.)?pinterest\.[a-zA-Z.]+\/([^ +/\n]+)/ig,  //eslint-disable-line unicorn/no-unsafe-regex
    'plancast': /(https?:\/\/(www\.)?)?plancast\.com\/([^ /\\\n]+)/ig,
    'quora': /(https?:\/\/(www\.)?)?quora\.com\/(profile\/)?([^ /\\\n]+)/ig,
    'reddit': /(https?:\/\/(www\.)?)?reddit\.com\/user\/([^ /\\\n]+)/ig,
    'slideshare': /(https?:\/\/(www\.)?)?slideshare\.net\/([^ /\\\n]+)/ig,
    'tumblr': /https?:\/\/(.+)\.tumblr\.com/ig,
    'twitter': /https?:\/\/((www|mobile)\.)?twitter\.com\/([^ /\\\n]+)/ig,
    'x': /https?:\/\/((www|mobile)\.)?x\.com\/([^ /\\\n]+)/ig,
    'vimeo': /(https?:\/\/(www\.)?)?vimeo\.com\/([^ /\\\n]+)/ig,
    'vk': /(https?:\/\/(www\.)?)?vk\.com\/([^ /\\\n]+)/ig,
    'wordpress': /https?:\/\/((?!subscribe).+)\.wordpress\.com/ig,
    'xing': /(https?:\/\/(www\.)?)?xing\.com\/(profile\/)?([^ /\\\n]+)/ig,
    'yahoo': /https?:\/\/((profile|me|local)\.)?yahoo\.com\/([^ /\\\n]+)/ig,
    'youtube': /https?:\/\/([A-Za-z_]{0,3}\.)?youtube\.com\/(user\/|channel\/|c\/)?([^ /\\\n]+)/ig,  //eslint-disable-line unicorn/no-unsafe-regex

    'orcid': /(https?:\/\/(www\.)?)?orcid\.org\/([^ /\\\n]+)/ig,
    'researchgate': /(https?:\/\/(www\.)?)?researchgate\.net\/profile\/([^ /\\\n]+)/ig,
    // googlescholar: /https?:\/\/scholar\.google\.com\/citations\?user=([^ /\\\n]+)/ig,
    // match things like scholar.google.co.in, co.uk and others
    // 'googlescholar': /https?:\/\/scholar\.google\.[a-z\.]{2,6}\/citations\?user=([^ /\\\n]+)/ig,
    'googlescholar': /https?:\/\/scholar\.google\.[a-z\.]{2,6}\/citations\?.*user=([^ /\\\n]+)/ig,
    'publons': /(https?:\/\/(www\.)?)?publons\.com\/researcher\/([0-9]{0,9})?\/([^ /\\\n]+)/ig,
    'protocolsio': /(https?:\/\/(www\.)?)?protocols\.io\/researchers\/([^ /\\\n]+)/ig,
    'url': /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/ig,
    'twitter@': /\@([^ /\\\n]+)/ig,
  },
  typeNameMap: new Map([
    ['aboutme', 'About.me'],
    ['angellist', 'AngelList'],
    ['blogger', 'Blogger'],
    ['coinbase', 'Coinbase'],
    ['crunchbase', 'CrunchBase'],
    ['delicious', 'Delicious'],
    ['dribbble', 'Dribbble'],
    ['facebook', 'Facebook'],
    ['flickr', 'Flickr'],
    ['foursquare', 'Foursquare'],
    ['github', 'GitHub'],
    ['googleplus', 'GooglePlus'],
    ['gravatar', 'Gravatar'],
    ['instagram', 'Instagram'],
    ['keybase', 'Keybase'],
    ['klout', 'Klout'],
    ['lastfm', 'Last.FM'],
    ['linkedin', 'LinkedIn'],
    ['medium', 'Medium'],
    ['myspace', 'MySpace'],
    ['ok', 'Odnoklassniki'],
    ['pandora', 'Pandora'],
    ['pinterest', 'Pinterest'],
    ['plancast', 'Plancast'],
    ['quora', 'Quora'],
    ['reddit', 'Reddit'],
    ['slideshare', 'Slideshare'],
    ['tumblr', 'Tumblr'],
    ['twitter', 'Twitter'],
    ['x', 'X'],
    ['vimeo', 'Vimeo'],
    ['vk', 'VK'],
    ['wordpress', 'Wordpress'],
    ['xing', 'Xing'],
    ['yahoo', 'Yahoo'],
    ['youtube', 'YouTube'],

    ['orcid', 'ORCID'],
    ['researchgate', 'ResearchGate'],
    ['googlescholar', 'GoogleScholar'],
    ['publons', 'Publons'],
    ['protocolsio', 'ProtocolsIO'],
    ['url', 'URL'],
    ['email', 'Email'],
    ['resume', 'Resume'],
  ])
};


/**
 * @typedef {Object} parseResult
 * @property {String} type
 * @property {String} type_name
 * @property {String} username
 * @property {String} url
 */

/**
 *
 * @param {String} inputText
 * @returns {Array<parseResult>}
 */
export const socialParse = (inputText) => {

  const resultsMap = new Map();
  const resultsArr = []

  // remove all commas, if they exist
  inputText = inputText.replace(/,/g, '');

  // extract and deduplicate all links from inputText
  // extract all links from inputText using a regular expression
  let links = inputText.match(/https?:\/\/[^"<\s]+/g) || [];

  // extract all emails from inputText using a regular expression
  let emails = inputText.match(/([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16})/g) || [];

  // combine links and emails
  let combined = [...links, ...emails];

  // deduplicate combined by converting to a Set and back to an Array
  combined = [...new Set(combined)];

  // console.log('---> LINKS:: links:', links)
  inputText = combined.join('\n')
  // console.log('---> LINKS:: inputText:', inputText)

  // Create a copy of internals.regexes
  const regexesCopy = { ...internals.regexes };

  // Get the 'url' regex and remove it from the 'regexes' object
  const urlRegex = regexesCopy['url'];
  if (urlRegex) {
    delete regexesCopy['url'];
  }

  // Process all other regexes first
  Object.entries(regexesCopy).forEach(processRegex);

  // Process the 'url' regex last
  if (urlRegex) {
    processRegex(['url', urlRegex]);
  }

  function processRegex([type, regex]) {
    // While loop is needed to process multiple matches from 1 regex
    let result;
    while ((result = regex.exec(inputText)) !== null) {
      let username = result[result.length - 1];
      if (username) {
        let match = username.match(/(@?\w+)(?=[\\" ])/);
        if (match) {
          username = match[1];
        }
      }


      // do some url stuff
      let url = result[0]
      if (type === 'twitter@') {
        url = `https://twitter.com/${username}`
      }
      let urlMatch = url.match(urlRegex);
      if (urlMatch && urlMatch[0].includes('http') === false) {
        url = `https://${urlMatch[0]}`
      }

      if (type === 'email') {
        url = "mailto:" + url
      }

      if (type === 'resume') {
        url = url
      }

      let cleanUrlRegex = /https?:\/\/[^">]+/i;
      let cleanUrlMatch = url.match(cleanUrlRegex);
      if (cleanUrlMatch) {
        url = cleanUrlMatch[0];
      }
      url = url.replace(/<\/a$/i, '');

      resultsMap.set(`${type}`, {
        type,
        username,
        url,
        type_name: internals.typeNameMap.get(type) || 'other'
      });

      // resultsArr.push({
      //   [type]: {
      //     type,
      //     username,
      //     url,
      //     type_name: internals.typeNameMap.get(type) || 'other'
      //   }
      // })

      resultsArr.push({
        type,
        username,
        url,
        type_name: internals.typeNameMap.get(type) || 'other'
      })

      // Remove the matched substring from the input text
      inputText = inputText.replace(result[0], '');
    }
  }

  // return [...resultsMap.values()];
  return { resultsMap, resultsArr }
};



// import socialParser from './social-parser'
export const socialReplace = (text, socialStr) => {

  let result = text
  const { resultsMap, resultsArr } = socialParse(socialStr)

  Array.from(resultsMap.keys()).map(key => {
    let regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g')
    result = result.replace(regex, resultsMap.get(key).url) // used for the map
    // if (social.type ==)
  })

  return { text: result, data: [...resultsMap.values()], results: resultsArr }
}

