
interface LoaderProps {
    message?: string;
  }

const Loader: React.FC<LoaderProps> = ({ message}) =>{
    return (
        <div className="font-titilium w-[100%] items-center gap-2 flex flex-col">
            <div className={`border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-pink-700 `}></div>
            <p className="text-2xl">{message}</p>
        </div>
    )
}

export default Loader;