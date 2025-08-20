---
 
title: 'First attempt at a blog with Sanity.io'
pubDate: 2025-08-07
description: 'Summarizing my failed attempt at building a blog with Sanity & Astro'
author: 'Astro Learner'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["astro", "sanity", "blogging", "learning in public", "featured"]
---

## The tutorial

[Build your blog with Astro and Sanity](https://www.sanity.io/guides/sanity-astro-blog#b4fe7155f5b5), last updated January 28, 2025. 6 months old at the time of this attempt.

## The step

[Embedding Sanity Studio](https://www.sanity.io/guides/sanity-astro-blog#31f146c81d58). Everything was going fine until I tried to open studio on the local develeopment server.

## The error

Failed to fetch dynamically imported module: http://localhost:4321/node_modules/.vite/deps/ViteDevServerStopped-67AN5YON.js?v=44bcae91
TypeError: Failed to fetch dynamically imported module: http://localhost:4321/node_modules/.vite/deps/ViteDevServerStopped-67AN5YON.js?v=44bcae91

The file does not exist at (root)/node_modules/.vite/deps/ViteDevServerStopped-67AN5YON.js?v=44bcae91 which is in the optimize deps directory. The dependency might be incompatible with the dep optimizer. Try adding it to `optimizeDeps.exclude`.

## Summary

I spent a good amount of time exploring solutions, to no avail. I updated optimizeDeps.exclude as described, but it gave me the same error. I still don't really know what Vite does, and I'm not sure what the problem is or how to solve it.  

I noticed thta the prerequisites say: "Before taking on the guide, make sure that you have Node.js 18 and npm 9 (or another package manager) or a version above installed."  My node is 20 & my npm is 10, so maybe something has been lost in the upgrades.  

So the question is: Do I give up on Sanity or Astro?

I was learning towards sticking with Sanity. I still wanted to use a framework that I have no experience with, so I went with Gatsby.  But after reading the [Gatsby with Sanity Guide](https://www.gatsbyjs.com/guides/sanity/), I reconsidered.  The "Sanity is great for" section doesn't list anything I care about, and the "Sanity is not-so-great for" describes me perfectly.

Plus I just spent all this time going through the Astro tutorial, and I'd like to keep building on my skills there.  So I'm going to give Contentful a try.

