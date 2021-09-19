# create-gql-project

A CLI for scaffolding my gql projects.

### Motivation

I suppose I just got tired of spinning up the same boilerplate each time need to build
a new graphql app. In general seems nicer than creating a bunch of templates. 
If and when I discover a something new that I want to throw in the stack, I add a new template
and we're off to the races. The templates are somewhat opinionated (config/linting/ect) but
nothing that wouldn't be hard to alter for your own personal preference. So If you do come across
this CLI and plan to spin up a graphql app with similar tech, please take advantage of the short cut. Also if you have a template in mind feel free
to raise a PR to add it to the mix.

### Usage

```shell
 Usage
    $ create-gql-project <project-directory> [options]

  Options
    -g, --git        Initialize git  (default false)
    -n, --use-npm    Install dependencies with NPM  (default false)
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ create-gql-project my-svc
    $ create-gql-project gql-svc --git
    $ create-gql-project gql-svc --use-npm
    $ create-gql-project gql-svc -g -n
```

### Templates

1. apollo-typegraphql

This is just a standard Apollo Typegraphql node/express server. If your in need a simple node server, 
are going to code first route, and want to use typegraphql this is probably a solid bet to get
you started. Oh yeah - hope you enjoy typescript as well. :)

core stack:
- apollo
- express
- typescript
- typegraphql
- eslint/prettier

2. apollo-typegraphql-auth 

Pretty much the same stack and setup as the above but also includes some functional authentication. Since Typegraphql and Typeorm play
very nicely together, that is the choice ORM for this particular template with Postgres for your persistence layer. The user entity
has been created for you here along with some core auth resolvers (login, register, me). Redis is included here along with the some
opinionated setup for session cookies. The CLI will also attempt to install a database (I believe this could be improved) as well.

core stack:
- apollo
- express
- typescript
- typegraphql
- typeorm
- postgres
- redis
- eslint/prettier

3. next-giraphql-prisma-nextauth

I'm admittedly a fan of next.js so it's only logical that I start included some templates here. This particular stack is a little new
for me but so far I'm enjoying it. Using giraphql which has a similar API to nexus and some of the core setup for this is good to go. An API route
for the graphql is also setup with apollo-server-micro. For authentication the choice here is next-auth which also connect to prisma. 
The next-auth/prisma adapter layer is pretty much plug-n-play here aside from some client secret/client id's for providers that will require
your attention. The next-auth docs fully covers the requirements and the .env_sample file has some empty env variables that you'll need to
get things 100% ready to go. Prisma is setup to store any user data and some core provider configs are also ready for use (github/google/email - magic pw).
Chakra-ui is also setup and ready to go here. It's a solid choice for small/medium project and has a ton of great core components. Should be easy to
swap out for something else if it doesn't suite your needs.

core stack:
- next.js
- typescript
- giraphql
- apollo-server-micro
- next-auth
- prisma
- chakra-ui
