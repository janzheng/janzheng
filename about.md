---
layout: layout-shell
title: Hello there
source: /app/posts/about
<!-- preview-img : /app/posts/nanowrito/preview.png -->

---

<!-- use that new container vertical center code you found! -->

<div class="about--intro">
  <figure class="figure-circle">
  <img src="{{page.source}}/teal_tie_sm.png">
  <!-- <figcaption class="aboutQuote">day at the office</figcaption> -->
  </figure>


  <h1 class="h1--display">Hello,</h1>

  <h4 class="aboutQuote">stay a while, and listen</h4>
</div>

<p class="dropcap">
  My name is Jan <span class='style--light'>"yawn"</span>, and I strive to create immersive, memorable, and delightful experiences. My user-centered design approach aims to strike a balance between user needs and business goals. My projects usually focus on iterative design, prototypes, and testing, including <em>online communities</em> and <em>responsive websites</em>. I strive for my work to be immersive, elegant, and memorable. 
</p>

<div>
<a href="/resume.pdf" class="link-external btn-icon btn-inline btn-inline--large">
    <span class="icon icon--btn icon--resume"></span>Grab my résumé
</a>
</div>

<blockquote class="blockquote--wide blockquote--noQuotes"> I am currently a freelancer in <strong class="strong--loud">Atlanta</strong>, and willing to work remotely.
If you'd like to work together, <a href="mailto:hello@janzheng.com">send me an email</a>. You could also, <a href="https://twitter.com/janistanian">tweet</a>, or <a href="http://www.linkedin.com/in/janzh">link me in</a>.
</blockquote>

## Work & Experience 

I've had the luxury of working with some amazing companies and clients, including *(strong--loud)Coca-Cola*, *(strong--loud)L'Oreal / Garnier*, *(strong--loud)Verizon Wireless*, *(strong--loud)Home Depot*, *(strong--loud)Nespresso*, and *(strong--loud)Cartoon Network*. I have also seen the client-side at *(strong--loud)Microsoft*, *(strong--loud)Lockheed Martin*, *(strong--loud)Arbitron*, and a few smaller firms and startups. 



<notextile>
  <!-- .list is necessary for the list.js sorter -->
  <!-- 
  <ul class="list">
  {% for post in site.posts %}
  {% if post.published == true %} 
  {% if post.category == 'work' %}

    <li class="post {% if post.featured %} post--featured {% endif %}">

      <a href="{% if post.external %} {{ post.external }} {% else %} {{ post.url }} {% endif %} ">
        <div class="post__container {{ post.preview-css }} {% if post.preview-img == nil %} post__imgPreview--noImg {% else %} post__imgPreview" data-bg="{{ post.preview-img }} {% endif %}">

          <div class="post__info">

            <div class="post__date__container">
              <div class="post__date">{{ post.date | date: "%d %B %Y" }}</div>
            </div>

            <div class="post__title__container">
              <div class="post__title">{{ post.title }}</div>
            </div>

            {% if post.summary %}
            <div class="post__summary__container">
              <div class="post__summary">{{ post.summary }}</div>
            </div>
            {% endif %}

            {% if post.tags != null %}
              {% assign tags_list = post.tags %} 
                {% if tags_list.size > 0 %}
                  <div class="post__tags__container">
                    <ul class="post__tags">

                      {% if tags_list.first[0] == null %}
                        {% for tag in tags_list %} 
                          <li>{{ tag }}</li>
                        {% endfor %}
                      {% else %}
                        {% for tag in tags_list %} 
                          <li>{{ tag[0] }}</li>
                        {% endfor %}
                      {% endif %}
                    </ul>
                  </div>
                {% endif %}
                {% assign tags_list = nil %}
            {% endif %}

            <div class="clear"></div>
          </div>
        </div>
      </a>
    </li>
  {% endif %}
  {% endif %}
  {% endfor %}

  </ul> -->
</notextile>




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
          <div class="timeline__desc">Improving usability, understandability and visual design for mobile, web, and desktop applications with a user-centered slant. Also developing and designing custom web apps. </div>
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
              I define requirements, build site maps and create wireframes, as well as design, prototype, and develop the front-end user interfaces.
            </div>
          </div>
        </div>

        <div class="timeline__full expandablejs--full">
          <p>At Ubiquiti Networks I am currently designing and developing new customer-facing support and community tools that will launch in the Spring of 2016.</p>
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

        <p>Clients include Nespresso, Assurant, Manheim, The Home Depot, GE Energy, and Disney.</p>
      </div>
    </div>
  </div>

  <div class="timeline__list">

    <div class="sticky-item" >
      <div class="timeline__year sticky-content">2013</div>
    </div>

    <div class="timeline__item expandablejs">
      <div class="timeline__preview expandablejs--preview ">
        {% include expandablejs--expander.html %} 
        <div class="timeline__headline">
          <span class="timeline__client">Freelance Projects</span>
          <div>
            <span class="timeline__title">Freelance</span>
            <span class="timeline__location">Atlanta, GA</span>
            <span class="timeline__date">2013</span>
          </div>
          <div class="timeline__desc">Sometimes I take on smaller side projects.</div>
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




## more!

I've always had a fascination with learning, doing, and experimenting, and my experiences span across psychology, user research, design, and coding. I frequently use Sketch, Axure, Adobe, and other design and productivity tools. After quickly defining an approach, I prefer to create tangible examples by prototyping them in HTML, JavaScript and SASS/CSS. I am also familiar with anything from C to Processing.

My eclectic background mirrors my eclectic upbringing. Though born in China, I moved to Stockholm at a young age. I am fluent in English and Swedish, and am conversational in Mandarin.

I hold dual citizenship with both the United States and Sweden, which means that I could easily work in and out of the U.S. and countries within the European Union.

On my off days, I enjoy swing dancing, circusing, rock climbing, playing indie games, and cooking / stuffing my face with tasty foods.

## About This Site

For the second round of redesign, I wanted to reduce the number of artifacts on the page, like shapes and outlines, and take a more typographic, minimalist approach. Any shapes and lines are only used to accentuate the information I'm presenting, with enough white space to prevent clutter.

This site is now my umpteenth portfolio design, but every iteration has seen improvement. The site is built on the static site generator [Jekyll](https://github.com/mojombo/jekyll) and is hosted completely for free on [Github Pages](https://github.com/janzheng/janzheng.github.com).

The front-end styling was written in SASS, with the help of [bourbon.io](http://bourbon.io/) and [Neat](neat.bourbon.io).

Icons are sourced from [IconMonstr](http://iconmonstr.com/) and <a href="http://www.flaticon.com" title="Flaticon">Flaticon.com</a>

Cheers,
Jan


