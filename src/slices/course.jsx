import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    step: 1,
    course: localStorage.getItem('course') ? JSON.parse(localStorage.getItem('course')) : null,
    editCourse: false,
    isSaved: false,
    instructoreCourses: localStorage.getItem('instructoreCourses') ? JSON.parse(localStorage.getItem('instructoreCourses')) : null,
}

const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {
        setStep(state, action) {
            state.step = action.payload;
        },

        setCourse(state, value) { 
            state.course = value.payload;
        },
        setEditCourse(state, action) { 
            state.editCourse = action.payload;
        },
        setIsSaved(state, action) { 
            state.isSaved = action.payload;
        },
        setInstructoreCourses(state, action) { 
            state.instructoreCourses = action.payload;
        },
    }
})


export const { setCourse, setStep,setEditCourse,setIsSaved,setInstructoreCourses } = courseSlice.actions;
export default courseSlice.reducer;