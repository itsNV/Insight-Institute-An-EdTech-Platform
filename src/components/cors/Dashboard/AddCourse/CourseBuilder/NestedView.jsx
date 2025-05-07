import React, { useEffect, useState } from 'react'
import { MdArrowDropDown, MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { deleteSubSection, DeleteSubSection } from '../../../../../services/operations/courseApi';
import { DeleteSection } from '../../../../../services/operations/courseApi';
import SubSectionModal from './SubSectionModal';

const NestedView = ({ handleChangeEditSectionName }) => {
    
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    const [loading,setLoading] = useState(false)
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [addSubSection,setAddSubSection] = useState(null);
    
    const dispatch = useDispatch()
    
    // delete subsection
    const handleDeletesubsection = (subsectionId,sectionId, courseId = course._id) => {
        setLoading(true)
        setViewSubSection(null)
        setEditSubSection(null)
        setAddSubSection(null)
        dispatch(deleteSubSection(subsectionId, sectionId, courseId, token))
        setLoading(false)
     }


    const deleteSection = (sectionId) => {
        
        // console.log('section Id', sectionId)
        setLoading(true)
        dispatch(DeleteSection({
            sectionId,courseId : course._id
        }, token))
        
        setLoading(false)
    }

   


  return (
      <div className='bg-richblack-700 rounded-lg p-4 px-4'>
          
          
          
          {
             
              course.CourseContent.map((section) => (
                  <details key={section._id} className='mb-5'>
                      
                      <summary >
                          <div className='text-white flex justify-between'>
                          <div className='flex gap-3 items-center text-2xl text-richblack-200 font-semibold'>
                              <RxDropdownMenu/>
                              <span >{ section.sectionName}</span>
                          </div>

                          {/* section btns */}
                          <div className='flex gap-3 items-center text-lg text-richblack-200 font-semibold'>
                              {/* edit button */}
                                  <button
                                      disabled={loading}
                                      type='button'
                                  onClick={()=> handleChangeEditSectionName(section._id,section.sectionName)}>
                              <MdEdit />
                              </button>

                                  {/* delete section */}
                                  <button
                                       disabled={loading}
                                      type='button'
                                      onClick={() => deleteSection(section._id)}>
                                  <MdDelete/>
                              </button>

                              <span>|</span>



                          </div>
                          </div>
                          
                          <div>
                              <button
                                   disabled={loading}
                                  type="button"
                                  onClick={() => setAddSubSection(section._id)}
                                            className="flex items-center gap-3 border border-richblack-900 shadow-sm mt-10 shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
                                          >
                                            Add SubSection
                                            <IoIosAddCircleOutline className="text-lg text-" />
                                          </button>
                          </div>
                        
                         
                      </summary>

                      {
                              section?.subsection?.length>0 &&
                              section?.subsection?.map((subsec) => (
                                  <div key={subsec._id} className='flex justify-between mt-4 '>
                                      <div
                                          onClick={() => setViewSubSection(subsec)}
                                          className='flex gap-3 items-center text-xl text-richblack-200 font-semibold'>
                                            <RxDropdownMenu/>
                                            <span >{ subsec.title}</span>
                                      </div>
                                      
                                      <div className='flex gap-3 items-center text-lg text-richblack-200 font-semibold'>
                              {/* edit subsection */}
                              <button
                                      type='button'
                                              onClick={() => setEditSubSection({ subsec, sectionId: section._id })}> {/* section is needed at  api call for use of controller */}
                              <MdEdit />
                              </button>

                                  {/* delete subsection */}
                              <button
                                              type='button'
                                              onClick={() => handleDeletesubsection(subsec._id,section._id)}>
                                  <MdDelete/>
                              </button>

                              <span>|</span>



                          </div>
                              </div>
                              ))
                          }
                      
                  </details>
              ))
          }

          {
              addSubSection &&
              <SubSectionModal
                  modalData={addSubSection}
                  setModalData={setAddSubSection}
                  addData={true}
              />
          }
            {
              editSubSection &&
              <SubSectionModal
                  modalData={editSubSection}
                  setModalData={setEditSubSection}
                  editData={true}
              />
          }
            {
              viewSubSection &&
              <SubSectionModal
                  modalData={viewSubSection}
                  setModalData={setViewSubSection}
                  viewData={true}
              />
          }
      </div>
      
  )
}

export default NestedView