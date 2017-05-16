require 'bundler'

Bundler::GemHelper.install_tasks

begin
  require 'spree/testing_support/extension_rake'
  require 'rubocop/rake_task'
  require 'rspec/core/rake_task'
  require 'yard'

  RSpec::Core::RakeTask.new(:spec)
  YARD::Rake::YardocTask.new(:yard)

  RuboCop::RakeTask.new

  task default: %i(first_run rubocop spec)
rescue LoadError
  # no rspec available
end

task :first_run do
  if Dir['spec/dummy'].empty?
    Rake::Task[:test_app].invoke
    Dir.chdir('../../')
  end
end

desc 'Generates a dummy app for testing'
task :test_app do
  ENV['LIB_NAME'] = 'solidus_paypal_braintree'
  Rake::Task['extension:test_app'].invoke
end

desc "Generates documentation for the app"
task doc: :yard do
  puts "Generating JSDoc"
  abort "JSDoc failed!" unless system("jsdoc -c conf.json")
end
