import { useCart } from "@/hooks/useCart.ts";
import { Button } from "@/components/ui/button.tsx";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger} from "@/components/ui/sheet.tsx";
import {LucideShoppingCart, Trash} from "lucide-react";

function ShoppingCart() {
    const { state, dispatch } = useCart();

    const totalCost = state.items.reduce((sum, item) => sum + item.cost * item.quantity, 0);

    return (
        <Sheet>
            <SheetTrigger asChild className="fixed bottom-6 right-6 z-2">
                <Button size="lg" className="cursor-pointer">
                    <LucideShoppingCart/> {state.items.length == 0 ? "" : state.items.length}
                </Button>
            </SheetTrigger>
            <SheetContent side={screen.width > 768 ? "right" : "bottom"}
                          className="font-[Montserrat] my-4 mx-2 md:mb-0 md:mx-0 md:mr-4 rounded-xl h-[95%]"
            >
                <SheetHeader className="text-center text-3xl font-black mb-2">КОРЗИНА</SheetHeader>
                {state.items.length === 0 ? (
                    <p className="text-muted-foreground text-center">Корзина пуста</p>
                ) : (
                    <div className="flex flex-col h-[80%] overflow-auto">
                        {state.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center mx-2 mb-2
                            rounded-lg p-4 border-1 border-border"
                            >
                                <div>
                                    <p className="font-semibold">{item.name} (x{item.quantity})</p>
                                    <p className="text-sm text-gray-600">{item.cost} тг.</p>
                                </div>
                                <Button
                                    variant="destructive" className="cursor-pointer"
                                    size="sm"
                                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } }) }
                                >
                                    <Trash/>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
                <SheetFooter>
                    <div className="flex justify-between font-bold text-lg">
                        <p>Итого:</p>
                        <p>{totalCost} тг.</p>
                    </div>
                    <Button
                        className="cursor-pointer w-full mt-4"
                        onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    >
                        Очистить корзину
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default ShoppingCart;