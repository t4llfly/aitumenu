import '../App.css'
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

import moodle from "../assets/2025-09-12 16.04.48.mp4"
import {useNavigate} from "react-router-dom";

function Complex() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col py-10 bg-black font-[Montserrat] items-center min-h-screen px-6 lg:px-20">
            <div className="flex flex-row w-[100%] lg:w-[90%] justify-between">
                <Button onClick={() => navigate("/drinks")} variant="secondary"
                        className="my-auto h-10 w-10 md:h-12 md:w-12" asChild
                >
                    <a><ArrowLeft/></a>
                </Button>
                <p onClick={() => navigate("/")}
                   className="text-4xl cursor-pointer select-none md:text-6xl text-white font-black"
                >
                    КОМПЛЕКС
                </p>
                <div className="my-auto h-10 w-10 md:h-12 md:w-12"/>
            </div>

            <video className="my-10" src={moodle} loop autoPlay muted/>
            <p className="text-center text-white">Здесь должно быть что-то, но оно ещё не готово</p>
        </div>
    )
}

export default Complex;
