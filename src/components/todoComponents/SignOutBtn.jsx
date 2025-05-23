import { FaSignOutAlt } from "react-icons/fa";

const SignOutBtn = ({handleSignOut}) => {
  return (
    <div className="signOut-container border p-1 border-none  rounded-xl text-center absolute right-0 -bottom-10 text-sm hover:shadow-md hover:border">
        <div className="flex relative gap-1 items-center">
            <button className='signOut-button cursor-pointer w-full pr-5' onClick={handleSignOut}>Sign Out</button>
            <FaSignOutAlt className="absolute right-0 pointer-events-none" />
        </div>
    </div> 
  )
}

export default SignOutBtn