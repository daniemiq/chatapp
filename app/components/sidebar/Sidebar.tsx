import DesktopSidebbar from "./DesktopSidebar"

async function Sidebbar({children}:{
    children: React.ReactNode
}) {
    return (
        
        <div className="h-full">
            <DesktopSidebbar/>
            <main className="lg:pl-20 h-full">
             {children}
            </main>            
        </div>
    )
}

export default Sidebbar