'use client'

interface SideBarProps {
    setStateAdmin: (arg: string) => void
}

const SideBarDashboard: React.FC<SideBarProps> = ({setStateAdmin}) =>{
    return(
        <div className="w-[20%] h-[100vh] bg-gray-700 items-center flex flex-col gap-5 relative top-[8rem]">
            <button  >Users</button>
            <button onClick={() => setStateAdmin('CreateProduct')} className="bg-orange-400/[0.9] px-4 py-2 rounded ">Products</button>
            <p>Tasks</p>
            <p>Flyers</p>
        </div>
    )
}
export default SideBarDashboard