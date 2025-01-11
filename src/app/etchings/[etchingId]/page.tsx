import {JSX} from "react";

type EtchingItemProps = {
    params: {
        etchingId: string;
    };
}

export default function EtchingItem({ params }: EtchingItemProps):
    JSX.Element {
    return (
        <h2 className="text-lg">Etching Item {params.etchingId}</h2>
    );
}