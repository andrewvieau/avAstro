---
title: "Automating workflow on datasources"
pubDate: 2025-11-15
description: "Whether you’re on SitecoreAI, XM, or XP, these tips and tricks can streamline your content creation."
author: "Andrew"
image:
  url: "/images/workflogo.jpg"
  alt: "A parody of the poster for the movie Flow, with the word work in front of it and the Sitecore logo covering the cat."
tags: ["Sitecore", "Workflow"]
---

This is part 2 of my 3-part blog series [Workflows that Work: Simple governance for every Sitecore implementation](/posts/workflow).

## Automating workflow on datasources

If you’ve followed my advice from part 1 and implemented the workflow on all of your page templates, you’ve taken a step in the right direction. Your pages will no longer be published accidentally, and new versions will be created automatically for most of your content.

But not all of your content is defined at the page level. Some of that is stored in local or reusable datasources. The presence of datasources presents us with a challenge.
If you ignore workflow on those datasources, you lose out on auto-versioning, so you’re unlikely to have a version history. Additionally, it’s possible that those datasources could be modified without proper validation, which could lead to bad content going live on your website.

But if you apply workflow to those datasources, you run into other roadblocks. You now need to submit both the page item itself, as well as any datasources, all of which need to be reviewed and approved individually.

This is exactly the pain that Sitecore's **Datasource Workflow Action** is designed to solve.

## What Is the Datasource Workflow Action?

The **Datasource Workflow Action** automatically pushes a page's datasources along the workflow when the page itself moves to another state. So when you approve your page, you also approve all of that page’s dependencies.

## Why You Should Use It

Beyond solving the issues mentioned in the intro, it makes for a much simpler and more intuitive authoring experience. Your content authors & proofreaders in QA or QC, are typically only concerned with the page as a whole.

![Webpage with some text and image fields](/images/wf/board1.png "Picture of a webpage with some text and image fields")

They may not have a thorough understanding of the architecture going on behind the scenes when you drag an additional rich text or image component onto the page, and they shouldn’t have to.

![The previous page in SitecoreAI](/images/wf/board2.png "Picture of SitecoreAI content tree showing the data structure of the webpage in the previous image")

While it doesn’t hurt to understand the difference between page content defined on the item itself, as opposed to content that’s coming from a local datasource, using the Datasource Workflow Action ensures a smooth authoring experience for those who just want to focus on the page.

## How to Use It (Step-by-Step)

Step 1: Create the Datasource Workflow Action on a Workflow Command
For example, on my Two State workflow, I want to trigger the action when the Approve command is executed.
![Create a datasource workflow action](/images/wf/what-is-create-ds-action.jpg "Creating a datasource workflow action")

Step 2: Point the Command item field to the appropriate command
The Command item field on the datasource workflow action should point to the command that you want to trigger on the datasources when the command from the previous step is executed. For example, since my datasources are using the out of the box Basic Datasource Workflow, I would point the command to that workflow’s Approve command.
![Command item field](/images/wf/command-item.jpg "Command item field")

Step 3: Define scope
The default scope is Self, meaning only the current data source item will be moved. If you want child or descendant items to also be moved to the workflow state that the current data source item is moved to, select the appropriate option from the drop down.
![Scope field](/images/wf/scope.jpg "Scope field")

Step 4: Validate Workflow Alignment
This step should be assumed, but it’s always worth mentioning that you should test your changes in dev or staging before deploying them to production.

## Use in Complex Workflow

The previous example shows the use in a two state workflow, mirroring the use in the out of the box Basic Workflow mentioned in the previous post. Most workflows, however, are more complex.

If you have a workflow with multiple states that require sign off from different parties, the simplest way to use this action is to put it on the final workflow command in the process. This gives your pages the required approval process, while your datasources still follow the binary workflow: either approved or not.

If you want your datasources to follow a more complex, staged approach similar to your content items, you will need to setup multiple Datasource Workflow Actions.

### Conclusion

The Datasource Workflow Action is one of those small, often overlooked Sitecore features that solves a big operational problem. It’s available out of the box on Sitecore XP, Sitecore XM, and SitecoreAI.

If this blog post helped you, I would love to hear about it! The best place to reach me is via a direct message on LinkedIn.

Thanks for reading!

Next up: [Modifying Workflow Programmatically](/posts/workflow3/) (for developers)
