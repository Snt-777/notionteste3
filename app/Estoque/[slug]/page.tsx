import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link"
import {getPost} from "../../_services/notion"
import {getPosts} from "../../_services/notion"

import Markdown from 'react-markdown'

export default async function BlogPost({ params }: { params: { slug: string} }) {
    const post = await getPost(params.slug);
    return(
        <main>
            <div>
                <h1>{post.title}</h1>
                <Markdown>{post.content}</Markdown>
            </div>

        </main>
    )
}