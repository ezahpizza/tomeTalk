import CircularText from '@/components/ui/CircularText';


export const Rotatingtext = () => {
    return  (
        <div className="flex items-center justify-center h-full">
            <CircularText
                text="TOMETALK*TOMETALK*"
                onHover="speedUp"
                spinDuration={10}
                className="custom-class bg-gradient-to-r from-slateBlue to-charmPink text-white font-bold text-2xl"
            />
        </div>
    );
}

