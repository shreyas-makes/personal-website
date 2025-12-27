---
title: "Deploying Home Cooked Apps with Rails"
description: "As a Rails enthusiast, I've always wanted a better deployment solution to house my hobby projects. It was not that there was no good solution available: We have AWS, Heroku, Hatchbox, Fly, Render.io..."
date: "2024-11-24T22:01:30.000Z"
slug: "rails-8-app-hetzner-with-kamal-2"
tags: [software]
stage: "plant" 
---

As a Rails enthusiast, I've always wanted a better deployment solution to house my hobby projects. It was not that there was no good solution available: We have AWS, Heroku, Hatchbox, Fly, Render.io and various other such PaaS alternatives.

![](/images/2024/11/image-5.png)

AWS has been too complex personally to build side projects. That, and the +500% markup.

All these PaaS providers were ultimately wrappers sitting on top of the SaaS applications, and I felt that one could do away with this. The opening keynote by DHH on Rails World 2024 seemed messianic, as he was talking about the same issue of wrappers on top of other wrappers, spiking up the cost of deploying even simple apps. What made this keynote exciting was the unravelling of Kamal, and how it abstracts the complexity of deployment out of the picture.

Builders have to build. Builders don't have to necessarily be DevOps engineers to build. I was tempted to try this sooner, as I was painfully frustrated by my experience in deploying Rails app on Heroku.

In the following blog/tutorial, I'll take you through my process of deploying a Rails 8 app on Hetzner VPS using Kamal 2, deploying directly to the Hetzner VPS.

*   I chose SQLite as the database for production (as this comes as a defacto standard for Rails 8 applications).
*   I chose Hetzner VPS, as it seemed to be the most cost effective solution (for ~4$/month) (Compared to Heroku which might even come to $300/month with the database addon costs)

### Setting up Hetzner VPS

First step is to configure the Hetzner VPS in the right way. On Hetzner, spin up a basic server. From the Cloud Console, choose the location of a server closer to your residence. For the operating system for your VPS, I chose Ubuntu (as that's a popular Linux OS, and therefore easier to find help online for debugging). For type, I chose **Shared vCPU**, as it's easier and cheaper (I chose the x86 architecture). Regarding networking options, I chose both **Public IPv4**, and **Public IPv6** addresses. I then added an SSH key for me to authenticate into the server from my local environment (more secure than password authentication). I also selected Backups as an option since we're going to use sqlite3 as a database in production environment. (SQlite are single file databases, and hence are more susceptible to data losses). After all these steps, you give your server a name, and then pay for the nominal fee to get it live.

I also did a gut check to see if I'm able to enter the Hetzner VPS on my local machine with this command:

    ssh root@[ip-address]

I also set up private/public SSH keys and added the public key to my Hetzner VPS for authentication while logging into my root server on Hetzner.

###   
Cloudflare for DNS/SSL management

If we already have a website domain, the next step here is to add the relevant nameservers from the place you purchased. In my case, I'd purchased my website on namecheap.com, so I added the nameservers from namecheap, so that Cloudflare is able to handle the DNS itself. After this step, under the SSL/TLS section, I give the option to have **Full** encryption. Under Edge Certificate, ensure that the **Always Use HTTPS** and **Automatic HTTPS rewrites** is checked as active.

I updated the DNS settings on Cloudflare as follows:

    A (DNS only | auto TTL) [website-name.com] points to [hetzner-ipv4-address]
    A (DNS only | auto TTL) [subdomain.website-name.com] points to [hetzner-ipv4-address]
    A (DNS only | auto TTL) [www.website-name.com] points to [hetzner-ipv4-address]
    AAAA (DNS only | auto TTL) [website-name.com] points to [hetzner-ipv6-address]
    AAAA (DNS only | auto TTL) [subdomain.website-name.com] points to [hetzner-ipv6-address]
    AAAA (DNS only | auto TTL) [www.website-name.com]  points to  [hetzner-ipv6-address]

Now that we have setup an active Hetzner VPS, as well as connected the website domain to Cloudflare, we can move on to the next step, which is to setup the Rails app.

###   
Setting up a Rails 8 app

I setup a vanilla Rails 8 installation for this demo purpose.

    rails new [app-name] 
    cd [app-name]
    bundle install

I then generated some controllers and view files for my Rails app, so that I could view a 'hello world' when I'm accessing the website homepage.

    rails g controller Home index
    

    class HomeController < ApplicationController
      def index
      end
    end
    

home\_controller.rb

    <h1> Hello world! </h1>

index.html.erb

    root "home#index"

routes.rb

While deploying, I was facing errors as the net-pop gem was not compatible with ruby 3.3.3 version. While searching for internet solutions, I found this github issue which helped me resolve the bug. Long story short, I had to update the relevant Gemfile.lock lines:

    ...
        net-imap (0.5.1)
          date
          net-protocol
        net-pop (0.1.2)
          net-protocol
        net-protocol (0.2.2)
          timeout
    ...
    ...
    ...

Gemfile.lock

After setting this all up, I then did a local deployment just to be sure about everything working together as expected.

###   
Setting up Kamal deployment

The next step now was to setup the deployment to point the Rails 8 app to the Hetzner VPS. This was enabled through Kamal, the new deployment tool from Rails team. Before we proceed with Kamal, we would need an account on DockerHub. After account creation, once we go to the settings, we are provided a Docker Access Token which can then be saved and used later as a `KAMAL_REGISTRY_PASSWORD`.

    export KAMAL_REGISTRY_PASSWORD=[enter-your-password-here]

shell

This stores this in a secure fashion for the Kamal wrapper to make use of.

    service: [app-name]
    
    image: [dockerhub-username]/[app-name]
    
    servers:
      web:
        - [hetzner-ipv4-address]
    
    proxy:
      ssl: true
      host: [app-name].[website]
      app_port: 3000
    
    # Credentials for your image host.
    registry:
      username: [dockerhub-username]
      password:
        - KAMAL_REGISTRY_PASSWORD
    
    env:
      secret:
        - RAILS_MASTER_KEY
      clear:
        DB_HOST: 192.168.0.2
    
    
    aliases:
      console: app exec --interactive --reuse "bin/rails console"
      shell: app exec --interactive --reuse "bash"
      logs: app logs -f
      dbc: app exec --interactive --reuse "bin/rails dbconsole"
    
    volumes:
      - "[app-name]_storage:/storage/database.sqlite3"
    
    # Configure the image builder.
    builder:
      arch: amd64
    

config/deploy.yml

    default: &default
      adapter: sqlite3
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
      timeout: 5000
    
    development:
      <<: *default
      database: storage/development.sqlite3
    
    
    test:
      <<: *default
      database: storage/test.sqlite3
    
    production:
      primary:
        <<: *default
        database: storage/database.sqlite3
      cache:
        <<: *default
        database: storage/production_cache.sqlite3
        migrations_paths: db/cache_migrate
      queue:
        <<: *default
        database: storage/production_queue.sqlite3
        migrations_paths: db/queue_migrate
      cable:
        <<: *default
        database: storage/production_cable.sqlite3
        migrations_paths: db/cable_migrate
    

config/database.yml

After this step, we update the Dockerfile ensuring that the /storage folder is also added as a directory for the database.

    
    ARG RUBY_VERSION=3.3.3
    FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base
    
    # Rails app lives here
    WORKDIR /rails
    
    # Install base packages
    RUN apt-get update -qq && \
        apt-get install --no-install-recommends -y curl libjemalloc2 libvips sqlite3 && \
        rm -rf /var/lib/apt/lists /var/cache/apt/archives
    
    # Set production environment
    ENV RAILS_ENV="production" \
        BUNDLE_DEPLOYMENT="1" \
        BUNDLE_PATH="/usr/local/bundle" \
        BUNDLE_WITHOUT="development"
    
    # Throw-away build stage to reduce size of final image
    FROM base AS build
    
    # Install packages needed to build gems
    RUN apt-get update -qq && \
        apt-get install --no-install-recommends -y build-essential git pkg-config && \
        rm -rf /var/lib/apt/lists /var/cache/apt/archives
    
    # Install application gems
    COPY Gemfile Gemfile.lock ./
    RUN bundle install && \
        rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
        bundle exec bootsnap precompile --gemfile
    
    # Copy application code
    COPY . .
    
    # Precompile bootsnap code for faster boot times
    RUN bundle exec bootsnap precompile app/ lib/
    
    # Precompiling assets for production without requiring secret RAILS_MASTER_KEY
    RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile
    
    # Final stage for app image
    FROM base
    
    # Copy built artifacts: gems, application
    COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
    COPY --from=build /rails /rails
    
    # Run and own only the runtime files as a non-root user for security
    #
    RUN mkdir /storage
    
    RUN groupadd --system --gid 1000 rails && \
        useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
        chown -R rails:rails db log storage tmp storage
    USER 1000:1000
    
    # Entrypoint prepares the database.
    ENTRYPOINT ["/rails/bin/docker-entrypoint"]
    
    # Start server via Thruster by default, this can be overwritten at runtime
    EXPOSE 3000
    CMD ["./bin/thrust", "./bin/rails", "server"]

Dockerfile

After all these changes, we save the files and add git version control to it: `git init`, `git add .` and then `git commit -m "new"` .

Also ensure that you `docker login` to autheticate, and make sure that Docker Desktop app is running so that you could dockerize the application. After this,

    kamal init
    docker login
    kamal setup
    kamal deploy

And you're done!  
  
After running these commands, your Rails 8 application should be successfully deployed on your Hetzner VPS, accessible via your configured domain name. The entire setup process shows how modern deployment tools like Kamal can simplify complex DevOps tasks.

Some key takeaways:

1.  Cost-effectiveness: At roughly $4/month on Hetzner VPS, this solution is significantly more economical than traditional PaaS providers like Heroku, which can run up to $300/month with database add-ons.
2.  Simplified DevOps: Kamal abstracts away much of the complexity involved in containerization and deployment, making it accessible even for developers with limited DevOps experience.
3.  Production-Ready: With Cloudflare handling SSL and DNS management, and Docker ensuring consistent environments, this setup is robust for production.