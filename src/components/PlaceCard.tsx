import Marquee from "react-fast-marquee";
import {useCart} from "@/hooks/useCart.ts";
import {useMemo, useState} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Minus, Plus} from "lucide-react";

interface ItemOption {
    amount: string;
    cost: number;
}

type PlaceCardProps = {
    name: string;
    options: ItemOption[];
}

const PlaceCard = ({name, options}: PlaceCardProps) => {
    const { state, dispatch } = useCart();
    const [selectedOption, setSelectedOption] = useState<ItemOption>(options[0]);

    const itemInCart = useMemo(() => {
        const itemId = `${name}-${selectedOption.amount}`;
        return state.items.find(item => item.id === itemId);
    }, [name, selectedOption, state.items]);

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: { name, option: selectedOption } });
    };

    const handleDecrease = () => {
        if (itemInCart) {
            dispatch({ type: 'DECREASE_ITEM', payload: { id: itemInCart.id } });
        }
    };

    const handleOptionChange = (amount: string) => {
        const newOption = options.find(opt => opt.amount === amount);
        if (newOption) {
            setSelectedOption(newOption);
        }
    };

    return (
        <div className="p-6 rounded-lg flex flex-col md:flex-row bg-card border-border border-1
        hover:scale-102 transition-all duration-200 ease-in-out hover:shadow-sm">
            <div className="flex flex-col items-center md:items-start">
                <p className="text-center md:text-left font-bold md:my-auto max-w-70
                md:max-w-120 lg:max-w-200 text-2xl md:text-3xl lg:text-4xl select-none"
                >
                    {name.length > 28 && screen.width > 768 ?
                        <Marquee speed={100} className="whitespace-pre-wrap overflow-clip">
                            {name}
                        </Marquee>
                        : name.length > 17 && screen.width < 768 ?
                            <Marquee speed={50} className="whitespace-pre-wrap overflow-clip">
                                {name}
                            </Marquee> : name
                    }
                </p>
                {options.length > 1 ? (
                    <RadioGroup
                        defaultValue={selectedOption.amount}
                        onValueChange={handleOptionChange}
                        className="mt-2 flex flex-wrap gap-x-4 gap-y-2"
                    >
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem className="cursor-pointer" value={option.amount}
                                                id={`${name}-${index}`}
                                />
                                <Label htmlFor={`${name}-${index}`}>
                                    {option.amount}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                ) : (
                    // Если опция одна, просто показываем ее
                    <p className="select-none text-muted-foreground">{options[0].amount}</p>
                )}
            </div>


            <div className="flex grow"/>
            <div className="flex flex-col gap-2 mt-3 md:mt-0">
                <p className="font-semibold select-none text-center text-2xl">{selectedOption.cost} тг.</p>
                {itemInCart ? (
                    // Если товар в корзине, показываем контроллер количества
                    <div className="flex items-center mx-auto gap-2">
                        <Button className="cursor-pointer" variant="outline" size="icon" onClick={handleDecrease}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg select-none w-8 text-center">{itemInCart.quantity}</span>
                        <Button className="cursor-pointer" variant="outline" size="icon" onClick={handleAddToCart}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    // Если товара нет, показываем обычную кнопку
                    <Button className="cursor-pointer" onClick={handleAddToCart}>Добавить</Button>
                )}
            </div>
        </div>
    )
}

export default PlaceCard;