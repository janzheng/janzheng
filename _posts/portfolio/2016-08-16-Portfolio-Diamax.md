---
layout: layout-post
title: Diamax Korea
summary: A light-weight, meteor-based product catalogue and CMS
<!-- external: # -->
preview-css : post-preview-std post__imgPreview--cover

<!-- image-icon: /assets/# -->
<!-- youtube: # -->
<!-- vimeo: # -->
source: /app/posts/portfolio/diamax
category : work
tags : [freelance, business analytics, design, interaction design, copywriting, development, full-stack]
published : true
comments : true
portfolio : true
---


<figure class="figure-wide">
  <img src="{{page.source}}/header.jpg">
<figcaption>Diamax Korea Homepage</figcaption>
</figure>


<div class="callout">
  <div class="callout--row">
     <span class="title">Client</span><span class="content">Diamax Korea / Diamax Inc.</span>
  </div>

  <div class="callout--row">
     <span class="title">Goal</span><span class="content">To create a simple, light-weight, and mobile-friendly product catalogue for Diamax to easily be able to update. </span>
  </div>

  <div class="callout--row">
     <span class="title">Role</span><span class="content">Information architecture, interaction design, copywriting, graphic design, front-end and back-end development</span>
  </div>

  <div class="callout--row">
     <span class="title">Agency</span><span class="content">Freelance</span>
  </div>

  <div class="callout--row">
     <span class="title">Technology</span><span class="content">React, Meteor, SASS</span>
  </div>

  <div class="callout--row">
     <span class="title">Links</span>
     <span class="content">
      <div><a href="http://diamaxkorea.com">Diamax Korea</a></div>
      <div><a href="http://diamaxinc.com">Diamax Inc.</a> (parent site and inspiration)</div>
    </span>
  </div>

</div>


## Introduction

Diamax approached me to create a tool for their sister company Diamax Korea. The tool was to be simple to use for both administrators and users, as it would be an important asset for salespeople, resellers, and engineers traveling through tradeshows and showing off products to potential customers. 


<figure class="figure-wide margin_bottom">
  <img src="{{page.source}}/sketch1.jpg">
<figcaption>Initial conceptual sketch</figcaption>
</figure>


## Choosing a Technology

To tackle this seemingly gargantuan project (I'm still not sure how I agreed to do this single-handedly, with only a deadline of a month and a half), I decided to use the most rapid prototyping technology I knew – [Meteor](http://meteor.com). Meteor combines front-end with its templating tool Blaze, and a very easy to manage back-end built on Node and MongoDB.

<figure class="figure-wide margin_bottom">
  <img src="{{page.source}}/meteorreact.png">
<figcaption>Meteor + React</figcaption>
</figure>

I knew that this app wouldn't need to be database heavy, and only a small handful of admins would have access to edit the database, so I knew I could trust MongoDB despite its known scaling issues. I had also had previous experience with Meteor as I used it to build my speedwriting app [Nanowrito](/blog/2014/02/nanowrito.html).

I also yearned to learn Facebook's new front-end tool React, and had discovered it was now supported by Meteor. This would be the perfect opportunity to learn to implement and integrate React with Meteor.






## Design

The business and design requirements were straightforward. I already had a [parent site](http://diamaxinc.com) and physical product catalogue materials, though I did reorganize and categorize product information to be more flexible yet indexable and future proof.

<figure class="figure-wide figure-frame margin_bottom_x2 ">
  <div class="royalSlider rsMinW show-adjacent slider royal-500">
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/wf_home.png" alt="" >
      <div class="rsCaption">Home page wireframe</div>
      <img src="{{page.source}}/wf_home_sm.png" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/wf_notes.png" alt="" >
      <div class="rsCaption">Product organization and information architectyre.</div>
      <img src="{{page.source}}/wf_notes_sm.png" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/wf_products.png" alt="" >
      <div class="rsCaption">Product grid wireframe</div>
      <img src="{{page.source}}/wf_products_sm.jpg" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/wf_product.png" alt="" >
      <div class="rsCaption">Single product page wireframe.</div>
      <img src="{{page.source}}/wf_product_sm.png" class="rsTmb" />
    </div>
  </div>
</figure>

The site itself was to be very simple, with as few fluff elements as possible. The main focus would be on the categorization and the display of products. We decided that a list of products would need to be easily filtered, as their products would grow over time.

Many small design and engineering tweaks have been added to increase the usability of the tool. For example, to offset the drawbacks of a React/Meteor single page app, I've added URL variables, simple filenames and URL product slugs to make filters, searches, and products really easy to share and favorite. Interactive elements and text is larger and checked with the [WebAIM](http://webaim.org/resources/contrastchecker/) color contrast checker

<figure class="figure-wide margin_bottom">
  <img src="{{page.source}}/product_1_half.png">
<figcaption>Lots of filter options</figcaption>
</figure>


## Developing a Style 

I developed a color palette and typographic system for Diamax Korea inspired from the parent site and Diamax's online videos. The idea was to create a reserved yet modern feel that felt strong and trustworthy. 

<figure class="figure-wide margin_bottom">
  <img src="{{page.source}}/guide_small.jpg">
<figcaption>Part of the Design Spec</figcaption>
</figure>

The style is large and simple, with a design for high contrast, and responsively designed for mobile and tablet use. The product page is similarly restrained and ascetic, avoiding the lines and shadows from the parent site in an effort to be "cleaner." These pages should be able to stand alone as product references. The contents are generated from the database, and the descriptor areas and spec table are generated from markdown. 

<figure class="figure-wide margin_bottom_x2">
  <img src="{{page.source}}/product.jpg">
<figcaption>Product Page with Mock Data</figcaption>
</figure>


## Power to the Admin

The real utility of the Diamax Korea site is the ease and flexibility for Diamax to edit categories, products, site content, and uploaded files. The system entirely relies on Meteor, MongoDB, and Mongo GridFS. Although reactivity is nice, it's not necessarily a requirement– though using React and Meteor does make everything blazingly fast. 

<figure class="figure-wide figure-frame margin_bottom_x2 ">
  <div class="royalSlider rsMinW show-adjacent slider royal-800">
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/edit_content.jpg" alt="" >
      <div class="rsCaption">Editing static content like the homepage background, the about page, other settings</div>
      <img src="{{page.source}}/edit_content_sm.jpg" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/edit_categories.jpg" alt="" >
      <div class="rsCaption">Creating, editing, and sorting new categories of products. The order of categories is very important.</div>
      <img src="{{page.source}}/edit_categories_sm.jpg" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/edit_category.jpg" alt="" >
      <div class="rsCaption">Individual categories lets admins "link" various products to this category. The linking was determined to potentially not be a one to one map, so admins could check off which products to add.</div>
      <img src="{{page.source}}/edit_category_sm.jpg" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/edit_products.jpg" alt="" >
      <div class="rsCaption">Individual categories lets admins "link" various products to this category. The linking was determined to potentially not be a one to one map, so admins could check off which products to add.</div>
      <img src="{{page.source}}/edit_products_sm.jpg" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/edit_posts.jpg" alt="" >
      <div class="rsCaption">Posts are like tiny, ephemeral blog posts that appear on the homepage. These are used for announcements and such.</div>
      <img src="{{page.source}}/edit_posts_sm.jpg" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/edit_post.jpg" alt="" >
      <div class="rsCaption">Each post is edited like a blog post, with a title and markdown. They can be as long or as short as the admin likes.</div>
      <img src="{{page.source}}/edit_post_sm.jpg" class="rsTmb" />
    </div>
    <div class="rsContent">
      <img class="rsImg" src="{{page.source}}/edit_files.jpg" alt="" >
      <div class="rsCaption">The File Manager is a simple but quick and effective view for admins to see where files are assigned, and delete files if needed.</div>
      <img src="{{page.source}}/edit_files_sm.jpg" class="rsTmb" />
    </div>
  </div>
</figure>


## Conclusion

The site has just been launched, and the client is hard at work populating the database with category and product information. When we first had agreed to build the app, they admitted to little to no technical background, and they frankly didn't want to learn a new complicated interface (like their previous one), write in HTML, or deal with the frustrations of a Wordpress. Even though I settled with Markdown as a content editor, they seem to quickly be able to grasp writing in Markdown.

As they start gearing up for sales season, this light-weight custom product CMS will provide a tremendous utility for their future operations.



