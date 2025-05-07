import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import {  Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CATEGORY_API, COURSE_APIS } from '../services/apis';
import CourseSwiper from '../components/cors/Catalog/CourseSwiper';
import FooterData from '../components/cors/Home/FooterData'


const { GET_ALL_CATEGORIES } = COURSE_APIS;
const {CATEGORY_PAGE_DETAILS} = CATEGORY_API

const Category = () => {

  const catalogName = useParams();
  const [ categoryId, setCategoryId ] = useState(null);
  const [catalogPageData, setCatalogPageData]= useState(null);
  const [show, SetShow] = useState(true)
  
  
  const navigate = useNavigate();
  const location = useLocation();

 
 

  useEffect(() => {

   
    const getCategories= async() => {
      let result;
      try {

         result = await apiConnector("GET", GET_ALL_CATEGORIES);
        console.log('PRINTING CATEGORIES', result);
        
        
      } catch (error) {

        console.log('ERROR FESCHING CATEGORIES', error);
        
      }
      // console.log(catalogName.catalogName)

      // fetching current category id
      const category_id = result?.data?.allCategorys.filter((cat) => cat.categoryName?.split(' ')?.join('-')?.toLowerCase() === catalogName.catalogName.toLowerCase())[0]._id;

      console.log('category_Id', category_id);
      console.log('location path', location.pathname)
      
    
      setCategoryId(category_id)
      
      
      
     
    }

    
    
      getCategories();
    

    console.log('setcategoryresult',categoryId)
  
  }, [catalogName])
  

  useEffect(() => {
    
    const getPageDetails = async () => {
     
      const result = await apiConnector("GET", CATEGORY_PAGE_DETAILS, null, null, { categoryId })
      setCatalogPageData(result?.data)
      console.log('CATEGORY PAGE DETAILS', result);
      // console.log('catalogData : ',catalogPageData?.selectedCategory?.course)
      // console.log('CATEGORY PAGE DETAILS', result?.data.selectedCategory.course);
    }

    if(categoryId){
      getPageDetails();
      console.log('categoryId in api', categoryId)

    }
    
  }, [categoryId]);

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full flex flex-col bg-richblack-800 items-center'>

        
        <div className='w-[78%] text-white mt-32 p-3 pb-14   flex justify-between'>
          
          <div>
          <p className='text-richblack-500'>
            Home  /  Catalog  /{'  '}
          <span className='text-yellow-50'>{ catalogPageData?.selectedCategory?.categoryName}</span>
          </p>

          <p className='text-3xl font-semibold mt-7'> 
          { catalogPageData?.selectedCategory?.categoryName}
          </p>

          <p className='text-md text-richblack-400 font-semibold mt-4'>
          { catalogPageData?.selectedCategory?.description}
          </p>
          </div>
          
          <div>

            <p className='text-xl font-semibold'>Related Resources</p>

            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </div>
        </div>

       
      </div>

      { /* section 2*/}

      <div className='mt-10 w-11/12 lg:ml-[17rem]'>

        <div>
          <p className='text-3xl text-richblack-25 font-bold text-left'> Courses To Get You Started </p>

        </div>


        {/* first swiper */}
        <div className='mt-4'>

          <ul className='text-richblack-25 flex gap-5 text-lg'>
            <li
              onClick={() => SetShow(true)}
              className={` ${show ? "text-yellow-100" : 'text-richblack-25'} cursor-pointer relative`}>
              
              <p>Most Popular</p>
              
              {
                show && <div className=' absolute h-[1px] lg:w-[6.5rem] bg-yellow-100 mt-3 -bottom-3'></div>
            }
              
            </li>
            
            <li
              
              onClick={() => SetShow(false)}
              className={` ${!show ? "text-yellow-100" : 'text-richblack-25'} cursor-pointer relative`}>
              <p> New </p>

              {
                !show && <div className=' absolute h-[1px] lg:w-[4rem] bg-yellow-100 mt-3 -bottom-3'></div>
              }

            </li>
          </ul>

          
            <div className='h-[1px] w-11/12 bg-richblack-700 mt-3'></div>
            
           
          {/* swiper  */}
          <div>

            
            {
              // most popular 

              show && <CourseSwiper data={ catalogPageData?.top10Courses} />
            }


            {
              // new

              !show && <CourseSwiper data={ catalogPageData?.selectedCategory?.course} />
            }
          </div>
            
            
          

        </div>
      </div>

      
      {/* section 3 */}

      <div className='mt-20 w-11/12 lg:ml-[17rem] pb-10'>

        <div>
          <p className='text-3xl text-richblack-25 font-bold text-left'> Different Courses </p>

        </div>

        <div className='h-[1px] w-11/12 bg-richblack-700 mt-3'></div>

       
        <div className='grid grid-cols-3 mt-5'>

          {
            catalogPageData?.differentCourses?.map((category) => (
              category?.course?.map((course, index) => (

                
                   <div
                    onClick={() => navigate(`/differentCourses/${course._id}`)}
                  key={index} className='text-richblack-25 mt-10'>
  
                  <img src={course?.thumbnail} alt="thumbnail" className='lg:h-[16rem] lg:w-[30rem] rounded-lg'/>
  
                  <p className='text-lg font-semibold text-richblack-25'>{course?.CourseName}</p>
                  
                  <p className='text-md text-richblack-400'>
                    <span>{ course?.instructor?.firstName}</span>  <span>{ course?.instructor?.lastName}</span>
                  </p>
  
                  <p> Ratings pending</p>
  
                  <p className='text-lg font-semibold text-richblack-5'> Rs. { course?.price}</p>
                </div>
             
                 
                
              ))
            ))
          }

        </div>
      </div>

      <FooterData />
    </div>
  )
}

export default Category