---
title: Intro
type: styleguide
layout: styleguide
name: intro
section: about
---


<main markdown="1">

# Welcome,




## Naming Convention

Naming convention is inspired BEM and exists to keep all elements and components organzied. These are not hard and fast rules, and they may even be broken sometimes... but it's good to have some semblance of organization.


### Naming
- ```element``` Element class name like ".form_one" or ".message_cta" 
- ```_component``` Styling component like Button, Form, etc. denoted with a leading underscore
- ```_component_name_one``` Long multi-word names uses underscore 
- ```_component--attribute``` Attributes are descriptors of the element or the component, like a 'container' or  'element--intro' to describe a certain part. Sometimes naming can feel 'flipped' for example a sub-footer would be named 'footer--sub'
- ```_component-minor-cascading-attribute``` Cascading attributes are denoted with a simple dash. ```._color-bg-yellow``` defines a color component, the effect (bg), and yellow, or ```._font-sans``` defines a font component, sans-serif. I guess this follows the French way of following a noun with adjectives. (It's my preference!)
- ```--state``` States describe the component or element, and are "floating" - in BEM these are ```.button--state-success``` but I prefer separating state from the element or component. This way you can reuse the --state flag for different elements and components, like ```._form --success``` and ```._button --success```


### HTML

- ```<Element class="element _component_name --state_1 --state_2 />```

### Tips
- using the `-` dash to separate names and descriptors helps with double-click selecting the entire name, whereas underscores are included in the selection, dashes are not. The original BEM syntax ```.my-component__list-item``` is annoying b/c double clicking the component name selects the wrong parts of the name. Instead, give it the name of ```.my_component--list_item``` allows you to select the right parts with a simple double-click
- In your SCSS, avoid the use of &--state as much as possible, as these are hard to search for with cmd-f
- Keep reusability and extensibility in mind





Other style guides:

- [Trello](https://design.trello.com/)
- [Mailchimp](https://ux.mailchimp.com/)

</main>

