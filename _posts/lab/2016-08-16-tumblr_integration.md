---
layout: layout-post
title: How to Embed Tumblr Without a Server (updated)
summary: How to easily add Tumblr to a static site, without PHP, a server, or any server-side code

source: /app/posts/idea/tumblr-integration
<!-- preview-img : /app/posts/tinder-dating-app/preview2.png -->
preview-css : post-preview-std 

<!-- external: # -->
<!-- youtube: # -->
<!-- vimeo: # -->

<!-- categories: idea, lab, rant, tool, portfolio -->
category : lab
tags : [code, javascript]

published : true
portfolio : false
comments : true
featured : false
type: blog
---

<!-- http://stackoverflow.com/questions/8264446/jquery-ajax-tumblr-api-v2 -->
<p class="alert">Edit: I had to quickly mention that their API v2 has both an AJAX and a non-AJAX way of retrieving posts <a href="http://stackoverflow.com/questions/8264446/jquery-ajax-tumblr-api-v2">as detailed here</a></p>

<p class="dropcap">I have recently started <a href="http://ja-nz.tumblr.com">funkability</a> (edit: now ja-nz), a Tumblr usability and interaction design feed I'll probably get around to updating twice a year. [Edit 1/7/2014: my predictions were spot on!] [Edit 8/16/2016: still spot on, two years later!]</p>

More interested in the engineering aspects than posting, I've decided to fully integrate my tumblr feed into my blog. This was more difficult than expected, since many solutions on Stack Exchange involve using server-side scripting (PHP). Because this site is hosted on Github, I don't have access to a server, or server-side scripting.

So, here's how to get a fully-customizable Tumblr feed on your site, with no PHP.

## Method 1: Simple Embed

The easiest way to integrate a tumblr blog into a website is covered in [adrifolio's article](http://adrifolio.tumblr.com/post/487702548/how-to-embed-tumblr-on-your-website-and-customize-it):



{% highlight html linenos %}

<script type="text/javascript" src="http://ja-nz.tumblr.com/js"></script>

{% endhighlight %}



Add the above code anywhere in your HTML file, and an HTML-formatted tumblr dump will appear on your site. You can then style the output with CSS.

[Here's what the tumblr dump looks like]({{page.source}}/tumblr-integration.html)

It's ok if you only want a simple feed on your site, but the output is inflexible and hard to work with. You can't easily customize the output, you don't get meta-data, and can't easily add controls like pagination or infinite scroll to this content.



## Method 2: The Server-Side 

There's another way to get your Tumblr data: through the Tumblr API. Finlay covers this method [in his article](http://finlay.tumblr.com/post/529010691/embed-tumblr-into-your-website). The idea is that you can retrieve an XML feed by using the following:


{% highlight html linenos %}

http://ja-nz.tumblr.com/api/read
http://ja-nz.tumblr.com/api/read?start=0&num=1
http://ja-nz.tumblr.com/api/read?start=0&num=1&type=text

{% endhighlight %}

Much better! Your feed is returned in a neatly formatted XML file. Great! You even get to select what and how many posts are returned! I seriously got excited... until I saw: "So, using SimpleXML in PHP, we can tell our PHP look through for that tag, and then return its entire contents."

Well, drats. I'm hosting my site on Github, which isn't exactly a full-featured web host (that's what I get for being cheap). Github doesn't have any server-side scripting enabled, so the many solutions in blogs and on StackExchange to use a server to proxy the tumblr XML won't work for me. 

I can't use JS to request the feed, because it's sitting on another domain (it'll give you a cross-domain error). 

So how do we get around this "small" problem of not having PHP? Well, turns out the answer was on Tumblr's API site the entire time.



## The Better Way:


Apparently, in addition to Finlay's method, [Tumblr has a way to return a JSON-formatted feed](http://www.tumblr.com/docs/en/api/v1).
Add the following script to the end of the @<head>@ section of your website, replacing 'username' with your tumblr username:

{% highlight html linenos %}

<pre class="prettyprint"><script type="text/javascript" src="http://username.tumblr.com/api/read/json"></script>
</pre>

{% endhighlight %}



This snippet assigns a JSON object of your entire blog to a new variable called 

{% highlight html linenos %}tumblr_api_read{% endhighlight %} Cool! Here's [the JSON output of my blog](http://ja-nz.tumblr.com/api/read/json/). Notice how we have a much richer set of metadata using this method.

With this variable, you can now easily extract and control your posts. For example, you can extract the link to your most recent post with 

{% highlight html linenos %}tumblr_api_read['posts'][0]['url']{% endhighlight %}

Here's the example code. After you've inserted the previous code at the end of @<head>@, insert the following code anywhere you want your link to show up.



{% highlight html linenos %}

<script type="text/javascript">
    // The variable "tumblr_api_read" is now set to your tumblr feed.
    document.write(
        '<a href="' + tumblr_api_read['posts'][0]['url'] + 
        '">My most recent Tumblr post</a>'
    );
</script>

{% endhighlight %}




As an example, here is a link dynamically pulled in from Tumblr

{% highlight html linenos %}

<script type="text/javascript" src="http://ja-nz.tumblr.com/api/read/json"></script>
<script type="text/javascript">
document.write('<a href="' + tumblr_api_read['posts'][0]['url'] + '">my most recent Tumblr post.</a>');
</script>

{% endhighlight %}


And there you go. You now have full access to modify, style, and control your Tumblr feed, using only Javascript, and not an ounce of PHP or server-side. 

