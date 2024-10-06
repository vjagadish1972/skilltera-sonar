import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarNew from "../../../Component/NavBar New/navBarNew";
import { blogsData } from '../../../dummyData';
import './blogDetails.css';

const BlogDetails = () => {

  const { blogId } = useParams();

  const [allData, setAllData] =  useState([])


    useEffect(() => {
        const selectHeader = document.querySelector("#header");
        if (selectHeader) {
          document.addEventListener("scroll", () => {
            window.scrollY > 100
              ? selectHeader.classList.add("sticked")
              : selectHeader.classList.remove("sticked");
          });
        }

        const blogData  = blogsData.find(x => x._id === blogId)
        setAllData(blogData)

      }, []);
  
    
  return (
    <div className="page-blog">

    <header id="header" className="header fixed-top">
      <NavBarNew />
    </header>

    {Object.keys(allData).length > 0 ? <main id="main" className='mt-4'>

    <section id="blog" class="blog">
      <div class="container" data-aos="fade-up">

        <div class="row g-5">

          <div class="col-lg-12" data-aos="fade-up" data-aos-delay="200">

            <article class="blog-details">

              {/* <div class="post-img">
                <img src="/img/blog/blog-1.jpg" alt="" class="img-fluid"/>
              </div> */}

              <h2 class="title">{allData.heading}</h2>

              <div class="meta-top">
                <ul>
                  <li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="blog-details.html">{allData.userName}</a></li>
                  <li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="blog-details.html"><time datetime="2020-01-01">{allData.dateOfCreate}</time></a></li>
                </ul>
              </div>

              <div class="content">
               
             {allData.content.map((data,idx) => {
              return (
                <div key={idx} >
                <h3>{data.title}</h3>
                <p style={{textAlign:'justify'}}> {data.description} </p>
                 {/* <img src="/img/blog/blog-inside-post.jpg" class="img-fluid" alt=""/> */}
               </div>

              )})
               
             }

               

              </div>

              <div class="meta-bottom">
                <i class="bi bi-folder"></i>

                <i class="bi bi-tags"></i>
                <ul class="tags">
                {allData.relatedHashtags.map((tag, index) => (
                   <li key={index}> <a>{tag}</a> </li>
                  ))}
                </ul>
              </div>

            </article>
            <div class="post-author d-flex align-items-center">
              <img src="/logo192.png" class="rounded-circle flex-shrink-0" alt=""/>
              <div>
                <h4>{allData.userName}</h4>
                <div class="social-links">
                  <a href="https://twitters.com/#"><i class="bi bi-twitter"></i></a>
                  <a href="https://facebook.com/#"><i class="bi bi-facebook"></i></a>
                  <a href="https://instagram.com/#"><i class="biu bi-instagram"></i></a>
                </div>
                <p>
                {allData.aboutAuthor}
                </p>
              </div>
            </div>

  
          </div>

       
        </div>

      </div>
    </section>

     </main>  : <h1 className='text-center'> No Data Found</h1>}      

    </div>
  )
}

export default BlogDetails