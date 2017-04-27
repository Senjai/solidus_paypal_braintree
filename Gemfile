source 'https://rubygems.org'

branch = ENV.fetch("SOLIDUS_BRANCH", "master")
gem 'solidus', github: 'solidusio/solidus', branch: branch

if branch == "master" || branch >= "v2.0"
  gem "rails-controller-testing", group: :test
else
  gem "rails", "~> 4.2"
  gem "rails_test_params_backport", group: :test
end

# Provides basic authentication functionality for testing parts of your engine
gem 'solidus_auth_devise', '~> 1.0'

# Asset compilation speed
gem 'execjs-fastnode'
gem 'sassc-rails', platforms: :mri

group :development, :test do
  gem 'listen'
  gem 'launchy'
  gem "pry-rails"
  gem 'selenium-webdriver', require: false
  gem 'chromedriver-helper', require: false
end

gemspec
