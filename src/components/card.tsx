import { ISelectedCard } from "@/@types/types";

interface ICard {
  cardX: number;
  cardY: number;
  angle: number;
  isTop: boolean;
  cardValue: ISelectedCard;
  reveal: boolean;
}

export const Card = ({ cardX, cardY, angle, isTop, cardValue, reveal }: ICard) => {
  return (
    <div
      className={`absolute`}
      style={{
        left: `${cardX}px`,
        top: `${cardY}px`,
        transform: isTop ? `rotate(${(angle * 180) / Math.PI + 90}deg)` : `rotate(${(angle * 180) / Math.PI + 90}deg)`,
      }}
    >
      <div className="[perspective:1000px]">
        <div className={`relative w-10 h-14 rounded-md shadow-lg mb-1 text-sm font-bold transition-transform duration-700 [transform-style:preserve-3d]`}
          style={{ transform: reveal ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >

          {/* Verso */}
          <div className="absolute inset-0 rounded-md shadow-md flex items-center justify-center text-white bg-red-500 text-l [backface-visibility:hidden]
          [background-image:linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%),linear-gradient(-45deg,rgba(255,255,255,0.15)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(255,255,255,0.15)_75%),linear-gradient(-45deg,transparent_75%,rgba(255,255,255,0.15)_75%)] [background-size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px]
          ">
            ?
          </div>

          {/* Frente */}
          <div className="absolute inset-0 bg-white rounded-md shadow-md text-black font-bold flex items-center justify-center flex-col text-sm [transform:rotateY(180deg)] [backface-visibility:hidden]">
            {cardValue.value}
            {cardValue.description && (
              <span className="text-[8px] text-center font-normal mt-0.5">{cardValue.description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}