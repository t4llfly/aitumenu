import '../App.css'
import MenuCard from "@/components/MenuCard.tsx";

function MainPage() {
    return (
        <div className='flex my-10 md:my-0 flex-col font-[Montserrat] justify-start md:justify-center
        min-h-screen bg-background items-center mx-6 xl:mx-20'
        >
            <p className="select-none text-4xl md:text-6xl text-center font-black">
                AITU MENU
            </p>

            <div className="z-1 mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-3 w-[98%] md:w-[90%]">
                <MenuCard name="Салаты / Закуски" link="/salads"/>
                <MenuCard name="Первые блюда" link="/starter"/>
                <MenuCard name="Вторые блюда" link="/second"/>
                <MenuCard name="Гарнир" link="/side"/>
                <MenuCard name="Напитки" link="/drinks"/>
                <MenuCard name="Комплекс" link="/complex"/>
            </div>

            <p className="z-1 mt-10 text-center text-muted-foreground">
                made by
                <a href="https://tallfly.ru"
                   className="mx-1 transition-all hover:tracking-wide duration-200 ease-in-out
                   font-semibold hover:font-black"
                >
                    tallfly.
                </a>
                меню постоянно дополняется.
            </p>

            <div className={`z-0 blur-2xl opacity-10 dark:opacity-20 rounded-full group-hover:scale-120 
            transition duration-300 left-35 bottom-[20%] h-[600px] w-[600px] 
            bg-blue-600 fixed`}/>
            <div className={`fixed z-0 blur-2xl opacity-10 dark:opacity-20 rounded-full group-hover:scale-120 
            transition duration-300 right-35 bottom-[5%] h-[700px] w-[700px] 
            bg-purple-700`}/>
        </div>
    )
}

export default MainPage;
