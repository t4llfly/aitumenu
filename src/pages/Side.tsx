import '../App.css'
import PlaceCard from "@/components/PlaceCard.tsx";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import type Starter from "@/pages/Starter.tsx";
import {useNavigate} from "react-router-dom";

interface SideOption {
    amount: string;
    cost: number;
}

interface Side {
    name: string;
    options: SideOption[];
}

function Side() {
    const [sideData, setSideData] = useState<Side[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSide = async () => {
            try {
                // Путь к файлу указывается от корня сайта, так как файл в папке /public
                const response = await fetch('/json/side.json');

                if (!response.ok) {
                    new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Starter[] = await response.json();
                setSideData(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSide();
    }, []);

    if (loading) {
        return <div className="flex flex-col items-center gap-6 min-h-screen mx-6 lg:mx-20 my-20">
            <Skeleton className="flex mt-10 lg:w-[90%] w-[100%] h-50"/>
            <Skeleton className="flex lg:w-[90%] w-[100%] h-50"/>
            <Skeleton className="flex lg:w-[90%] w-[100%] h-50"/>
            <Skeleton className="flex lg:w-[90%] w-[100%] h-50"/>
        </div>;
    }

    if (error) {
        return <div className="text-center my-20">Ошибка загрузки данных: {error}</div>;
    }

    return (
        <div className="flex flex-col my-10 font-[Montserrat] items-center min-h-screen mx-6 lg:mx-20">
            <div className="flex flex-row w-[100%] lg:w-[90%] justify-between">
                <Button onClick={() => navigate("/second")} variant="secondary"
                        className="my-auto h-10 w-10 md:h-12 md:w-12" asChild
                >
                    <a><ArrowLeft/></a>
                </Button>
                <p onClick={() => navigate("/")}
                   className="text-4xl cursor-pointer select-none md:text-6xl font-black"
                >
                    ГАРНИРЫ
                </p>
                <Button onClick={() => navigate("/drinks")} variant="secondary"
                        className="my-auto h-10 w-10 md:h-12 md:w-12" asChild
                >
                    <a><ArrowRight/></a>
                </Button>
            </div>

            <div className="mt-10 flex flex-col gap-3 lg:gap-4 w-[98%] lg:w-[90%]">
                {sideData.map((item, index) => (
                    <PlaceCard name={item.name} options={item.options} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Side;
