"use server";

import { Client } from '@notionhq/client';
import {NotionDatabaseResponse} from "../_types/notion"
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const DATABASE_ID = '883be74877db4583aa4048a29023ba72';

export async function getPosts(){
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
    });

    const typedResponse = (response as unknown) as NotionDatabaseResponse

    return typedResponse.results.map((post) => {
      return {
        id: post.id,
        title: post.properties.title?.title?.[0]?.plain_text || "",
        slug: post.properties.slug?.rich_text?.[0]?.plain_text || "",
        tags: post.properties.tags?.multi_select?.map((tag) => tag.name) || [],
        createdAt: post.created_time,
        featuredImage: post.properties.featured_image?.files?.[0]?.file?.url || "",
      }
    }
    )
}

export async function getPost(slug: string) {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      or: [
        {
          property: 'slug',
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  });

  const pageId = (response.results[0] as PageObjectResponse).id;

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  const properties = (response.results[0] as PageObjectResponse).properties;
  const title = properties?.title?.type === 'title' && Array.isArray(properties.title.title) && properties.title.title.length > 0
    ? properties.title.title[0]?.plain_text || ""
    : "";

  return {
    title: title,
    content: mdString.parent,
  }
}