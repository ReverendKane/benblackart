import {JSX} from "react";

type LinocutItemProps = {
    params: {
        linocutId: string;
    };
}

export default function LinocutItem({ params }: LinocutItemProps):
    JSX.Element {
    return (
        <h2 className="text-lg">Linocut Item {params.linocutId}</h2>
    );
}