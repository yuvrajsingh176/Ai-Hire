import Image from "next/image"

const Header = () => {
    return (
        <div className="shadow-sm">
            <Image
                src="/logo.png"
                alt="logo"
                height={100}
                width={100}
                className="w-[100px] h-[100px] p-4 rounded-full"
            />
        </div>
    )
}

export default Header
