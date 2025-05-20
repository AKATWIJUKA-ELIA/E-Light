import {createSlice} from "@reduxjs/toolkit"

interface User {
        User_id: string;
        Username: string;
        role:string,
        profilePicture:string,
        isVerified:boolean,

}

interface userState {
        user: User;
}

const initialState: userState={
        user: {
                User_id: "",
                Username: "",
                role: "",
                profilePicture: "",
                isVerified: false
        }
}

const UserSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
                SaveUser(state, action){
                        const{User_id, Username,role,profilePicture,isVerified} =action.payload;
                        state.user.User_id=  User_id,
                        state.user.Username= Username,
                        state.user.role=role,
                        state.user.profilePicture=profilePicture,
                        state.user.isVerified=isVerified
                },
             
                
                DeleteUser(state ){
                        state.user.User_id=  "",
                        state.user.Username= "",
                        state.user.role="",
                        state.user.profilePicture="",
                        state.user.isVerified=false
    
                }
        }
})
export const {SaveUser,DeleteUser } = UserSlice.actions
export default UserSlice.reducer;