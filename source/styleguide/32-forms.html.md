---
title: Forms
type: styleguide
layout: styleguide
name: forms
section: components
---


<main markdown="1">

# Forms

`_forms.scss`

Forms is a small collection of inputs and wrappers that make form inputs a little nicer to use and to look at.

Many of these _containers_ and _components_ are merelycontextual and organizational, but they will help with organizing content on the form.



Use `griddick` and other components to organize layout.


[**Form Elements**](#form-elements):

- [`input`](#input) one line text input (name, email, numbers ...)
- [`date input`](#date-input) somewhat-styled date input
- [`textarea`](#textarea) text areas for multiline text
- [`range slider`](#range-slider) single-thumb range slider
- [`radio`](#radio) radio group (single selection)
- [`checkbox`](#checkbox) yes or no selection, or multiple-selection
- [`option`](#option--multiple-select) also a dropdown list, can select one atmost
- [`selectgroup`](#option--multiple-select) select many values from a list; not ux friendly


[**Components**](#components):

- [`_form-control`](#) container for one input group, like input, label, and note
- [`_form-label`](#) form label for the input control
- [`_form-input`](#) a control like input or textarea
- [`_form-radio`](#) a control like input or textarea
- [`_form-checkbox`](#) a control like input or textarea
- [`_form-note`](#) short note under a control group to describe it
- [`_form-error`](#) inline form error messages


[**Organizational Containers**](#organizational-containers):

- [`_form-group`](#) contextual group of controls, like name and email
- [`_form-container-bg`](#) container w/ gray background, used to divide forms
- [`_form-container-outline`](#) container with outline, used to divide forms



#### Basics

Flags are used to augment input elements. Default border highlights are replaced with selectors; don't forget to style these to help with accessibility.

- `--optional` marks controls as optional
- `--required` marks controls as required 

Flags:

- `--width-full` width: 100%
- `--width-medium` width: 200px
- `--width-short` width: 100px



#### Form Elements

##### Common Examples

<div class="_styleguide-example">
<form class="" method="post">
<p><strong>Comment submission form</strong></p>
<div class="_form-control">
  <label for="ex1-email" class="_form-label">Email Address</label>
  <input id="ex1-email" class="_form-input --width-full" type="email" name="ex1-email" placeholder="Email Address" required/>
  <label class="error" for="emailAddress">Need an email address here.</label>
</div>
<div class="_form-control">
  <label for="ex1-name" class="_form-label">Name</label>
  <input id="ex1-name" class="_form-input --width-full" type="text" name="ex1-name" placeholder='Billie Holiday' />
  <label class="_form-note">Full name please! </label>
</div>
<div class="_form-control">
  <label for="description" class="_form-label">Message </label>
  <textarea rows="4" id="description" class="_form-input"  type="text" name="description" placeholder="Send me some message!" ></textarea>
</div>
<button class="_button" type="submit"> Send Message </button>
</form>
</div>
~~~
<form class="" method="post">
<p><strong>Comment submission form</strong></p>
<div class="_form-control">
  <label for="ex1-email" class="_form-label">Email Address</label>
  <input id="ex1-email" class="_form-input --width-full" type="email" name="ex1-email" placeholder="Email Address" required/>
  <label class="error" for="emailAddress">Need an email address here.</label>
</div>
<div class="_form-control">
  <label for="ex1-name" class="_form-label">Name</label>
  <input id="ex1-name" class="_form-input --width-full" type="text" name="ex1-name" placeholder='Billie Holiday' />
  <label class="_form-note">Full name please! </label>
</div>
<div class="_form-control">
  <label for="description" class="_form-label">Message </label>
  <textarea rows="4" id="description" class="_form-input"  type="text" name="description" placeholder="Send me some message!" ></textarea>
</div>
<button class="_button" type="submit"> Send Message </button>
</form>
~~~


<div class="_styleguide-example">
<form class="" method="post">
<p><strong>Sign Up or Sign In form</strong></p>
<div class="_grid-two">
  <div class="_form-control">
    <label for="ex2-fName" class="_form-label">First Name</label>
    <input id="ex2-fName" class="_form-input --width-full" type="text" name="ex2-fName" placeholder='Billie' />
  </div>
  <div class="_form-control">
    <label for="ex1-lName" class="_form-label">Last Name</label>
    <input id="ex1-lName" class="_form-input --width-full" type="text" name="ex1-lName" placeholder='Holiday' />
  </div>
</div>
<div class="_grid-two">
<div class="_form-control">
  <label for="ex2-email" class="_form-label">Email Address</label>
  <input id="ex2-email" class="_form-input --width-full" type="email" name="ex2-email" placeholder="Email Address" required/>
  <label class="error" for="emailAddress">Please enter a valid email</label>
</div>
<div class="_form-control">
  <label for="ex2-password" class="_form-label">Password</label>
  <input id="ex2-password" class="_form-input --width-full" type="password" name="ex2-password" placeholder="Password" required/>
</div>
</div>
<button class="_button" type="submit"> Sign Up </button> <span class="_form-note"> Free signup, no credit card required</span>
</form>
</div>
~~~
<form class="" method="post">
<p><strong>Sign Up or Sign In form</strong></p>
<div class="_grid-two">
  <div class="_form-control">
    <label for="ex2-fName" class="_form-label">First Name</label>
    <input id="ex2-fName" class="_form-input --width-full" type="text" name="ex2-fName" placeholder='Billie' />
  </div>
  <div class="_form-control">
    <label for="ex1-lName" class="_form-label">Last Name</label>
    <input id="ex1-lName" class="_form-input --width-full" type="text" name="ex1-lName" placeholder='Holiday' />
  </div>
</div>
<div class="_grid-two">
<div class="_form-control">
  <label for="ex2-email" class="_form-label">Email Address</label>
  <input id="ex2-email" class="_form-input --width-full" type="email" name="ex2-email" placeholder="Email Address" required/>
  <label class="error" for="emailAddress">Please enter a valid email</label>
</div>
<div class="_form-control">
  <label for="ex2-password" class="_form-label">Password</label>
  <input id="ex2-password" class="_form-input --width-full" type="password" name="ex2-password" placeholder="Password" required/>
</div>
</div>
<button class="_button" type="submit"> Sign Up </button> <span class="_form-note"> Free signup, no credit card required</span>
</form>
~~~

<div class="_styleguide-example">

<script>
  function huh(e) {
    var what = document.getElementById("ex3-search").value;
    if(what === 'taken' || what === 'Taken') {
      document.getElementById("ex3-btn").innerHTML = "Certain Skills...";
    }
  }
</script>

<p><strong>Search bar &amp; filter list with results</strong></p>
<div class="_grid-two">
  <aside class="_form-container-outline">
    <form class="" method="post">
      <div class="_form-control _margin-bottom">
        <label for="ex3-search" class="_form-label">Movie Name</label>
        <input id="ex3-search" oninput="huh()" class="_form-input --width-full" type="text" name="ex3-search" placeholder="Taken" required/>
      </div>
      <div class="_form-control  _margin-bottom">
        <div class="_form-checkbox --inline">
          <label for="isGood">
            <input id="isGood" type="checkbox" name="isGood" />
            <span for="isGood">Good ones</span>
          </label>
          <label for="isBad">
            <input id="isBad" type="checkbox" name="isBad" />
            <span for="isBad">Terrible ones</span>
          </label>
        </div>
      </div>
      <div class="_form-control ">
        <div class="_form-slider">
          <label for="rangeSlider" class="_form-label">Score </label>
          <input id="rangeSlider" type="range" value="100" min="0" max="500" />
        </div>
      </div>
      <button id="ex3-btn" class="_button --width-full _margin-none" type="submit"> Search </button>
    </form>
  </aside>
  <main>

    <div>
      Main results panel over here
    </div>
  </main>
</div>
</div>




##### Input 

Basic input form

<div class="_styleguide-example">

<div class="_form-control --optional">
  <label for="textInput" class="_form-label">Text Input <span class="_font-small">- optional</span></label>
  <input id="textInput" class="_form-input" type="text" name="textInput" placeholder='Some text' />
</div>

<div class="_form-control">
  <label for="textSearch" class="_form-label">Icon Input</label>
  <label for="textSearch" class="_form-label-icon"><i class="fa fa-search"></i></label>
  <input id="textSearch" class="_form-input --width-medium" type="text" name="textSearch" placeholder='Search term here' />
</div>


<div class="_form-control --optional">
  <label for="textInput" class="_form-label">Input with Button</label>
  <input id="textInput" class="_form-input --button" type="text" name="textInput" placeholder='Email Address' />
  <button class="_button _button-input">Sign Up</button>
</div>

<div class="_form-control">
  <label for="textInputDisabled" class="_form-label">Text Input <span class="_font-small">- disabled</span></label>
  <input id="textInputDisabled" class="_form-input " type="text" name="textInputDisabled" placeholder='Can’t touch this' disabled />
</div>

<div class="_form-control">
  <label for="email" class="_form-label">Email Address <span class="_font-small">--width-full</span></label>
  <input id="email" class="_form-input --width-full" type="email" name="email" placeholder="Email Address" required/>
  <label class="_form-note">Extra note here </label>
</div>

<div class="_form-control">
  <label class="_form-label">Password <span class="_font-small">--width-medium</span></label>
  <input id="password" class="_form-input --width-medium" type="password" name="password" placeholder="Password" required/>
</div>

<div class="_form-control">
  <label class="_form-label">Number <span class="_font-small">--width-short</span></label>
  <input id="year" class="_form-input" type="number" name="year" placeholder='123' class="--width-short" />
</div>

</div>

~~~
<div class="_form-control --optional">
  <label class="_form-label">Text Input <span class="_font-small">- optional</span></label>
  <input id="year" class="_form-input" type="text" name="year" placeholder='Some text' />
</div>

<div class="_form-control">
  <label class="_form-label">Text Input <span class="_font-small">- disabled</span></label>
  <input id="year" class="_form-input" type="text" name="year" placeholder='Can’t touch this' disabled />
</div>

<div class="_form-control">
  <label class="_form-label">Email Address <span class="_font-small">--width-full</span></label>
  <input id="email" class="_form-input --width-full" type="email" name="email" placeholder="Email Address" required/>
  <label class="_form-note">Extra note here </label>
</div>

<div class="_form-control">
  <label class="_form-label">Password <span class="_font-small">--width-medium</span></label>
  <input id="password" class="_form-input --width-medium" type="password" name="password" placeholder="Password" required/>
</div>

<div class="_form-control">
  <label class="_form-label">Number <span class="_font-small">--width-short</span></label>
  <input id="year" class="_form-input" type="number" name="year" placeholder='123' class="--width-short" />
</div>
~~~

File inputs are supported as well. 

- `--loading` and `--success` can be attached to file input

<div class="_styleguide-example">
  <div class="_form-control _margin-none">
    <input id="fileInput" type="file" />  
    <label for="fileInput" class="_form-input-file _button _button-short " >
      Upload File
    </label> 
  </div>
  <div class="_form-control _margin-none">
    <input id="fileInput" type="file" />  
    <label for="fileInput" class="_form-input-file _button _button-short --loading " >
      Upload File (loading)
    </label> 
  </div>
  <div class="_form-control _margin-none">
    <input id="fileInput" type="file" />  
    <label for="fileInput" class="_form-input-file _button _button-short --success" >
      Upload File (success)
    </label> 
  </div>
</div>

~~~
<div class="_form-control">
  <input id="fileInput" type="file" />  
  <label for="fileInput" class="_form-input-file _button _button-short " >
    Upload File
  </label> 
</div>

<div class="_form-control">
  <input id="fileInput" type="file" />  
  <label for="fileInput" class="_form-input-file _button _button-short --loading " >
    Upload File (loading)
  </label> 
</div>

<div class="_form-control">
  <input id="fileInput" type="file" />  
  <label for="fileInput" class="_form-input-file _button _button-short --success" >
    Upload File (success)
  </label> 
</div>
~~~



##### Date Input

Dates are kind of terrible (zing!). Support is shaky at best, and kind of only available on mobile devices. Use custom date solutions if possible, but make sure mobile browsers always use the mobile browser default. [More info here](http://html5doctor.com/the-woes-of-date-input/)

All the regular input skin options apply to date, whenever possible. Also make sure to validate, and return useful, descriptive errors.

<div class="_styleguide-example">
  <div class="_form-control">
    <label for="when">Date:</label>
    <input id="when" name="when" type="date">
  </div>
  <div class="_form-control">
    <label for="when">Dates limited to 2016:</label>
    <input id="when" name="when" type="date" min="2016-01-01" max="2016-12-01">
  </div>
</div>
~~~
<div class="_form-control">
  <label for="when">Date:</label>
  <input id="when" name="when" type="date">
</div>
<div class="_form-control">
  <label for="when">Date:</label>
  <input id="when" name="when" type="date" min="2016-01-01" max="2016-12-01">
</div>
~~~




##### Textarea 

<div class="_styleguide-example">

  <div class="_form-control">
    <label for="description" class="_form-label">Text area block </label>
    <textarea rows="4" id="description" class="_form-input"  type="text" name="description" placeholder="Text area placeholder goes here" ></textarea>
  </div>

</div>

~~~
<div class="_form-control">
  <label for="description" class="_form-label">Text area block </label>
  <textarea rows="4" id="description" class="_form-input"  type="text" name="description" placeholder="Text area placeholder goes here" ></textarea>
</div>
~~~




##### Range Slider

Range sliders come with a lot of variations. [Check out the spec here.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)

Multi-handle sliders are not natively supported, but many plugins exist. Feel free to adapt the `_forms.scss` styling to the plugin.

<div class="_styleguide-example">
  <div class="_form-control">
    <div class="_form-slider">
      <label for="rangeSlider" class="_form-label">Range Slider </label>
      <input id="rangeSlider" type="range" value="100" min="0" max="500">
    </div>
  </div>
  <div class="_form-control">
    <div class="_form-slider">
      <label for="rangeSlider2" class="_form-label">Range Slider w/ notches </label>
      <input id="rangeSlider2" type="range" value="250" min="0" max="500" step="50">
    </div>
  </div>
</div>

~~~
<div class="_form-control">
    <div class="_form-slider">
      <label for="rangeSlider" class="_form-label">Range Slider </label>
      <input id="rangeSlider" type="range" value="100" min="0" max="500">
    </div>
  </div>
  <div class="_form-control">
    <div class="_form-slider">
      <label for="rangeSlider2" class="_form-label">Range Slider w/ notches </label>
      <input id="rangeSlider2" type="range" value="250" min="0" max="500" step="50">
    </div>
  </div>
~~~




##### Radio 

- `--inline` puts the radio button next to the label.
- Make sure an option is always marked as default checked for accessibility.
- `_form-radiogroup`
- `_form-radiogroup-title`
- `_form-radio`
- `_form-radio-label`

<div class="_styleguide-example">

<div class="_form-control _form-radiogroup --required">
  <label class="_form-radiogroup-title" for="Option">Options</label>
  <div class="_form-radio --inline">
    <label for="option-a" class="_form-radio-label"> 
      <input value="none" type="radio" id="option-a" name="Option" checked/>
      <span for="option-a">Option A</span>
    </label>
  </div>
  <div class="_form-radio --inline">
    <label for="option-b" class="_form-radio-label"> 
      <input value="something" type="radio" id="option-b" name="Option" />
      <span for="option-b">Option B</span>
    </label>
  </div>
  <div class="_form-radio --inline">
    <label for="option-c" class="_form-radio-label"> 
      <input value="something" type="radio" id="option-c" name="Option" />
      <span for="option-c">Option C</span>
    </label>
  </div>
  <div class="_form-radio --inline">
    <label for="option-d" class="_form-radio-label"> 
      <input value="something" type="radio" id="option-d" name="Option" disabled/>
      <span for="option-d">Option D (disabled)</span>
    </label>
  </div>
</div>

</div>

~~~
<div class="_form-control _form-radiogroup --required">
  <label class="_form-radiogroup-title" htmlFor="windowTint">Window Tint</label>
  <div class="_form-radio --inline">
    <label for="option-a" class="_form-radio-label"> 
      <input value="none" type="radio" id="option-a" name="Option" checked/>
      <span for="option-a">Option A</span>
    </label>
  </div>
  <div class="_form-radio --inline">
    <label for="option-b" class="_form-radio-label"> 
      <input value="something" type="radio" id="option-b" name="Option" />
      <span for="option-b">Option B</span>
    </label>
  </div>
  <div class="_form-radio --inline">
    <label for="option-c" class="_form-radio-label"> 
      <input value="something" type="radio" id="option-c" name="Option" />
      <span for="option-c">Option C</span>
    </label>
  </div>
  <div class="_form-radio --inline">
    <label for="option-d" class="_form-radio-label"> 
      <input value="something" type="radio" id="option-d" name="Option" disabled/>
      <span for="option-d">Option D (disabled)</span>
    </label>
  </div>
</div>
~~~




##### Checkbox 

<div class="_styleguide-example">

<div class="_form-control">
  <div class="_form-checkbox --inline">
    <label for="isCheckbox">
      <input id="isCheckbox" type="checkbox" name="isCheckbox" />
      <span for="isCheckbox">Do you like checkboxes?</span>
    </label>
  </div>
  <div class="_form-checkbox --inline">
    <label for="isDefault">
      <input id="isDefault" type="checkbox" name="isDefault" checked/>
      <span for="isDefault">This one is default checked!</span>
    </label>
  </div>
  <div class="_form-checkbox --inline">
    <label for="isDisabled">
      <input id="isDisabled" type="checkbox" name="isDisabled" disabled/>
      <span for="isDisabled">This one is disabled...</span>
    </label>
  </div>
</div>

</div>

~~~
<div class="_form-control">
  <div class="_form-checkbox --inline">
    <label for="isCheckbox">
      <input id="isCheckbox" type="checkbox" name="isCheckbox" />
      <span for="isCheckbox">Do you like checkboxes?</span>
    </label>
  </div>
  <div class="_form-checkbox --inline">
    <label for="isDefault">
      <input id="isDefault" type="checkbox" name="isDefault" checked/>
      <span for="isDefault">This one is default checked!</span>
    </label>
  </div>
  <div class="_form-checkbox --inline">
    <label for="isDisabled">
      <input id="isDisabled" type="checkbox" name="isDisabled" disabled/>
      <span for="isDisabled">This one is disabled...</span>
    </label>
  </div>
</div>
~~~






##### Option & Multiple Select

Dropdown and multiple item selection both depend on the `<select>` tag, which doesn't offer a lot of customization support. These are also questionable in terms of user experience, as for example dropdowns are not accessibility-friendly as a full-on radio button list. However, these do offer simple development and saves space on the interface.

Dropdowns can be custom replaced with a radio list, and multiple select lists with a checkbox list.

<div class="_styleguide-example">
  <div class="_form-select _margin-bottom">
    <label for="dropdownExample">Example option / dropdown</label>
    <select id="dropdownExample">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>

      <optgroup label="Group A">
        <option value="2">1</option>
        <option value="1">2</option>
      </optgroup>
      <optgroup label="Group B">
        <option value="3">3</option>
        <option value="4">4</option>
      </optgroup>
    </select>
  </div>

  <div class="_form-select">
    <label for="budget">Budget Size 
      <span class="_form-select-element">
        <span class="_form-select-dropdown"><i class="fa fa-angle-down"></i></span>
        <select id="budget" name="budget" class="_inline _padding-left">
          <option>less than $20,000</option>
          <option>$20,000 - $40,000</option>
          <option>$40,000 - $60,000</option>
          <option>$60,000 - $80,000</option>
          <option>more than $80,000</option>
        </select>
      </span>
    </label>
  </div>

  <div class="_form-select _margin-top">
    <label for="selectExample">Example multiple select</label>
    <select id="selectExample" multiple>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>

</div>

~~~
<div class="_form-select _margin-bottom">
  <label for="dropdownExample">Example option / dropdown</label>
  <select id="dropdownExample">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>

    <optgroup label="Group A">
      <option value="2">1</option>
      <option value="1">2</option>
    </optgroup>
    <optgroup label="Group B">
      <option value="3">3</option>
      <option value="4">4</option>
    </optgroup>
  </select>
</div>

<div class="form-select">
  <label for="selectExample">Example multiple select</label>
  <select id="selectExample" multiple>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
</div>
~~~


</main>

