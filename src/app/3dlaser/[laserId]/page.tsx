import {JSX} from "react";

type LaserItemProps = {
    params: {
        laserId: string;
    };
}

export default function LaserItem({ params }: LaserItemProps):
    JSX.Element {
    return (
        <h2 className="text-lg">Laser Item {params.laserId}</h2>
    );
}