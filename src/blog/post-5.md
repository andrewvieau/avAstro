---
 
title: My Second Fourth Blog Post
author: Astro Learner
description: "This post will show up on its own!"
image:
    url: "https://docs.astro.build/default-og-image.png"
    alt: "The word astro against an illustration of planets and stars."
pubDate: 2025-07-23
tags: ["astro", "successes"]
---
This post should show up with my other blog posts, because `import.meta.glob()` is returning a list of all my posts in order to create my list.

## Unit 5: Astro API

In this exercise, we create a fourth blog post. But I've already done that, so here's #5.

## The error

I'm getting <b>TypeError: An error occurred. Cannot read properties of undefined (reading 'includes')</b> when I try to visit my tags after completing the Advanced Javascript section. It appears to me that I am not properly retrieving my blogpost tags, and I'm not sure if the tutorial is wrong/outdated or if I just did something wrong.  

One difference is that I have that Blogposts.astro component, because I misread an earlier challenge exercise. I'm going to remove that.

That didn't help, but I did notice that one post, learning-astro.md, had no tags. The first step in the advanced lab said "Check that all your blog posts contain tags" and apparently I missed that one.  Apparently the way we're calling these, if there are any blog posts without any tags, it will throw an error.

getStaticPaths() seems important, so I'm going to pause to read <a href="https://docs.astro.build/en/reference/routing-reference/#getstaticpaths">the documentation</a>.

