type LaserItemProps = {
  params: {
    laserId: string;
  };
};

export default function LaserPage({ params }: LaserItemProps) {
  return <h2 className="text-lg">Laser Item {params.laserId}</h2>;
}
