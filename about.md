---
layout: layout-shell
title: Hello there
source: /app/posts/about
---


<div class="about--intro">
  <figure class="figure-circle">
  <img src="{{page.source}}/teal_tie_sm.png">
  </figure>
  <h1 class="h1--display">Hello,</h1>
  <!-- <h4 class="aboutQuote">stay a while, and listen</h4> -->
</div>

<p class="dropcap margin_top">
  My name is Jan (pronounced "yawn") and I design and build functional, useful, and meaningful services and experiences. Lately I've been focusing on <em>online communities</em>, <em>responsive sites</em>, and <em>creative apps</em>.
</p>
<!-- 
<blockquote class="blockquote--aboutme blockquote--wide blockquote--noQuotes"> -->
I am currently *freelancing* and *floating in and around Atlanta* looking for collaborators to work on *civic* or *hard-to-tackle startup projects*.

I am also willing to relocate, travel, and work remotely.
If you'd like to work together, <a href="mailto:hello@janzheng.com">send me an email</a>. You could also <a href="https://twitter.com/janistanian">tweet</a> or <a href="http://www.linkedin.com/in/janzh">find me on linkedin</a>.

Take a look at <a href="/resume.pdf">my résumé</a>.

<!-- </blockquote> -->

## Work & Experience 

I've had the luxury of working with some amazing companies and clients, including **Coca-Cola**, **L'Oreal / Garnier**, **Verizon Wireless**, **Home Depot**, **Nespresso**, and **Cartoon Network**.

I have also worked on the client side with **Ubiquiti Networks**, **Microsoft**, **Lockheed Martin**, **Arbitron**, and others. 



<!-- .list class is necessary for the list.js sorter -->

<span id="work"></span>

## Portfolio 

Here's a small sample of projects I've worked on.

<div class="container" >
<div class="page" >
<ul class="list about-list">
{% for post in site.posts %}
{% if post.published == true %} 
{% if post.category == 'work' %}

  <li class="post {% if post.featured %} post--featured {% endif %}">

    <a class="about-link" href="{% if post.external %} {{ post.external }} {% else %} {{ post.url }} {% endif %} ">
      <div class="post__container {{ post.preview-css }} {% if post.preview-img == nil %} post__imgPreview--noImg {% else %} post__imgPreview" data-bg="{{ post.preview-img }} {% endif %}">

        <div class="post__info">

          <div class="post__date__container">
            <div class="post__date">{{ post.date | date: "%Y" }}</div>
          </div>

          <div class="post__title__container">
            <div class="post__title">{{ post.title }}</div>
          </div>

          {% if post.summary %}
          <div class="post__summary__container">
            <div class="post__summary">{{ post.summary }}</div>
          </div>
          {% endif %}


          <div class="clear"></div>
        </div>
      </div>
    </a>
  </li>
{% endif %}
{% endif %}
{% endfor %}

</ul>
</div>
</div>



## Background 

<div class="timeline">

  <div class="timeline__list">

    <div class="sticky-item" >
      <div class="timeline__year sticky-content">2016</div>
    </div>

    <div class="timeline__item expandablejs">
      <div class="timeline__preview">
        <div class="timeline__headline">
          <span class="timeline__client">Freelance</span>
          <div>
            <span class="timeline__title">Design &amp; Development</span>
            <span class="timeline__location">Anywhere</span>
            <span class="timeline__date">2016</span>
          </div>
          <div class="timeline__desc">I improve usability, understandability and visual design for mobile, web, and desktop applications with a user-centered slant. I'm also developing and designing custom web apps. </div>
        </div>
      </div>
    </div>

  </div>


  <div class="timeline__list">

    <div class="sticky-item" >
      <div class="timeline__year sticky-content">2014</div>
    </div>

      <div class="timeline__item expandablejs">
        <div class="timeline__preview expandablejs--preview">
          {% include expandablejs--expander.html %} 
          <div class="timeline__headline">
            <span class="timeline__client">Ubiquiti Networks</span>
            <div>
              <span class="timeline__title">User Experience Architect</span>
              <span class="timeline__location">Atlanta, GA</span>
              <span class="timeline__date">2014 &mdash; 2016</span>
            </div>
            <div class="timeline__desc">
              I defined requirements, build site maps and create wireframes, as well as design, prototype, and develop the front-end user interfaces.
            </div>
          </div>
        </div>

        <div class="timeline__full expandablejs--full">
          <p>At Ubiquiti Networks I designed and developed new customer-facing support and community tools that was supposed to launch in the Spring of 2016. The project was unfortunately cut a couple of weeks before we launched public beta.</p>
        </div>
      </div>

    <div class="timeline__item expandablejs">
      <div class="timeline__preview">
        <div class="timeline__headline">
          <span class="timeline__client">LaunchKitten</span>
          <div>
            <span class="timeline__title">Startup</span>
            <span class="timeline__location">Atlanta, GA</span>
            <span class="timeline__date">2014</span>
          </div>
          <div class="timeline__desc">Product design, front-end design and development on a startup project jumpstarted by <a href="http://www.switchyards.com">Switchyards</a>.</div>
        </div>
      </div>
    </div>

  </div>

  <div class="timeline__list">

    <div class="sticky-item" >
      <div class="timeline__year sticky-content">2012</div>
    </div>

    <div class="timeline__item expandablejs">
      <div class="timeline__preview expandablejs--preview">
        {% include expandablejs--expander.html %} 
        <div class="timeline__headline">
          <span class="timeline__client">Nurun</span>
          <div>
            <span class="timeline__title">Sr. User Experience Architect</span>
            <span class="timeline__location">Atlanta, GA</span>
            <span class="timeline__date">2012 - 2014</span>
          </div>
          <div class="timeline__desc">User experience, business analysis, product design, and prototyping </div>
        </div>
      </div>

      <div class="timeline__full expandablejs--full">
        <p>At Nurun, I bring client projects to life. I help define project scope, functionality, research, and other needs, and help determine the feasibility and schedule. I translate requirements into a tangible experience with flow diagrams, site maps, wireframes, and prototypes, and work with our designers and the technical team to realize the product.</p>

        <p>Lately I've focused on creating a creative and wireframe presentation tool, and a more flexible, agile proess flow that emphasizes earlier research, user experience, and integration among departments.</p>

        <p>Clients include Nespresso, Assuthought, Manheim, The Home Depot, GE Energy, and Disney.</p>
      </div>
    </div>

    <div class="timeline__item expandablejs">
      <div class="timeline__preview expandablejs--preview ">
        {% include expandablejs--expander.html %} 
        <div class="timeline__headline">
          <span class="timeline__client">Freelance</span>
          <div>
            <span class="timeline__title">Design &amp; Development</span>
            <span class="timeline__location">Atlanta, GA</span>
            <span class="timeline__date">2012</span>
          </div>
          <div class="timeline__desc">Sometimes I take on smaller side projects. Here are a few:</div>
        </div>
      </div>

      <div class="timeline__full expandablejs--full">
        <ul>
          <li>Designed and built <a href="http://www.upowerfitness.com">upower fitness</a>, a local a boutique gym and personal fitness concept.</li>
          <li><a href="http://gigagen.com/">GigaGen</a> IA, UX, and wirefames for a DNA sequencing tool through <a href="https://www.5amsolutions.com/">5am Solutions</a></li>
          <li>Built <a href="http://www.GodandTDM.com">God and The Drum Maschine</a> for an Atlanta-based artist and musician </li>
          <li>Helped <a href="http://www.callanwolde.com">Callanwolde Fine Arts Center</a> with Wordpress migration and form design </li>
          <li>Built a quick landing page for <a href="http://www.liztic.com">liztic</a>:, a cloud-based music-syncing service </li>
          <li>Helped an Atlanta-based artist build her landing page for her personal store at <a href="https://www.facebook.com/Foxboxes">FoxBoxes</a></li>
        </ul>

      </div>
    </div>
  </div>



  <div class="timeline__list">

    <div class="sticky-item" >
      <div class="timeline__year sticky-content">2010</div>
    </div>

    <div class="timeline__item expandablejs">
      <div class="timeline__preview expandablejs--preview">
        {% include expandablejs--expander.html %} 
        <div class="timeline__headline">
          <span class="timeline__client">Moxie</span>
          <div>
            <span class="timeline__title">User Experience Architect</span>
            <span class="timeline__location">Atlanta, GA</span>
            <span class="timeline__date">2010 - 2012</span>
          </div>
          <div class="timeline__desc">UX Architect for projects including Cartoon Network Mobile and Verizon Wireless</div>
        </div>
      </div>

      <div class="timeline__full expandablejs--full">
        <p>As a user experience architect, I translated client and business requirements into user flows, site maps, wireframes and technical specs. I developed wireframes, concepts, and functional prototypes, and worked with developers and designers to establish website and app functionality, user flow, information architecture.</p>
        
        <ul>
          <li>Established requirements and functionality through userflows, wireframes, information architecture charts, sitemaps, and other documentation.</li>
          <li>Explored design concepts through wireframes, paper, and functional prototypes.</li>
          <li>Participated in campaign concepting and strategy, and provided consultation, market research, and research into pitches and projects.</li>
          <li>Provided UX-focused QA, design direction, and feedback.</li>
        </ul>

        <ul>
          Clients include:
          <li><span class="style--highlight">Cartoon Network Mobile</span>: Designed new interface and information architecture for Cartoon Network mobile site. (2011)</li>
          <li><span class="style--highlight">Coca Cola</span>: Site design for Live Positively, Nestea, and various campaigns.</li>
          <li><span class="style--highlight">Verizon Wireless</span>: Shopping cart and phone purchase funnel, Verizon Developer Center, and many holiday campaigns and apps.</li>
          <li><span class="style--highlight">Garnier</span>: Many of the apps on Garnier.com including the Style Finder</li>
          <li>Other clients include BBC America, AMDRO, Pennington Seed, and Autotrader</li>
        </ul>

      </div>
    </div>

  </div>



  <div class="timeline__list">

    <div class="sticky-item" >
      <div class="timeline__year sticky-content">2009</div>
    </div>

    <div class="timeline__item expandablejs">
      <div class="timeline__preview">
        <div class="timeline__headline">
          <span class="timeline__client">Carnegie Mellon University</span>
          <div>
            <span class="timeline__title">Masters in HCI</span>
            <span class="timeline__location">Pittsburgh, PA</span>
            <span class="timeline__date">2009 - 2010</span>
          </div>
          <div class="timeline__desc">Earned a Masters in Human-Computer Interaction degree, which comprised of a combination of classes in interaction design methodologies, user research, interactive prototyping, and design. Relevant Coursework include HCI Project Course, HCI Methods Course, Service Design, Interaction Design, Software Architecture and User Interfaces, and Game Design (at the Entertainment Technology Center)</div>
        </div>
      </div>
    </div>

  </div>


  <div class="timeline__list">

    <div class="sticky-item" >
      <div class="timeline__year sticky-content">2004</div>
    </div>

    <div class="timeline__item expandablejs">
      <div class="timeline__preview">
        <div class="timeline__headline">
          <span class="timeline__client">University of Maryland, Baltimore County</span>
          <div>
            <span class="timeline__title">Computer Science &amp; Psychology</span>
            <span class="timeline__location">Catonsville, MD</span>
            <span class="timeline__date">2004 - 2009</span>
          </div>
          <div class="timeline--list-item--headline--short">I received an bachelor's in computer science, with a minor in psychology, where I both took classes and worked with both the cognitive and behavioral labs. My degree focused on game development, and game design including graphics, artificial intelligence, and algorithms. Our capstone project was an experimental strategy game built on Gamebryo.</div>
        </div>
      </div>
    </div>

  </div>

<!-- end timeline -->
</div>




## More text!

I've always had a fascination with learning, doing, and experimenting, and my experiences span across psychology, user research, design, and coding. I frequently use Sketch, Axure, Adobe, and other design and productivity tools. After quickly defining an approach, I prefer to create tangible examples by prototyping them in HTML, JavaScript and SASS/CSS. I am also familiar with anything from C to Processing.

My eclectic background mirrors my eclectic upbringing. Though born in China, I moved to Stockholm at a young age. I am fluent in English and Swedish, and am conversational in Mandarin.

I hold dual citizenship with both the United States and Sweden, which means that I could easily work in and out of the U.S. and countries within the European Union.

On my off days, I enjoy swing dancing, circusing, rock climbing, playing indie games, and cooking / stuffing my face with tasty foods.

## About This Site

For the second round of redesign, I wanted to reduce the number of artifacts on the page, like shapes and outlines, and take a more typographic, minimalist approach. Any shapes and lines are only used to accentuate the information I'm presenting, with enough white space to prevent clutter. 

The goal is to reflect my design ideology: reduce shiny, fluff elements that distract from the main design goal. In my case, it's presenting my work. If you think my portfolio doesn't look fancy, pretty, or "cool" enough, then we are probably not a good fit to begin with.

This site has gone through many variations, and every iteration has seen improvement. The site is built on the static site generator [Jekyll](https://github.com/mojombo/jekyll) and is hosted completely for free on [Github Pages](https://github.com/janzheng/janzheng.github.com).

The front-end styling was written in SASS, with the help of [bourbon.io](http://bourbon.io/) and [Neat](neat.bourbon.io).

Icons are sourced from [IconMonstr](http://iconmonstr.com/) and <a href="http://www.flaticon.com" title="Flaticon">Flaticon.com</a>

Cheers,
<br/> Jan





