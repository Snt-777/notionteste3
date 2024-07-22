import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link"
import {getPosts} from "../_services/notion"

export default async function BlogHome() {
    const posts = await getPosts();
    return(
        <div id="marginbasica">
            <div id="posts">
            <Link href={"/"}><h1>Home Blog</h1></Link>
            <ul>
                <div id="postrowdef">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link href={`/Estoque/${post.slug}`}>
                            {post.featuredImage && (
                                <img src={post.featuredImage} alt={`Image for ${post.title}`} style={{ width: '200px', height: '200px' }} />
                            )}
                            </Link>
                            <Link href={`/Estoque/${post.slug}`}>{post.title}</Link>
                        </li> 
                    ))}
                </div>
            </ul>
        </div>
        </div>
    )
}