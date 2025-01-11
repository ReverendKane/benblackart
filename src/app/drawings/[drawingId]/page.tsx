import {JSX} from "react";

type DrawingItemProps = {
    params: {
        laserId: string;
    };
}

export default function DrawingItem({ params }: DrawingItemProps):
    JSX.Element {
    return (
        <h2 className="text-lg">Drawing Item {params.laserId}</h2>
    );
}