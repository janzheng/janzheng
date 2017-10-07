---
title: Stylecoeur
type: styleguide
layout: styleguide
name: stylecoeur
section: about
---

<main markdown="1">

# Philosophy

The idea behind this style guide and the 'framework' is to bring together a group of useful tools to make prototyping or development both quick and look professional. This is a speed-first, readability-second approach, which lends to easy prototyping and spitting out new good-looking pages. It might not work as well as an enterprise app.

Everything is put together to be as quickly understandable and deployable as possible, hence the modified "BEM" styling. These are implemented as loose rules-of-thumb, and not hard rules.

## Stylecoeur

The base framework is called `stylecoeur` and offers a wide variety of core SCSS systems to build on, like responsive variables, colors, buttons, and so on.

The base file is `stylecoeur/index.scss` and links together all the various parts, while the main settings file is `stylecoeur/_heart.scss`.

There are three different types of subsections: `stylecoeur/arteries` provide the core dependencies, like typography, color, animation mixins, and grids. The second subsection is `stylecoeur/vessels` and provides helpers like links, cards, and buttons. The third subsection is the more vanilla `stylecoeur/components` and is meant to provide a very basic framework of useful components like footer, nav, and sidebar; most of which will probably be overridden in the final versions of a project.

- Use variables for definitions and context. Definition: $color-green. Context: $color-success.
- Focus on context variables like `$color-success` as as much as you can, as the color for success could easily be swapped from green to blue without changing the color everywhere.
- Sometimes styles are easier implemented in CSS as @extends, and other times they're more quickly implemented in HTML as classes. This is why options exist for "._helperClass" so the helpers like margins and paddings can be easily added to the HTML.
- Maintain Modularity. Helpers and components should be as reusable as possible
- Every variable should be defined at the top, like colors, borders, and radii, need to be defined at top for context. This makes them a lot easier to find and redefine later


## Middleman & Kramdown

- Middleman allows for quickly reusable partials, mixed in with markdown (kramdown flavor)
- Kramdown allows for inline html, scripts, and can mix and match with Middleman ruby on rails partials

This combination creates an environment that allows very quick static site development, which is helpful for launching proofs of concepts, user tests, styleguides, and landing pages


</main>


