---
layout: layout-post
title: Gas South Enrollment Redesign
summary: Optimized the natural gas signup and enrollment flow
<!-- external: # -->
preview-css : post-preview-std post__imgPreview--cover

<!-- image-icon: /assets/# -->
<!-- youtube: # -->
<!-- vimeo: # -->
source: /app/posts/portfolio/gas-south
category : work
tags : [work, ux, prototype]
published : true
comments : true
portfolio : no
---


<figure class="figure-wide">
  <img src="{{page.source}}/header.png">
<figcaption>Homepage prototype</figcaption>
</figure>

## Introduction

The Gas South Enrollment redesign was a massive project that spanned many months to rebrand and overhaul their dot-com site and enrollment signup flow- their main source of new clients.

Our goals were to:

* understand the needs of new customers
* usability of competitor services
* find bottlenecks of the current enrollment flow
* optimize the enrollment flow
* increase number of signups

## Establishing the Problem

<figure class="figure-wide">
  <img src="{{page.source}}/flowchart_header.png">
<figcaption>One of many enrollment flowcharts</figcaption>
</figure>

My immediate goals were to learn as much as I could about Atlanta's Natural Gas market and the consumers in the space. It turned out that it's highly competitive and non-differentiating. Basically, everyone offered almost the exact same thing for the exact same price. 

The only thing they could do was improve the process of signing up.

I looked at competitors' offerings and poured over Gas South's customer research led to breaking their signup process down to several key parts, that we wanted to test to find bottlenecks.

### Artifacts

* [initial flow notes]({{page.source}}/enrollment_flow_initial_notes.txt)

(all artifacts are developed by me unless noted)



## Requirements & Wireframes

<figure class="figure-wide">
  <img src="{{page.source}}/wireframe_header.png">
<figcaption>One of the wireframes that mapped to a flowchart</figcaption>
</figure>

Business requirements and wireframes were developed hand in hand, as each alternate flow required many iterations as I tried to develop the nuances of each enrollment flow, since information from some steps carried over to others. The flow charts and wireframes were updated to reflect not only the data and flow requirements, but also the latest copy and data required from users.

### Artifacts

* [Test 1 Flowchart (image)]({{page.source}}/enrollment_system_test_1_flow.png)
* [Notes on flow observations (image)]({{page.source}}/observations.png)
<!-- * [Full Gas South Enrollment Test Wireframes (6.7 MB PDF)]({{page.source}}/gassouth_wireframes.pdf) -->


## Wirecomps

<figure class="figure-wide">
  <img src="{{page.source}}/wirecomp.png">
<figcaption>Combination of wireframe and comp, with assets</figcaption>
</figure>

After weeks of optimizing and designing the flows, I worked with our visual designer to develop a cross between wireframes and a comp to initiate the layout design. These translated into Photoshop comps (created by a visual designer). These were needed for us to get on the same page with the client.


### Artifacts

* [Wirecomp Example]({{page.source}}/wirecomp.png)


## Prototype & Development

<figure class="figure-wide">
  <img src="{{page.source}}/prototype_header.png">
<figcaption>Prototype example</figcaption>
</figure>

After much back and forth in both the requirements, enrollment flow, and comps stage (at this point we had actually come up with a total of six testable flows), our client wanted us to develop reusable clickable prototypes for testing. 

The first one I did [was for the homepage]({{page.source}}/carousel-demo/carousel.html) – I took a homepage comp our designer had made, cut it up in photoshop, and added RoyalSlider functionality to show what the homepage carousel (this is something the client requested) would feel like. 

At this point the [prototype and development work]({{page.source}}/prototype-demo/Flow_6/flow6_business_1.html) was too much for one person, so the work got out-sourced to other developers which I guided closely so the pages didn't stray from the original flow. The point of the prototypes were not only to display demonstrate each flow, but to make the transition to development and deployment easier for our client.


<figure class="figure-wide">
  <img src="{{page.source}}/mobile_header.png">
<figcaption>Mobile prototype</figcaption>
</figure>

I had also suggested a [mobile version for our client]({{page.source}}/mobile-demo/signup.html), to capture the sizable number of users who were accessing and even forced to sign up their old non-mobile-friendly signup form (after all, many lower income families around Atlanta only have mobile access to the internet). This suggestion ended up spawning a separate mobile project, which used a modular setup with jQuery, so their developers could easily adapt to later findings frmo testing. 

Funny enough, our client ended up using most of our code in their final signup form (including my mobile signup code).


### Artifacts

* [Homepage Carousel Prototype]({{page.source}}/carousel-demo/carousel.html)
* [Gas South live site](http://www.gas-south.com/)
* [Desktop Enrollment Prototype]({{page.source}}/prototype-demo/Flow_6/flow6_business_1.html)
* [Gas South live enrollment](https://enroll.gas-south.com/flow1/WebEnrollment_UI/frmFlow1Step1.aspx)
* [Mobile Enrollment Prototype]({{page.source}}/mobile-demo/signup.html)
* [Gas South live mobile enrollment](https://m.gas-south.com/signup/signup.html)



## Conclusion

Unfortunately, we were not part of the official testing process, but they had enough of a plan, and enough variation to play with to optimize their signup. The customer life cycle in buying natural gas is very long and seasonal (and we were in the wrong season), so that work was better done internally than through an agency.

I eventually left soon after the project was wrapped up, so I didn't get to know the results (which would have taken a couple of years to go through full customer cycles) Gas South also seems to really have enjoyed our work, as most of the code base we handed over to them have been kept intact a few years after the fact. 



