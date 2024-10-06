import React, { useEffect } from "react";
import { blogsData } from "../../dummyData";
import "./blog.css";

const Blog = () => {
  useEffect(() => {
    const selectHeader = document.querySelector("#header");
    if (selectHeader) {
      document.addEventListener("scroll", () => {
        window.scrollY > 100
          ? selectHeader.classList.add("sticked")
          : selectHeader.classList.remove("sticked");
      });
    }
  }, []);

  return (
    
    <div className="page-blog">
     
      <main id="main" className="mt-4">
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-5 posts-list">
        
                {blogsData.map((data,idx) => {
                  return(
                    <BlogCard key={idx} {...data} />
                  )
                })
                }


                </div>

                {/* <div className="blog-pagination">
                  <ul className="justify-content-center">
                    <li>
                      <a href="#">1</a>
                    </li>
                    <li className="active">
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                  </ul>
                </div> */}
              </div>

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="400">
                <div className="sidebar ps-lg-4">
                  <div className="sidebar-item recent-posts">
                    <h3 className="sidebar-title">Recent Posts</h3>

                    <div className="mt-3">

                    <RecentPostCard/>

                    </div>
                  </div>

                  <div className="sidebar-item tags">
                    <h3 className="sidebar-title">Tags</h3>
                    <ul className="mt-3">
                      <li>
                        <a href="#">App</a>
                      </li>
                      <li>
                        <a href="#">IT</a>
                      </li>
                      <li>
                        <a href="#">Business</a>
                      </li>
                      <li>
                        <a href="#">Mac</a>
                      </li>
                      <li>
                        <a href="#">Design</a>
                      </li>
                      <li>
                        <a href="#">Office</a>
                      </li>
                      <li>
                        <a href="#">Creative</a>
                      </li>
                      <li>
                        <a href="#">Studio</a>
                      </li>
                      <li>
                        <a href="#">Smart</a>
                      </li>
                      <li>
                        <a href="#">Tips</a>
                      </li>
                      <li>
                        <a href="#">Marketing</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  
  );
};

export default Blog;



const BlogCard = (props) => {
  return(
<div className="col-lg-6">
    <article className="d-flex flex-column">
      <div className="post-img">
        {/* <img
          src="/img/blog/blog-1.jpg"
          alt=""
          className="img-fluid"
        /> */}
      </div>

      <h2 className="title">
        <a href={`/blog-details/${props._id}`}  target="_blank">
          {props.heading}
        </a>
      </h2>

      <div className="meta-top">
        <ul>
          <li className="d-flex align-items-center">
            <i className="bi bi-person"></i>{" "}
            <a href="/blog-details">{props.userName}</a>
          </li>
          <li className="d-flex align-items-center">
            <i className="bi bi-clock"></i>{" "}
            <a href="/blog-details">
              <time>{props.dateOfCreate}</time>
            </a>
          </li>
        </ul>
      </div>

      <div className="content">
        <p style={{textAlign:'justify'}}>
        {props.content[0].description}
        </p>
      </div>

      <div className="read-more mt-auto align-self-end">
        <a href={`/blog-details/${props._id}`}  target="_blank" >
          Read More <i className="bi bi-arrow-right"></i>
        </a>
      </div>
    </article>
  </div> 
  
  )
}

const RecentPostCard = () => {
  return(
    <>
    {blogsData.map((data, idx) => {
      return(
       <div class="post-item mt-3"  key={idx}>
         <img src="/logo192.png" alt="" class="flex-shrink-0"/>
         <div>
           <h4><a href={`/blog-details/${data._id}`} >{data.heading}</a></h4>
           <time datetime="2020-01-01">{data.dateOfCreate}</time>
         </div>
       </div>
      )})} 
      </>
  )
}


