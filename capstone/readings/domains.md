# Custom Domain Name

When you first sign up for heroku and create an app it will either be given a
nice auto generated name like whispering-willo-9882.herokuapp.com or you may
have named your app when you created it. In which case your heroku apps domain
is something like fatpenguin.herokuapp.com. In either case having herokuapp.com
in the domain is not desirable. The pros will see this from a mile away and
smell n00b. To really step up your game, buy a custom domain.


### Note App IP Address

Acquire the IP address of the server where your heroku app is served by
making a DNS query using `nslookup` or `dig` command line tools like this:

```sh
nslookup fatpenguin.herokuapp.com
```

The output looks like this. Make note of the Address, in this case
**54.235.137.114**. This is the IP that we need to set the A record of our
domain to.

```
Server:         10.128.128.128
Address:        10.128.128.128#53

Non-authoritative answer:
fatpenguin.herokuapp.com        canonical name =
us-east-1-a.route.herokuapp.com.
Name:   us-east-1-a.route.herokuapp.com
Address: 54.235.137.114
```

### Add Domain to Heroku

Use the heroku cli to set the domain like this (**NB**: both root (no subdomain) and
`www` subdomains):

```sh
heroku domains:add fatpenguin.com
heroku domains:add www.fatpenguin.com
```

## Register a Domain

The following are steps for registering domain names using a few different
providers. We recommend [Namecheap][namecheap] and we'll go through that one
first. These instructions assume you've already gone through the process of
purchasing the domain.


### [Namecheap][namecheap]

On namecheap.com:

0. Log in.
0. Hover over "My account" and click "manage domains".
0. Click on your domain.
0. Click "All Host records" in the blue menu on the left.
0. In the "www" row
0. Enter the URL you want to point to under the "IP Address/URL" column.
0. Select CNAME (Alias) under "Record Type".
0. Click "Save Changes".

[Namecheap howto video :movie_camera:][namecheap-howto]

### [GoDaddy][godaddy]

0. Sign in.
0. Under Domains click "Manage"
<img src="../images/godaddy_manage.png" style="max-height: 100px">
0. Click the "DNS Zone" tab
<img src="../images/godaddy_dnszone.png" style="max-height: 100px">
0. Click the pencil icon to the right of the `@` host'
<img src="../images/godaddy_edit.png" style="max-height: 100px">
0. Paste in the App IP Address from above
0. Click "Add Record"
<img src="../images/godaddy_addrecord.png" style="max-height: 100px">
0. Select "CNAME"
<img src="../images/godaddy_CNAME.png" style="max-height: 100px">
0. Set `www` as the host
0. Set `yourapp.herokuapp.com` as the points to
0. Click finish
0. Scroll up and click "Save"

### [Google Domains][google]

0. Sign in.
0. Click the Icon in the DNS column for your domain.
<img src="../images/google_settings.png" style="max-height: 100px">
0. Scroll down to "Custom resource records"
0. Fill in `www` `CNAME` `1H` `yourapp.herokuapp.com`
<img src="../images/google_CNAME.png" style="max-height: 100px">
0. Click "Add"
0. Fill in `@` `A` `1H` `App IP Address`
<img src="../images/google_A.png" style="max-height: 100px">
0. Click "Add"

## HTTPS ($20/month heroku)

If for some reason you want to be extra special and are determined to have a
legit SSL Certificate to go along with your fancy new domain there's an extra
step to getting the domain setup. Follow the [heroku ssl instructions][heroku-ssl].
When you run the `heroku certs:add ...` command the output will contain a domain
in the form example-1212.herokussl.com. **UPDATE ALL CNAMES TO POINT TO THIS
DOMAIN**. Go back to all your domain registrar settings and replace references
of `yourapp.herokuapp.com` with `something.herokussl.com`.


[heroku-ssl]: https://devcenter.heroku.com/articles/ssl-endpoint
[google]: https://domains.google.com/registrar
[godaddy]: https://www.godaddy.com/
[namecheap]: https://www.namecheap.com/
[namecheap-howto]: https://www.namecheap.com/support/knowledgebase/article.aspx/1031/2/
