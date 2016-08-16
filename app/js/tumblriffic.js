

// TODO

// create a jquery wrapper w/ settings
// - tumblr name
// - items to generate
// - posts per page (default is tumblr default: 20 posts)
// - callback function (for resetting sort.js filter)
// - add "show more" example
// - add filter example with list.js
// - add jekyll example
// - add documentation
// - add easy-access customizable html wrappers
// - add pagination example through list.js
// - add setting to load all
// - minified version
// - npm install
// - other types of newfangled install methods
// - github documentation page
// - be able to load more, or load a range
// - let devs choose v1 or v2 (key required) 

// Notes
// - no API key required (v1)
// - note that API only receives 20 posts at a time
// - need to make succcessive offset calls to get more
// 		- useful for a "more posts" button
// 		- posts-start: 0,  <-- offset
// 		- posts-total: 27,
// 		- posts-type: false,

// API v1: https://www.tumblr.com/docs/en/api/v1
// API v2: https://www.tumblr.com/docs/en/api/v2

$(document).ready(function() {

	var tumblr_api_read; // usually geenrated from tumblr API 1
	
	// mock data
	var tumblr = {"tumblelog":{"title":"Funky Usability","description":"A look at the best, worst, and craziest of product and interaction designs.","name":"funkability","timezone":"US/Eastern","cname":false,"feeds":[]},"posts-start":0,"posts-total":27,"posts-type":false,"posts":[{"id":"128639745844","url":"http://funkability.tumblr.com/post/128639745844","url-with-slug":"http://funkability.tumblr.com/post/128639745844/mailchimp-has-some-of-the-best-ux-around-their","type":"photo","date-gmt":"2015-09-08 15:06:05 GMT","date":"Tue, 08 Sep 2015 11:06:05","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1441724765,"format":"html","reblog-key":"ieNGkGcg","slug":"mailchimp-has-some-of-the-best-ux-around-their","photo-caption":"<p>MailChimp has some of the best UX around. Their team is dedicated and write a lot of cool stuff, and they published this booklet for everyone to read. Give it a shot – there’s some good stuff in there.</p><p>(via <a href=\"http://theuxreader.com/\">The UX Reader | MailChimp – MailChimp UX</a>) </p>","width":"250","height":"357","photo-url-1280":"http://40.media.tumblr.com/2f0adf34b3a931f30620848d34a24a62/tumblr_nud5y5KSmQ1sr0ycio1_250.png","photo-url-500":"http://40.media.tumblr.com/2f0adf34b3a931f30620848d34a24a62/tumblr_nud5y5KSmQ1sr0ycio1_250.png","photo-url-400":"http://40.media.tumblr.com/2f0adf34b3a931f30620848d34a24a62/tumblr_nud5y5KSmQ1sr0ycio1_250.png","photo-url-250":"http://40.media.tumblr.com/2f0adf34b3a931f30620848d34a24a62/tumblr_nud5y5KSmQ1sr0ycio1_250.png","photo-url-100":"http://40.media.tumblr.com/2f0adf34b3a931f30620848d34a24a62/tumblr_nud5y5KSmQ1sr0ycio1_100.png","photo-url-75":"http://40.media.tumblr.com/2f0adf34b3a931f30620848d34a24a62/tumblr_nud5y5KSmQ1sr0ycio1_75sq.png","photos":[],"tags":["mailchimp","mailkimp","ux","books","reading"]},{"id":"128193944319","url":"http://funkability.tumblr.com/post/128193944319","url-with-slug":"http://funkability.tumblr.com/post/128193944319/the-larger-the-distance-between-people-who-build","type":"photo","date-gmt":"2015-09-02 16:33:08 GMT","date":"Wed, 02 Sep 2015 12:33:08","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1441211588,"format":"html","reblog-key":"kIorjfeE","slug":"the-larger-the-distance-between-people-who-build","photo-caption":"<p>“The larger the distance between people who build a product and people who make decisions about the product, the harder it is to make a good product.”</p><p>This is why product designers need to get dirty with ethnographic research. Get in the minds of the intended users to understand how they really work. And not the things they <i>want</i> – but actually figuring out what <i>users need</i> – which might actually contradict what they want.</p><p>Focus on user needs, not wants.</p><p>(via <a href=\"http://alistapart.com/column/the-distance-to-here\">The Distance to Here · An A List Apart Column</a>) </p>","width":"960","height":"98","photo-url-1280":"http://41.media.tumblr.com/c24a1ce9cfcb2103463eaa18953a1bfb/tumblr_nu25z800kW1sr0ycio1_1280.png","photo-url-500":"http://40.media.tumblr.com/c24a1ce9cfcb2103463eaa18953a1bfb/tumblr_nu25z800kW1sr0ycio1_500.png","photo-url-400":"http://41.media.tumblr.com/c24a1ce9cfcb2103463eaa18953a1bfb/tumblr_nu25z800kW1sr0ycio1_400.png","photo-url-250":"http://41.media.tumblr.com/c24a1ce9cfcb2103463eaa18953a1bfb/tumblr_nu25z800kW1sr0ycio1_250.png","photo-url-100":"http://41.media.tumblr.com/c24a1ce9cfcb2103463eaa18953a1bfb/tumblr_nu25z800kW1sr0ycio1_100.png","photo-url-75":"http://41.media.tumblr.com/c24a1ce9cfcb2103463eaa18953a1bfb/tumblr_nu25z800kW1sr0ycio1_75sq.png","photos":[]},{"id":"128051634204","url":"http://funkability.tumblr.com/post/128051634204","url-with-slug":"http://funkability.tumblr.com/post/128051634204/get-comfortable-sharing-your-shitty-work","type":"quote","date-gmt":"2015-08-31 20:26:51 GMT","date":"Mon, 31 Aug 2015 16:26:51","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1441052811,"format":"html","reblog-key":"8QOHT8g3","slug":"get-comfortable-sharing-your-shitty-work","quote-text":"get comfortable sharing your shitty work.","quote-source":"<p><a href=\"http://jlzych.com/2015/08/30/get-comfortable-sharing-shitty-work/\">Jeff Zych - Get Comfortable Sharing Your Shitty Work</a></p><p>Work is just like improv. Sometimes it’ll work out, sometimes it doesn’t. But have fun doing it, and you’ll amass more and more great stuff</p>","tags":["work","play","fun","vulnerability","letitgo"]},{"id":"128030585479","url":"http://funkability.tumblr.com/post/128030585479","url-with-slug":"http://funkability.tumblr.com/post/128030585479/via-hack-a-typeface-designed-for-source-code","type":"photo","date-gmt":"2015-08-31 14:29:06 GMT","date":"Mon, 31 Aug 2015 10:29:06","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1441031346,"format":"html","reblog-key":"bG6MSaPn","slug":"via-hack-a-typeface-designed-for-source-code","photo-caption":"<p>(via <a href=\"http://sourcefoundry.org/hack/?utm_source=designernews\">Hack | A typeface designed for source code</a>) </p><p>This might be a good font for posted code examples and codes snippets.</p>","width":"2624","height":"1660","photo-url-1280":"http://41.media.tumblr.com/c69a9ceacb85c7650252e9ec5fa9d908/tumblr_ntyawi1Uo51sr0ycio1_1280.png","photo-url-500":"http://41.media.tumblr.com/c69a9ceacb85c7650252e9ec5fa9d908/tumblr_ntyawi1Uo51sr0ycio1_500.png","photo-url-400":"http://41.media.tumblr.com/c69a9ceacb85c7650252e9ec5fa9d908/tumblr_ntyawi1Uo51sr0ycio1_400.png","photo-url-250":"http://41.media.tumblr.com/c69a9ceacb85c7650252e9ec5fa9d908/tumblr_ntyawi1Uo51sr0ycio1_250.png","photo-url-100":"http://40.media.tumblr.com/c69a9ceacb85c7650252e9ec5fa9d908/tumblr_ntyawi1Uo51sr0ycio1_100.png","photo-url-75":"http://40.media.tumblr.com/c69a9ceacb85c7650252e9ec5fa9d908/tumblr_ntyawi1Uo51sr0ycio1_75sq.png","photos":[]},{"id":"127564579274","url":"http://funkability.tumblr.com/post/127564579274","url-with-slug":"http://funkability.tumblr.com/post/127564579274/why-you-need-to-refactor-your-css","type":"link","date-gmt":"2015-08-25 16:14:33 GMT","date":"Tue, 25 Aug 2015 12:14:33","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1440519273,"format":"html","reblog-key":"dAHaMIqF","slug":"why-you-need-to-refactor-your-css","link-text":"Why You Need to Refactor Your CSS","link-url":"http://seesparkbox.com/foundry/why_you_need_to_refactor_your_css","link-description":"<p>Yes, you need to refactor your CSS from time to time, to streamline the code, and to make it more understandable. I recently refactored my own homepage for just this reason, and so that down the line I can more easily make additions to my page.</p><p>This is a good article, but one thing they mentioned really bothered me</p><!-- more --><p>They namely used a really nifty tool from Sass 3.4:</p><p><br/>“The latest version of Sass can make this kind of refactoring even easier with changes to how the parent selector symbol now works when nesting styles.”</p><blockquote><p><code>.article {</code><code>   <br/></code><code>   &amp;__title {}</code><code>   <br/>   &amp;__byline {}</code><code>   <br/></code><code>   &amp;__img {}   </code><code>  <br/>   &amp;__body {}  <br/></code><code>}</code></p><p><code></code></p></blockquote><p><code></code></p><p>In theory, this is very clever. You can use the nesting to generate names that you want. In practice, this makes your code incredibly difficult to ctrl+F for. Especially when your code spans dozens of files. <br/></p><p>The irony of this article is that recently I’ve started to refactor my Sass to remove most nested selectors, and tricks like these. They still come in handy from time to time, but they need to be used sparingly.</p>"},{"id":"127518255169","url":"http://funkability.tumblr.com/post/127518255169","url-with-slug":"http://funkability.tumblr.com/post/127518255169/usb-type-c-usb-30-usb-31-gen-1-usb-31-gen","type":"photo","date-gmt":"2015-08-25 00:50:51 GMT","date":"Mon, 24 Aug 2015 20:50:51","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1440463851,"format":"html","reblog-key":"bsPrExJf","slug":"usb-type-c-usb-30-usb-31-gen-1-usb-31-gen","photo-caption":"<p>USB Type C / USB 3.0 / USB 3.1 gen 1 / USB 3.1 gen 2 is almost here, and while we thought we’d be done asking “why are there so many different sizes of USB ports?” the USB Implementers Forum thought it would be nice to barrage us with a new wave of confusion. Since you know, now that we don’t have to worry about which way is the correct way to plug the cable in the port.</p><p>Instead, we are now barraged with a many different standards and types of USB Type C, many of which have different capabilities. USB Implementers Forum can’t really make manufacturers use the highest spec, manufactures can choose what their USB Type C ports can do. Instead, they ask manufacturers to use these different types of logos and stickers and hope people will understand what they do down the line.</p><p>Between the confusing logos, the retroactive naming (USB 3.0 changed to USB 3.1 gen 1 for some reason), it’s like the Forum is deliberately trying to confuse users.</p><p>Apparently the end game is for “confusion to fade” and for “USB 3.0 to eventually go away.” </p><p>That’s a great way to solve problems by the way: by wishing them away.</p><p>Here’s to another ten years of confusing over USBs.</p><p><br/></p><p> (via <a href=\"http://arstechnica.com/gadgets/2015/08/what-the-usb-if-is-doing-to-clear-up-confusion-about-all-these-usb-specs/\">The USB-IF doesn’t want you to be confused about USB Type-C | Ars Technica</a>)<br/></p>","width":"640","height":"480","photo-url-1280":"http://41.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_1280.png","photo-url-500":"http://40.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_500.png","photo-url-400":"http://41.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_400.png","photo-url-250":"http://41.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_250.png","photo-url-100":"http://41.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_100.png","photo-url-75":"http://36.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_75sq.png","photos":[{"offset":"o1","caption":"","width":"640","height":"480","photo-url-1280":"http://41.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_1280.png","photo-url-500":"http://40.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_500.png","photo-url-400":"http://41.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_400.png","photo-url-250":"http://41.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_250.png","photo-url-100":"http://41.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_100.png","photo-url-75":"http://36.media.tumblr.com/08bce9b98919edf3938567b8b4b87380/tumblr_ntm50rlYUP1sr0ycio1_75sq.png"},{"offset":"o2","caption":"","width":"300","height":"150","photo-url-1280":"http://41.media.tumblr.com/3564883b7f118c99dd73d68be2bf8284/tumblr_ntm50rlYUP1sr0ycio2_400.jpg","photo-url-500":"http://41.media.tumblr.com/3564883b7f118c99dd73d68be2bf8284/tumblr_ntm50rlYUP1sr0ycio2_400.jpg","photo-url-400":"http://41.media.tumblr.com/3564883b7f118c99dd73d68be2bf8284/tumblr_ntm50rlYUP1sr0ycio2_400.jpg","photo-url-250":"http://41.media.tumblr.com/3564883b7f118c99dd73d68be2bf8284/tumblr_ntm50rlYUP1sr0ycio2_250.jpg","photo-url-100":"http://40.media.tumblr.com/3564883b7f118c99dd73d68be2bf8284/tumblr_ntm50rlYUP1sr0ycio2_100.jpg","photo-url-75":"http://41.media.tumblr.com/3564883b7f118c99dd73d68be2bf8284/tumblr_ntm50rlYUP1sr0ycio2_75sq.jpg"}]},{"id":"127501675589","url":"http://funkability.tumblr.com/post/127501675589","url-with-slug":"http://funkability.tumblr.com/post/127501675589/9-pens-what-can-a-frontend-dev-do-with-3","type":"link","date-gmt":"2015-08-24 20:50:24 GMT","date":"Mon, 24 Aug 2015 16:50:24","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1440449424,"format":"html","reblog-key":"tz6kwTn5","slug":"9-pens-what-can-a-frontend-dev-do-with-3","link-text":"9 Pens - What Can a Frontend Dev do with 3 Seconds, 5 Colors, and 250x250px?","link-url":"http://codepen.io/noahblon/blog/9-pens","link-description":"<p>CSS front end animation art / wizardry. </p>","tags":["css art animation html html5"]},{"id":"127078757964","url":"http://funkability.tumblr.com/post/127078757964","url-with-slug":"http://funkability.tumblr.com/post/127078757964/typesetjs-an-html-pre-processor-for-web","type":"link","date-gmt":"2015-08-19 14:37:15 GMT","date":"Wed, 19 Aug 2015 10:37:15","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1439995035,"format":"html","reblog-key":"FsqKmy3b","slug":"typesetjs-an-html-pre-processor-for-web","link-text":"Typeset.js – an HTML pre-processor for web typography","link-url":"https://blot.im/typeset/","link-description":"<p>Great tool for creating magazine or essay-like typography treatment.</p>","tags":["typography typeset webdev js"]},{"id":"126968749819","url":"http://funkability.tumblr.com/post/126968749819","url-with-slug":"http://funkability.tumblr.com/post/126968749819/internet-of-shit-internetofshit-twitter","type":"link","date-gmt":"2015-08-18 04:18:13 GMT","date":"Tue, 18 Aug 2015 00:18:13","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1439871493,"format":"html","reblog-key":"XAATP26u","slug":"internet-of-shit-internetofshit-twitter","link-text":"Internet of Shit (@internetofshit) | Twitter","link-url":"https://twitter.com/internetofshit","link-description":"<p>this is the best thing ever. EVER.</p>","tags":["iot","internet of things"]},{"id":"126681257514","url":"http://funkability.tumblr.com/post/126681257514","url-with-slug":"http://funkability.tumblr.com/post/126681257514/callmecavslayzrjs","type":"link","date-gmt":"2015-08-14 17:35:46 GMT","date":"Fri, 14 Aug 2015 13:35:46","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1439573746,"format":"html","reblog-key":"mFsxZmMS","slug":"callmecavslayzrjs","link-text":"callmecavs/layzr.js","link-url":"https://github.com/callmecavs/layzr.js","link-description":"<p>image lazy loading</p>","tags":["image","web","lazyloading","js"]},{"id":"126681021734","url":"http://funkability.tumblr.com/post/126681021734","url-with-slug":"http://funkability.tumblr.com/post/126681021734/best-web-animations-code-with-coffee","type":"link","date-gmt":"2015-08-14 17:31:51 GMT","date":"Fri, 14 Aug 2015 13:31:51","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1439573511,"format":"html","reblog-key":"y000iXw9","slug":"best-web-animations-code-with-coffee","link-text":"Best Web Animations | Code with Coffee","link-url":"http://www.codewithcoffee.com/best-web-animations/","link-description":"<p>Great collection of tools for adding web animations, including SVG tracing animations, fake lazy loading, transitions, spinning / loading and comet cursors! </p>","tags":["web","webdev","animation","js","jquery"]},{"id":"126479868434","url":"http://funkability.tumblr.com/post/126479868434","url-with-slug":"http://funkability.tumblr.com/post/126479868434/svgomg-svgos-missing-gui","type":"link","date-gmt":"2015-08-12 03:53:29 GMT","date":"Tue, 11 Aug 2015 23:53:29","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1439351609,"format":"html","reblog-key":"1lbH5ZIo","slug":"svgomg-svgos-missing-gui","link-text":"SVGOMG - SVGO's Missing GUI","link-url":"https://jakearchibald.github.io/svgomg/","link-description":"<p>Amazing SVG optimizer</p>","tags":["webdev","svg","optimization","tools"]},{"id":"126430734414","url":"http://funkability.tumblr.com/post/126430734414","url-with-slug":"http://funkability.tumblr.com/post/126430734414/via-how-to-increase-your-willpower-the","type":"photo","date-gmt":"2015-08-11 15:47:54 GMT","date":"Tue, 11 Aug 2015 11:47:54","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1439308074,"format":"html","reblog-key":"t8GsTGCN","slug":"via-how-to-increase-your-willpower-the","photo-caption":"<p>(via <a href=\"http://thenuschool.com/how-to-increase-your-willpower/\">How To Increase Your Willpower - The nuSchool</a>) </p><p><a href=\"http://thenuschool.com/how-to-increase-your-willpower/\">http://thenuschool.com/how-to-increase-your-willpower/</a><br/>A guideline and inspiration about how to become better at things.<br/></p><p><b>“It’s Not Talent, It’s Willpower”</b></p><p><i>“Albert Einstein famously said that genius is 1% talent and 99% hard work. That’s probably true, but I’ve noticed something else about hard work: first of all, it’s not easy to do. Secondly, most people try to avoid hard work at all cost, even the talented ones.”</i><br/></p>","width":"1000","height":"1000","photo-url-1280":"http://41.media.tumblr.com/6b191b93d03350abc30d2557dd331a3d/tumblr_nsxd7uGnOz1sr0ycio1_1280.jpg","photo-url-500":"http://40.media.tumblr.com/6b191b93d03350abc30d2557dd331a3d/tumblr_nsxd7uGnOz1sr0ycio1_500.jpg","photo-url-400":"http://36.media.tumblr.com/6b191b93d03350abc30d2557dd331a3d/tumblr_nsxd7uGnOz1sr0ycio1_400.jpg","photo-url-250":"http://40.media.tumblr.com/6b191b93d03350abc30d2557dd331a3d/tumblr_nsxd7uGnOz1sr0ycio1_250.jpg","photo-url-100":"http://40.media.tumblr.com/6b191b93d03350abc30d2557dd331a3d/tumblr_nsxd7uGnOz1sr0ycio1_100.jpg","photo-url-75":"http://41.media.tumblr.com/6b191b93d03350abc30d2557dd331a3d/tumblr_nsxd7uGnOz1sr0ycio1_75sq.jpg","photos":[],"tags":["learn work productivity"]},{"id":"126430453389","url":"http://funkability.tumblr.com/post/126430453389","url-with-slug":"http://funkability.tumblr.com/post/126430453389/color-hunt","type":"link","date-gmt":"2015-08-11 15:43:15 GMT","date":"Tue, 11 Aug 2015 11:43:15","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1439307795,"format":"html","reblog-key":"vnh04Rhl","slug":"color-hunt","link-text":"Color Hunt","link-url":"http://colorhunt.co/","link-description":"","tags":["design color"]},{"id":"76961769614","url":"http://funkability.tumblr.com/post/76961769614","url-with-slug":"http://funkability.tumblr.com/post/76961769614/taken-on-buford-hwy-at-sidney-marcus-notice-the","type":"photo","date-gmt":"2014-02-17 15:53:04 GMT","date":"Mon, 17 Feb 2014 10:53:04","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1392652384,"format":"html","reblog-key":"bTe5kWHE","slug":"taken-on-buford-hwy-at-sidney-marcus-notice-the","photo-caption":"<p>Taken on Buford Hwy at Sidney Marcus. Notice the two street signs hanging from the same cable. The left sign &ldquo;Buford Hwy&rdquo; points to the street going straight. The right sign &ldquo;Sidney Marcus&rdquo; points to the left turn. </p>\n\n<p>I&rsquo;ve always wondered if civil engineers who design intersections ever think about the confusion and the traffic problems signage like this could cause. It&rsquo;s especially bad in Atlanta. So is the traffic.</p>","width":"1280","height":"960","photo-url-1280":"http://41.media.tumblr.com/0e97ed48c2328424e1893cea96991bd2/tumblr_n15dgg3D061sr0ycio1_1280.jpg","photo-url-500":"http://41.media.tumblr.com/0e97ed48c2328424e1893cea96991bd2/tumblr_n15dgg3D061sr0ycio1_500.jpg","photo-url-400":"http://41.media.tumblr.com/0e97ed48c2328424e1893cea96991bd2/tumblr_n15dgg3D061sr0ycio1_400.jpg","photo-url-250":"http://41.media.tumblr.com/0e97ed48c2328424e1893cea96991bd2/tumblr_n15dgg3D061sr0ycio1_250.jpg","photo-url-100":"http://41.media.tumblr.com/0e97ed48c2328424e1893cea96991bd2/tumblr_n15dgg3D061sr0ycio1_100.jpg","photo-url-75":"http://36.media.tumblr.com/0e97ed48c2328424e1893cea96991bd2/tumblr_n15dgg3D061sr0ycio1_75sq.jpg","photos":[]},{"id":"76664342421","url":"http://funkability.tumblr.com/post/76664342421","url-with-slug":"http://funkability.tumblr.com/post/76664342421/the-saddest-facebook-error-message","type":"photo","date-gmt":"2014-02-14 21:39:31 GMT","date":"Fri, 14 Feb 2014 16:39:31","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1392413971,"format":"html","reblog-key":"aQtsn9J3","slug":"the-saddest-facebook-error-message","photo-caption":"<p>The saddest Facebook error message</p>","width":"329","height":"313","photo-url-1280":"http://41.media.tumblr.com/3ccf847d7df00a585223328a145bdc45/tumblr_n109hvFYSN1sr0ycio1_400.png","photo-url-500":"http://41.media.tumblr.com/3ccf847d7df00a585223328a145bdc45/tumblr_n109hvFYSN1sr0ycio1_400.png","photo-url-400":"http://41.media.tumblr.com/3ccf847d7df00a585223328a145bdc45/tumblr_n109hvFYSN1sr0ycio1_400.png","photo-url-250":"http://41.media.tumblr.com/3ccf847d7df00a585223328a145bdc45/tumblr_n109hvFYSN1sr0ycio1_250.png","photo-url-100":"http://41.media.tumblr.com/3ccf847d7df00a585223328a145bdc45/tumblr_n109hvFYSN1sr0ycio1_100.png","photo-url-75":"http://41.media.tumblr.com/3ccf847d7df00a585223328a145bdc45/tumblr_n109hvFYSN1sr0ycio1_75sq.png","photos":[]},{"id":"76635058724","url":"http://funkability.tumblr.com/post/76635058724","url-with-slug":"http://funkability.tumblr.com/post/76635058724/heres-a-screenshot-of-myuhc-our-works","type":"photo","date-gmt":"2014-02-14 15:35:49 GMT","date":"Fri, 14 Feb 2014 10:35:49","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1392392149,"format":"html","reblog-key":"2gyq8Ssb","slug":"heres-a-screenshot-of-myuhc-our-works","photo-caption":"<p>Here&rsquo;s a screenshot of myUHC, our work&rsquo;s healthcare insurance provider. For some reason, login requires a &ldquo;Username&rdquo; - a completely unnecessary step for logging into a healthcare provider. Wouldn&rsquo;t it make sense to just ask for email and password? </p>\n<p>The point is, I can&rsquo;t remember my username, and the username retrieval system is a pain (need a bunch of insurance information)</p>","width":"252","height":"308","photo-url-1280":"http://41.media.tumblr.com/27e230646546bbef9ad58384ac06242c/tumblr_n0zsnp1NT91sr0ycio1_400.png","photo-url-500":"http://41.media.tumblr.com/27e230646546bbef9ad58384ac06242c/tumblr_n0zsnp1NT91sr0ycio1_400.png","photo-url-400":"http://41.media.tumblr.com/27e230646546bbef9ad58384ac06242c/tumblr_n0zsnp1NT91sr0ycio1_400.png","photo-url-250":"http://40.media.tumblr.com/27e230646546bbef9ad58384ac06242c/tumblr_n0zsnp1NT91sr0ycio1_250.png","photo-url-100":"http://40.media.tumblr.com/27e230646546bbef9ad58384ac06242c/tumblr_n0zsnp1NT91sr0ycio1_100.png","photo-url-75":"http://40.media.tumblr.com/27e230646546bbef9ad58384ac06242c/tumblr_n0zsnp1NT91sr0ycio1_75sq.png","photos":[]},{"id":"76234285922","url":"http://funkability.tumblr.com/post/76234285922","url-with-slug":"http://funkability.tumblr.com/post/76234285922/error-from-google-chrome-when-downloading-from","type":"photo","date-gmt":"2014-02-10 17:41:02 GMT","date":"Mon, 10 Feb 2014 12:41:02","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1392054062,"format":"html","reblog-key":"nmXpcwUN","slug":"error-from-google-chrome-when-downloading-from","photo-caption":"<p>Error from Google Chrome when downloading from untrustworthy sources.</p>\n<p>Not&hellip; really sure what I was downloading. I think I blacked out from the pain after it downloaded.</p>","width":"403","height":"177","photo-url-1280":"http://40.media.tumblr.com/13513d56c6a8c4a198a64fc27e8e31fa/tumblr_n0sjse8Vi91sr0ycio1_500.png","photo-url-500":"http://40.media.tumblr.com/13513d56c6a8c4a198a64fc27e8e31fa/tumblr_n0sjse8Vi91sr0ycio1_500.png","photo-url-400":"http://40.media.tumblr.com/13513d56c6a8c4a198a64fc27e8e31fa/tumblr_n0sjse8Vi91sr0ycio1_400.png","photo-url-250":"http://40.media.tumblr.com/13513d56c6a8c4a198a64fc27e8e31fa/tumblr_n0sjse8Vi91sr0ycio1_250.png","photo-url-100":"http://40.media.tumblr.com/13513d56c6a8c4a198a64fc27e8e31fa/tumblr_n0sjse8Vi91sr0ycio1_100.png","photo-url-75":"http://40.media.tumblr.com/13513d56c6a8c4a198a64fc27e8e31fa/tumblr_n0sjse8Vi91sr0ycio1_75sq.png","photos":[]},{"id":"76234183646","url":"http://funkability.tumblr.com/post/76234183646","url-with-slug":"http://funkability.tumblr.com/post/76234183646/filezilla-yells-at-me-to-try-typing-a-little","type":"photo","date-gmt":"2014-02-10 17:39:41 GMT","date":"Mon, 10 Feb 2014 12:39:41","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1392053981,"format":"html","reblog-key":"OhqwaMnu","slug":"filezilla-yells-at-me-to-try-typing-a-little","photo-caption":"<p>FileZilla! yells at me to &ldquo;try typing a little faster next time&rdquo; because it timed out. Ouch.</p>","width":"491","height":"139","photo-url-1280":"http://41.media.tumblr.com/b3b6a195749b91aebd370a09f27388a8/tumblr_n0sjq5n0jz1sr0ycio1_500.png","photo-url-500":"http://41.media.tumblr.com/b3b6a195749b91aebd370a09f27388a8/tumblr_n0sjq5n0jz1sr0ycio1_500.png","photo-url-400":"http://41.media.tumblr.com/b3b6a195749b91aebd370a09f27388a8/tumblr_n0sjq5n0jz1sr0ycio1_400.png","photo-url-250":"http://40.media.tumblr.com/b3b6a195749b91aebd370a09f27388a8/tumblr_n0sjq5n0jz1sr0ycio1_250.png","photo-url-100":"http://41.media.tumblr.com/b3b6a195749b91aebd370a09f27388a8/tumblr_n0sjq5n0jz1sr0ycio1_100.png","photo-url-75":"http://41.media.tumblr.com/b3b6a195749b91aebd370a09f27388a8/tumblr_n0sjq5n0jz1sr0ycio1_75sq.png","photos":[]},{"id":"76234099231","url":"http://funkability.tumblr.com/post/76234099231","url-with-slug":"http://funkability.tumblr.com/post/76234099231/what-i-dont-what-i-cant-see-the-last-letter","type":"photo","date-gmt":"2014-02-10 17:38:30 GMT","date":"Mon, 10 Feb 2014 12:38:30","bookmarklet":0,"mobile":0,"feed-item":"","from-feed-id":0,"unix-timestamp":1392053910,"format":"html","reblog-key":"xSqEKIOo","slug":"what-i-dont-what-i-cant-see-the-last-letter","photo-caption":"<p>What&hellip; I don&rsquo;t. What. I can&rsquo;t see the last letter. Aaaand switching provider.</p>","width":"1112","height":"694","photo-url-1280":"http://41.media.tumblr.com/c07e5fb147fb933bb33108aab7bf7f27/tumblr_n0sjo6SOoj1sr0ycio1_1280.png","photo-url-500":"http://36.media.tumblr.com/c07e5fb147fb933bb33108aab7bf7f27/tumblr_n0sjo6SOoj1sr0ycio1_500.png","photo-url-400":"http://40.media.tumblr.com/c07e5fb147fb933bb33108aab7bf7f27/tumblr_n0sjo6SOoj1sr0ycio1_400.png","photo-url-250":"http://36.media.tumblr.com/c07e5fb147fb933bb33108aab7bf7f27/tumblr_n0sjo6SOoj1sr0ycio1_250.png","photo-url-100":"http://41.media.tumblr.com/c07e5fb147fb933bb33108aab7bf7f27/tumblr_n0sjo6SOoj1sr0ycio1_100.png","photo-url-75":"http://40.media.tumblr.com/c07e5fb147fb933bb33108aab7bf7f27/tumblr_n0sjo6SOoj1sr0ycio1_75sq.png","photos":[]}]}
	var posts = tumblr.posts;

	console.log (" Let's get ready to TUMBLR");

	console.log(tumblr);
	console.log(posts)

	console.log('title: ' + tumblr.tumblelog.title);

	generate(posts);


	console.log('output ' + generate(posts))
		
	// $('.tumblr').html(generate(posts));

	// $('.list').html('banana')


	// generate output
	function generate(posts) {

		// github form: generate from settings

		// janzheng tumblr layout

		var output = "";

		// for (i=0; i<posts.length; i++) {

		// only do 1 for testing
		for (i=0; i<1; i++) {
			var post = posts[i];
			console.log('Post ' + i + ' ' + post);

			// generate list
			output += '<li class="post" data-date=" '+post['date-gmt']+' ">';

			// generate link
			output += '<a href="'+post['url-with-slug']+' ">';

			// generate post container
			output += '<div class="post__container post-preview-std ">';

			// generate post__info header
			output += '<div class="post__info"><div class="post__category post__category--tumblr"><div class="post__category__icon"><span class="icon icon--filter icon--tumblr"></span></div><div class="post__category__label sortCategory">tumblr</div><div class="post__date__container"><div class="post__date"> '+post['date-gmt']+' </div></div>';
	             

	              
	            //     <!-- needs to be on one line for sort.js -->
	            //     <div class="post__category__label sortCategory">thought</div>
	            //   </div>
	              
	            //   <div class="post__date__container">
	            //     <div class="post__date">02 October 2014</div>
	            //   </div>

	            //   <div class="post__title__container">
	            //     <div class="post__title">Stop Hiring Unicorns</div>
	            //   </div>
	              
	            //   <div class="post__summary__container">
	            //     <div class="post__summary">Do designers need to learn code?</div>
	            //   </div>
	            //         <div class="post__tags__container">
	            //           <ul class="post__tags">   
	            //                 <li>ux</li>
	            //                 <li>design</li>
	            //                 <li>code</li>
	            //                 <li>freelance</li>
	            //                 <li>unicorn</li>
	            //           </ul>
	            //         </div>
	            //   <div class="clear"></div>
	            // </div>

			// output += '<div class="post__info">';

			// 	output += '<div class="post__title__container"> '+post['slug']+'</div>';

			// output += '</div>';



			output += '</div> \n';
			// output += '</a> \n';
			output += '</li> \n';

			output = "";

			// output = "<div>banana pie <div>rules</div> </div>"
		}

		return output;
	/*
		<li class="post " data-date="2014-10-02 00:00:00 -0400">
	        <a href=" /blog/2014/10/unicorns.html  ">
	          <div class="post__container post-preview-std post__imgPreview--short post__imgPreview--mixed  post__imgPreview--noImg "> <!-- bg image is set in script.js -->
	            <div class="post__info">
	              <!-- this is for category tags labels -->
	              <div class="post__category post__category--thought">
	                <div class="post__category__icon">
						<span class="icon icon--filter icon--thought"></span>
	                </div>
	                <!-- needs to be on one line for sort.js -->
	                <div class="post__category__label sortCategory">thought</div>
	              </div>
	              
	              <div class="post__date__container">
	                <div class="post__date">02 October 2014</div>
	              </div>

	              <div class="post__title__container">
	                <div class="post__title">Stop Hiring Unicorns</div>
	              </div>
	              
	              <div class="post__summary__container">
	                <div class="post__summary">Do designers need to learn code?</div>
	              </div>
	                    <div class="post__tags__container">
	                      <ul class="post__tags">   
	                            <li>ux</li>
	                            <li>design</li>
	                            <li>code</li>
	                            <li>freelance</li>
	                            <li>unicorn</li>
	                      </ul>
	                    </div>
	              <div class="clear"></div>
	            </div>
	            <!-- end post__info -->

	          </div>
	          <!-- end post__container -->

	        </a>
	        <!-- end post link -->

	      </li>
	*/
	}
});


