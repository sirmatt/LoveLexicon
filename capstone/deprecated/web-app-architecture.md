# Architecture of a web application

A deployed web application is built out of several components; it's
not just Rails.

## Proxy (web) server

The first layer is the *proxy server*. Proxy servers are vanilla web
servers; they respond to HTTP requests, but they don't have any
special logic for generating the response. For each request, they
either (a) serve a static file directly from the file-system or (b)
pass the request onto an *application server* (in which our Rails app
runs; more soon) which will contain the code to process and fulfill
the request.

A proxy server is the outward facing layer, the boxes that end-users
actually connect to. Proxy servers are typically very simple; they
read the user request, choose an internal application server to send
the request to for processing, wait for the application server
response, and then relay this on to the end user.

The proxy layer is usually responsible for *load balancing*. One
external-facing proxy server (with one IP address) can handle many
external connections, spreading out the hard work of actually
processing the request among many application servers. Proxy servers
can handle large amounts of traffic, because (1) they do so little
work per request, and (2) because they are written in a multi-process
or multi-threaded way that allow them to handle multiple requests
simultaneously.

Popular web servers are Apache, Nginx (pronounced *engine ex*), and
lighttpd (pronounced/abbreviated *lighty*). When you deploy to Heroku
you don't need to worry about this; Heroku does routing for you.

## Application server

The *application server* is the process which loads and runs your
rails code. Whereas the web server was probably written in C, does
little work per request, and is meant to handle many simultaneous
connections, your application server runs Ruby code (your Rails app!),
may do a fair amount of work per request (especially template
rendering, plus waiting for DB requests to be returned).

Different application servers work differently, but they may not be
able to process multiple requests simultaneously.

### Webrick

Webrick is the default Rails app server; it is written in Ruby and
designed to be simple and functional. It's fine for debugging and
low-traffic apps.

A major limitation is that Webrick will only process one request at a
time. This means your app cannot serve requests in parallel, which
means requests routed to it may pile up, waiting to be processed. This
is frustrating because a majority of the time it takes to process a
web request is spent idle and waiting for results to be returned from
the database server (this can take multiple seconds). In that case,
your Rails app will not be doing any CPU work, but it can't begin work
on another request in the meantime.

Especially if multiple users are using the site, performance can
degrade significantly. If ten users all simultaneously hit a page that
requires 0.01sec of templating and 2sec of DB query, it will take
20sec before the last user gets a response. (Ideally the server would
start trying to process all the requests simultaneously, fire the DB
queries simultaneously, and return the result in ~2sec).

The traditional solution is to fire up additional web servers (or
dynos, in Heroku's parlance). You can fire up multiple servers on the
same machine even. The load balancer will balance requests between the
multiple servers; even if one is blocked on a DB query, another may be
free. By increasing *concurrency*, you can reduce latency and increase
CPU utilization (less CPU time idle means higher efficiency).

### Thin

Thin is an improvement over Webrick. Parts of it (the parts that parse
the HTTP request) are written in C code to speed up performance. Thin
is still single-threaded; out of the box it still handles one request
at a time.

Thin is a simple improvement to drop in to replace Webrick (just add
`gem 'thin'` to your Gemfile). The same trick of running multiple
instances behind a load balancer works.

(I include a bonus section below on the *reactor pattern* if you want
to read about that).

### Unicorn

Unicorn is a *multi-process* web server; it can handle multiple
requests simultaneously. Unicorn spawns multiple *worker processes*,
each of which run their own Ruby interpreter. Each worker can handle
one request at a time, but there are several of them. The Unicorn
server will hand an incoming request to a free worker. This not only
lets you avoid waiting on DB queries (big win), it also lets you run
Ruby/Rails code in parallel (small win).

Each worker runs its own Ruby interpeter and loads your Rails
environment; if you run 4 worker processes, you may find yourself
using 4x the RAM you previously. There are some settings to help, but
Unicorn will use more memory than other approaches.

### Puma

Puma is a *multi-threaded* web server (technically, it also runs
multiple processes, too). Both *threads* and *processes* can run code
simultaneously. But threads *share memory*; which means you can run
many more worker threads without running out of memory.

There is a downside to multi-threading is that when threads share
memory, they can interfere with what other threads are working on. For
instance, imagine one thread saving some data in a global variable,
which another thread then resets with its own data. Rails itself is
*thread-safe*, but some gems may not be; you'd have to audit your
gems.

In theory, you can multi-threaded Ruby code. However, MRI (Matz's Ruby
Implementation, the default) has a *global interpreter lock*;
basically this lock allows only a single Ruby instruction to be
executed at any one time, which kills concurrency in your Rails
code. However, all your waiting for IO (during which no Ruby code
executes) can be done in parallel; since a lot of your request
processing time is spent waiting for IO, this is still a big win.

Other implementations of Ruby (notably JRuby, built on top of Java)
support parallelism in your Ruby code.

## Database server

Your database server is another server that handles your SQL
queries. In a sense, your DB is the heart of your application;
database queries are likely to be the slowest part of your
program. And every app instance wants to talk to the same DB.

We've discussed how we can *scale out* application servers by spinning
up additional instances and putting them behind a load balancer. If we
double the number of app servers, the app server tier can handle twice
as many requests per second.

But if the database layer is a bottleneck, can we just double the
number of DB servers? Unfortunately not; when we doubled the number of
web app servers, each one loads its own Rails environment. This is
fine, because there is no mutable data persisted in the application
layer.

It's easy at a deploy time to "clone" a database so you have two
mirrors of the same dataset. SELECT queries to either DB will return
the same result, so you can balance queries between the two servers to
reduce the load.

But what about INSERT/UPDATE/DELETE queries? These cannot be load
balanced; they must be issued to *every* DB instance. If they weren't,
different DB clones would slowly drift out of sync.

This is the crux of why scaling your DB layer is hard.

### Read slaves

In our current solution, it is the writes to the DB that are not
parallelizable. In practice this turns out to be okay a lot of the
time. If the number of reads relative to writes is high, then we
should see a big win parallelizing the read load even if we can't do
anything about the write load.

One way to set this up is called *master-slave*: one DB instance is
the *master*, which will receive *all* the writes to the DB. The other
DB instances are *read slaves* that will be streamed the updated rows
from the master. They handle the read load.

This tends to work out because most CRUD apps involve lots of reading,
but few writing.

If your site is intensely write heavy, however, master-slave doesn't
help you very much. Luckily, typical loads are read-heavy.

### Scale up

### Sharding

### NoSQL

## Memcached

## Dimensions of scaling

## Concurrency and Rails

## TODO

**TODO**

* Why is Unicorn than multiple thins behind proxy?
    * I think because then you can use a simply proxy algorithm.
    * Unicorn has relatively low memory utilization if you use
      copy-on-write.
* Reactor pattern?

This can be important when
dealing with slow requests: you don't want one user uploading a 10gig
video to block a simple GET request to your index page, 

Technically speaking, there is a way to "parallelize" your Ruby
code. The heart of Thin is a gem called EventMachine. With
EventMachine, every time you make a DB request, you can tell *yield*
control back to EventMachine so that it can carry on work on other
requests. When you yield, you also give EventMachine a callback so
that it can resume processing the request when the DB results do
eventually come in.

This is called the *reactor pattern*, and was pioneered in Twisted, a
Python framework. It works, but it also forces you to very unnaturally
pass callbacks around *every damn time* you make a DB query. 

Thin doesn't solve the single-threaded problem, but it is
significantly faster than Webrick. You should probably be using Thin
in prod.


## References

* http://www.modrails.com/documentation/Architectural%20overview.html
* http://merbist.com/2011/02/22/concurrency-in-ruby-explained/
* https://blog.heroku.com/archives/2013/2/27/unicorn_rails
