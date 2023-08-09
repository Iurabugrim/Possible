import {GithubOutlined, GoogleOutlined, InstagramOutlined, PhoneOutlined} from "@ant-design/icons";
import Link from "next/link";


const Footer = () => {
    return (
        <footer className={"flex justify-between items-center mb-5"}>
            <div>
                <h3 className={"mb-1 font-bold"}>Yura Bugrim</h3>
                <p>Fullstack Developer (ReactJS, NodeJS)</p>
            </div>
            <div className={"flex items-center text-2xl gap-4"}>
                <Link href={"/"}>
                    <GoogleOutlined  className={"cursor-pointer"}/>
                </Link>
                <Link href={"/"}>
                    <InstagramOutlined className={"cursor-pointer"}/>
                </Link>
                <Link href={"/"}>
                    <GithubOutlined className={"cursor-pointer"}/>
                </Link>
                <Link href={"/"}>
                    <PhoneOutlined className={"cursor-pointer"}/>
                </Link>
            </div>
        </footer>
    )
}

export default Footer;