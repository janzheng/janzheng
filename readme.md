
# Web Experts

This is the v1 of the webexperts.com redesign.

Current site: [http://webexperts.com](http://webexperts.com)
Prototype 1: [https://www.webexperts.com/indexnew.php](https://www.webexperts.com/indexnew.php)
Prototype 2: [hosted here: http://janzheng.com/webexperts](http://janzheng.com/webexperts)


## Getting Started 

The deliverable is written in a combination of ERB (Ruby on Rails templating code), Kramdown (variant of Markdown), and HTML, supported by a custom SCSS. 

Note: It uses mostly-supported CSS Grids, but may require fallbacks for much older browsers, which have not been written.


## Installation

I'm using [Middleman](https://middlemanapp.com), a Rails-based static-site generator to build and preview the example files. If you've never used Rails, don't fret—I hadn't really either until I found Middleman. It's super simple to set up.

Install [Ruby](https://www.ruby-lang.org/en/downloads/) if you don't have it, then follow the Middleman installation steps on their website to get it running.

After Middleman is installed, go to the directory:

Launching the deliverable:

~~~
  bundle exec middleman server -- port 1133
~~~

then preview on `http://localhost:4567`


Compiling the deliverable:

~~~
  bundle exec middleman build --clean
~~~

If you want to deploy Middleman as a straight-up site, you can do that for free on Github. Understand that Github is a simple static server with no server side abilities, or even https.

Deploying to Github uses [middleman deploy](https://github.com/middleman-contrib/middleman-deploy):

~~~
  bundle exec middleman build --clean
  bundle exec middleman deploy --build-before
~~~

`config.rb` file:
~~~
activate :deploy do |deploy|
  deploy.deploy_method = :git
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  # deploy.branch   = 'custom-branch' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end
~~~

Github may start aggressively caching your files, which makes deployment difficult as newer files won't show up. Use the built-in asset cache buster to get around this problem:

~~~
activate :asset_hash
~~~







