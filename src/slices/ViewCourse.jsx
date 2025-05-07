import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    sectionData: null,
    subsectionData: null,
    ViewCourse : null


}

const viewCourseSlice = createSlice({

    name: 'viewCourse',
    initialState: initialState,
    reducers: {

        setSectionData(state, actions) {
            state.sectionData = actions.payload
        },

        setSubSectionData( state, value) {
            state.subsectionData = value.payload
        },

        setViewCourse(state, value) {
            state.ViewCourse = value.payload
        }
    }
    
})


export const { setSectionData, setSubSectionData,setViewCourse } = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
