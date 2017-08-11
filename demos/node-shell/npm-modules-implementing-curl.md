`curl` is a useful command line tool to download websites.  Here, instead of a file, you're given a URL.

Our next exercise is to implement `curl` using the `request` module: http://github.com/mikeal/request

You can also do it via the native `http` module but it's much less friendly.

<hint title="Using http">
Here's how to download a site using Node's `http`.  It's a bit of a pain since you have to deal with the `stream` of data yourself compared to `request` taking care of it for you.

https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request

</hint>

This will allow us to do this:

<terminal>
$ curl google.com
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com/">here</A>.
</BODY></HTML>

</terminal>

However, before we can use the `request` module we have to dive a bit into how `node` handles external modules using a tool called `npm` (node package manager).