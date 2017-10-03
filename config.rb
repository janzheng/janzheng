###
# Page options, layouts, aliases and proxies
###


# instead of markdown
require "kramdown"
set :markdown_engine, ::Tilt::KramdownTemplate
set :markdown_engine, :kramdown


# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false




set :partials_dir, 'partials'
set :fonts_dir, 'fonts'
set :css_dir, 'stylesheets'

set :strip_index_file, false

set :build_dir, 'docs' # for github pages master (not for projects)

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

activate :asset_hash # github cache buster

activate :deploy do |deploy|
  deploy.deploy_method = :git
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  deploy.branch   = 'master' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end

activate :relative_assets

activate :aria_current

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  # blog.permalink = "{year}/{month}/{day}/{title}.html"
  # Matcher for blog source files
  # blog.sources = "posts/{year}-{month}-{day}-{title}.html"
  blog.sources = "posts/{title}, styleguide"
  # blog.taglink = "tags/{tag}.html"
  # blog.layout = "layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end





# https://github.com/manastech/middleman-search
activate :search do |search|
  search.resources = ['styleguide/', 'index.html', 'landing.html']
  # search.index_path = 'search/lunr-index.json' # defaults to `search.json`
  # search.lunr_dirs = ['source/vendor/lunr-custom/'] # optional alternate paths where to look for lunr js files
  # search.language = 'es' # defaults to 'en'
  search.fields = {
    title:   {boost: 100, store: true, required: true},
    content: {boost: 50},
    # url:     {index: false, store: true},
    # author:  {boost: 30}
  }
end




page "/feed.xml", layout: false
# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end


