
import { signOut } from "next-auth/react";
import EmptState from "../components/emptystate";

const Users = () => {
    return ( 
        <div className=" hidden lg:block lg:pl-80 h-full">
            <EmptState/>
        </div>
     );
}
 
export default Users;