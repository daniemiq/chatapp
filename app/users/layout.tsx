import Sidebbar from "../components/sidebar/Sidebar"

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode
}){
    return(
        <Sidebbar>
            <div className="h-full">
                { children }
            </div>
        </Sidebbar>
    )   
}