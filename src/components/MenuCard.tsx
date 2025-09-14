import {useNavigate} from "react-router-dom";

const MenuCard = ({name, link}: {name: string, link: string}) => {
    const navigate = useNavigate();

    return (
      <div onClick={() => navigate(link)} className="p-6 items-center justify-center rounded-lg
      flex bg-card/70 border-border border-1 hover:scale-102 transition-all duration-200 ease-in-out
      hover:shadow-sm"
      >
          <p className="text-center font-bold text-2xl select-none lg:text-4xl">{name}</p>
      </div>

  )
}

export default MenuCard;