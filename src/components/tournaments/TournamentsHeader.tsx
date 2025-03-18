
interface TournamentsHeaderProps {
  title: string;
  description: string;
}

const TournamentsHeader = ({ title, description }: TournamentsHeaderProps) => {
  return (
    <div className="bg-esports-darker py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
            {title}
          </h1>
          <p className="text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TournamentsHeader;
