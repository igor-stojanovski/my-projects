import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import BlogItem, { BlogItemData } from "../../components/BlogItem";
import PageTitle from "../../components/PageTitle";
import { useRouter } from "next/router";

interface Props {
  filteredBlogs: BlogItemData[];
}

const Blog: NextPage<Props> = ({ filteredBlogs }) => {
  const { push, query } = useRouter();

  const [searchQ, setSearchQ] = useState("");

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    push({
      pathname: "/blog",
      query: {
        ...query,
        q: searchQ,
      },
    });

    setSearchQ("");
  };
  return (
    <>
      <Head>
        <title>Store - Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title="Blog" />

      <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => {
                    return <BlogItem key={blog.id} {...blog} />;
                  })
                ) : (
                  <p>There are no results with your search.</p>
                )}
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <form
                  className="bor17 of-hidden pos-relative"
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                    onSearchSubmit(e)
                  }
                >
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                  />

                  <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search"></i>
                  </button>
                </form>

                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">Categories</h4>

                  <ul>
                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        onClick={() => {
                          push({
                            pathname: "/blog",
                            query: {
                              category: "fashion",
                            },
                          });
                        }}
                      >
                        Fashion
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        onClick={() => {
                          push({
                            pathname: "/blog",
                            query: {
                              category: "beauty",
                            },
                          });
                        }}
                      >
                        Beauty
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        onClick={() => {
                          push({
                            pathname: "/blog",
                            query: {
                              category: "streetstyle",
                            },
                          });
                        }}
                      >
                        Street Style
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        onClick={() => {
                          push({
                            pathname: "/blog",
                            query: {
                              category: "lifestyle",
                            },
                          });
                        }}
                      >
                        Life Style
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        onClick={() => {
                          push({
                            pathname: "/blog",
                            query: {
                              category: "diy",
                            },
                          });
                        }}
                      >
                        DIY & Crafts
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const category = query.category;
  const searchQuery = query.q;

  let link: string;
  if (category && searchQuery) {
    link = `http://localhost:5001/blogs?category_like=${category}&q=${searchQuery}`;
  } else if (category) {
    link = `http://localhost:5001/blogs?category_like=${category}`;
  } else if (searchQuery) {
    link = `http://localhost:5001/blogs?q=${searchQuery}`;
  } else {
    link = `http://localhost:5001/blogs`;
  }

  const res = await fetch(link);
  const filteredBlogs: BlogItemData[] = await res.json();

  return {
    props: {
      filteredBlogs,
    },
  };
};
