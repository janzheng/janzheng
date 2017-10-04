
# Jan’s Portfolio

This is the Middleman rebuild of the old jekyll version, which can be found in the `/old` branch of this repo.

## Getting Started 

This project is written in a combination of ERB (Ruby on Rails templating code), Kramdown (variant of Markdown), and HTML, supported by my own custom, experimental SCSS "framework" I call Stylecoeur that I put together to increase my productivity. 

Note: The site uses the mostly-supported CSS Grids, but may require fallbacks for much older browsers, which have not been written. Oh well!


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

Note to self: do NOT deploy to 'master'—that has a nasty side-effect of deleting everything. Oops.

Github may start aggressively caching your files, which makes deployment difficult as newer files won't show up. Use the built-in asset cache buster to get around this problem:

~~~
activate :asset_hash
~~~







