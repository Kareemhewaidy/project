import { getSession, useSession, signOut } from 'next-auth/react';
import fs from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import { useEffect } from 'react'; 
import Styles from"@/styles/Blogs.module.css";
import Meta from "@/components/Meta";



const Blogs = ({ blogs }) => {
  const { data: session } = useSession();
  const router = useRouter();
  

  useEffect(() => {
    if (!session) {
      router.push('/Signin');
    }
  }, [session, router]);

  if (!session) {
    
    return null;
  }

  return (
    
    <div className={Styles.container}>
      <Meta title="Blogs"/>
      <p className={Styles.welcome}>Welcome, {session.user.name}</p>
      <button className={Styles.signOutButton} onClick={() => signOut()}>Sign out</button>

      <h2 className={Styles.blogHeader}>Recent Blogs</h2>
      <ul className={Styles.blogList}>
        {blogs.map((blog) => (
          <li key={blog.createdAt} className={Styles.blogItem}>
            <strong className={Styles.blogTitle}>{blog.title}</strong> by {blog.username}
            <p className={Styles.blogSubject}>{blog.subject}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/Signin',
        permanent: false,
      },
    };
  }

  const filePath = path.join(process.cwd(), 'data', 'blogs.json');

  try {
    const blogsData = await fs.readFile(filePath, 'utf-8');
    const blogs = JSON.parse(blogsData);
    return {
      props: { blogs },
    };
  } catch (error) {
    console.error('Error reading blogs data:', error);
    return {
      props: { blogs: [] },
    };
  }
};

export default Blogs;
