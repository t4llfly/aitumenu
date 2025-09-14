import '../App.css'
import PlaceCard from "@/components/PlaceCard.tsx";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useNavigate} from "react-router-dom";

interface StarterOption {
    amount: string;
    cost: number;
}

interface Starter {
    name: string;
    options: StarterOption[];
}

function Starter() {
    const [starterData, setStarterData] = useState<Starter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStarter = async () => {
            try {
                // Путь к файлу указывается от корня сайта, так как файл в папке /public
                const response = await fetch('/json/starters.json');

                if (!response.ok) {
                    new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Starter[] = await response.json();
                setStarterData(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStarter();
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
        <div className="flex flex-col my-10 items-center font-[Montserrat] min-h-screen mx-6 lg:mx-20">
            <div className="flex flex-row w-[100%] lg:w-[90%] justify-between">
                <Button onClick={() => navigate("/salads")} variant="secondary"
                        className="my-auto h-10 w-10 md:h-12 md:w-12" asChild
                >
                    <a><ArrowLeft/></a>
                </Button>
                <p onClick={() => navigate("/")}
                   className="text-4xl md:text-6xl font-black select-none cursor-pointer"
                >
                    ПЕРВОЕ
                </p>
                <Button onClick={() => navigate("/second")} variant="secondary"
                        className="my-auto h-10 w-10 md:h-12 md:w-12" asChild
                >
                    <a><ArrowRight/></a>
                </Button>
            </div>

            <div className="mt-10 flex flex-col gap-3 lg:gap-4 w-[100%] lg:w-[90%]">
                {starterData.map((item, index) => (
                    <PlaceCard key={index} name={item.name} options={item.options} />
                ))}
            </div>
        </div>
    )
}

export default Starter;
