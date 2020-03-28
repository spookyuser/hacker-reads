# <img src="media/icon.svg" width="45" align="left"> Hacker Reads

<!-- # TODO: Replace Links -->

[link-cws]: https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf "Version published on Chrome Web Store"
[link-amo]: https://addons.mozilla.org/en-US/firefox/addon/refined-github-/ "Version published on Mozilla Add-ons"

> Browser extension that adds Hacker News comments to books on Goodreads.

Comments on Hacker News are one of my favorite places for discovering new books!

I can sometimes go from having never heard of a book, to immediately reading one, because of a HN comment. When it comes to Goodreads user reviews, however, they are rarely able to convince me to read a book.

This extension attempts to fix this problem by placing relevant HN comments underneath book pages in Goodreads which allows you to find out, quickly, what other HN users think of a book you're browsing on Goodreads.

---

## Install

- [**Chrome** extension][link-cws] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/hlepfoohegkhhmjieoechaddaejaokhf.svg?label=%20">][link-cws] # TODO: Replace Link
- [**Firefox** add-on][link-amo] [<img valign="middle" src="https://img.shields.io/amo/v/refined-github-.svg?label=%20">][link-amo] # TODO: Replace Link

## Screenshot

![Screenshot](https://user-images.githubusercontent.com/16196262/77326397-6fc94b00-6d22-11ea-983b-b9af0455691d.png)

## How it works

When you visit a Goodreads book page this extension uses the Algolia HN search API (https://hn.algolia.com/api) to search for a combination of the book name and author.

When searching with the API, it seems that being less specific is often better, that is, if you want to search for a book like "_Clean Code: A Handbook of Agile Software Craftsmanship_" you will not get you that many comments from the Algolia API if you include "_A Handbook of Agile Software Craftsmanship_." What's more, if you just search for "_Clean Code_", without "_Robert C. Martin_" there are tons of irrelevant results that rightly do contain the words "_Clean Code_".

What seems to work pretty well, and what I'm using right now, is the query `'bookTitle bookAuthor'` - where the `'bookTitle'` is the book's title minus any subtitle it might have. This is done by naively chopping off anything after a title's colon, if it has one.

## Roadmap

Here are some things I'd like to add or improve:

- Searching via ISBN.
  - The reason I haven't used this strategy at all is because, curiously, though many people mention books on HN by linking to them on Amazon, which does contain the book's ISBN number, the links are often truncated, which means the ISBN is excluded from the searchable text in the comment.
    For example: searching _189200528_ would not return [this comment](https://news.ycombinator.com/item?id=21900968) though it does have a link with that ISBN.
- Authors with middle names (_Robert C. Martin_) often return less results when including their middle initial.
- Book titles with brackets may return less results than expected.
- Code formatting (`<pre>`) is sometimes weird.
- An option to save individual comments to a private note or comment.
- The way comment HTML is displayed. Currently using very hacky CSS rules which seem to work but I don't really know why.

## Development

See the npm scripts in [package.json](package.json) for more information. To get started make sure [Node.js®](https://nodejs.org/en/) is installed. You can then clone the repo and install the project:

```shell
git clone https://github.com/spookyuser/hacker-reads
cd hacker-reads
npm install
```

If you want to play around with the project

`npm run watch`

This will make webpack watch for any changes and output the unpacked extension to `/distribution/`.  
Now you're ready to start editing the project. You can go straight into `/source/` and mess around if you want.

To see your changes I recommend using Firefox because it automatically reloads your changes and can be launched from the project by running:

`npm run start:firefox`

To build for production just run `npm run build`

## Acknowledgements

My thanks go to all those mentioned in [acknowledgements.md](acknowledgements.md) for any contributions that I used in this project.

I would also like to especially thank [@sindresorhus](https://github.com/sindresorhus) and anyone else involved in [refined-github](https://github.com/sindresorhus/refined-github/) for figuring out how to structure a modern web extension and making it easy to copy that structure :)

## Contributing

Please see [contributing.md](contributing.md). TL;DR: All are very welcome.

## Related

- [Hacker News Books](https://hackernewsbooks.com/)
