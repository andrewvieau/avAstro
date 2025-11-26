---
title: "Modifying Workflow Programmatically"
pubDate: 2025-11-26
description: "Whether you’re on SitecoreAI, XM, or XP, these tips and tricks can streamline your content creation."
author: "Andrew"
image:
  url: "/images/workflogo.jpg"
  alt: "A parody of the poster for the movie Flow, with the word work in front of it and the Sitecore logo covering the cat."
tags: ["Sitecore", "Workflow", "Development"]
---

This is the final entry of my blog series [Workflows that Work: Simple governance for every Sitecore implementation](/posts/workflow).

## Modifying Workflow Programmatically

In Sitecore, workflow keeps your content creation process structured, auditable, and predictable. There is a lot of flexibility right inside the platform, but sometimes to take your workflow to the next level you will need to change workflow states programmatically.  
In a traditional Sitecore XP implementation using ASP.Net MVC, you would use the [Sitecore Item API](https://doc.sitecore.com/xp/en/developers/latest/sitecore-experience-manager/access-field-values.html). If you’re using SitecoreAI, or Sitecore Headless Services on XP, you would use the Sitecore Authoring and Management GraphQL API (links for [SitecoreAI](https://doc.sitecore.com/sai/en/developers/sitecoreai/sitecore-authoring-and-management-graphql-api.html) and [XP](https://doc.sitecore.com/xp/en/developers/latest/sitecore-experience-manager/sitecore-authoring-and-management-graphql-api.html)).

## Workflow behind the curtain

Like nearly everything in Sitecore, workflow data is stored as metadata in fields. Specifically, the Standard Fields that are defined on every item:

**\_\_Workflow** shows the workflow the item belongs to

**\_\_Workflow state** is the item’s current workflow state

\***\*Valid from, Valid to** is used for scheduling fields

**\_\_Lock** shows the user that locked the item (not used anymore in SitecoreAI)

**\_\_Default workflow** represents the default workflow assigned at the template level, usually the same as the Workflow field above.

Changing the workflow state is ultimately as simple as updating the **\_\_Workflow state** field.

## Changing Workflow State with GraphQL Mutations

If you're using Sitecore Headless Services or SitecoreAI, you leverage GraphQL mutations to update your items. If you are unfamiliar with the Authoring and Management API, see [the following tutorial](https://doc.sitecore.com/sai/en/developers/sitecoreai/walkthrough--enabling-and-authorizing-requests-to-the-authoring-and-management-api.html) on how to enable it.
You can use the [updateItem](https://doc.sitecore.com/sai/en/developers/sitecoreai/query-examples-for-authoring-operations.html#update-an-item) mutation to modify \_\_Workflow state field.
Before running this query, you will need:
The Path or ID of the item to update
The ID of the target workflow state
The language of the version to update

## Sample Mutation to Change Workflow State

```
  mutation {
    updateItem(
    input: {
    fields: [
              { name: "__Workflow state", value: "My new page"
              }
            ]
    itemId: "{376D44BA-B0B0-4297-AC50-ADBC63A9E7E6}"
    language: "en"
    path: "/sitecore/content/learning-demos/basic-site/Home/Simple Workflow"
    }
    ) {
      item {
      name
      itemId
      }
    }
  }
```

## Changing Workflow State via the Sitecore Item API in ASP.NET MVC

If your Sitecore solution uses MVC controllers, you can modify workflow fields the same way we’d modify any field programmatically. The process is as follows:
Put the item in an editing state

Update the fields via their raw values

Save your changes by ending the editing state
Generally it would be recommended to run some code to make sure the fields exist, and/or to put this code in a try/catch block in case of errors. The main code to edit fields looks like this:

## Sample Code to Change Workflow State via Sitecore Item API

```
  Item myItem = Sitecore.Context.Database.GetItem(“{item id goes here}”);

  myItem.Editing.BeginEdit();
  myItem[“__Workflow State”] = “{id of target workflow state}”;
  myItem.Editing.EndEdit();
```

### Wrapping up

If this has not sated your appetite for workflow automation, I would recommend you follow this up with one of two blog posts:

**If you are using SitecoreAI:** Check out [Sitecore Workflow Automation with Management API](https://www.getfishtank.com/insights/sitecore-workflow-automation-with-management-api) by Sohrab Saboori. Sohrab goes much more in-depth, showing how to do complex actions like executing workflow commands directly, rather than simply moving the item to a new workflow state.

**If you are using Sitecore XP:** Check out [Programmatically assigning a workflow to a Sitecore item](https://sitecorecontextitem.wordpress.com/2013/11/15/programmatically-assigning-a-workflow-to-a-sitecore-item/) by Scott Mulligan. Over a decade later, this post still applies just as much to version 10 as it did to Version 7 when this was written.

Thanks for reading!
