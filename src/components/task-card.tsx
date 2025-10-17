interface ITaskCard {
  title: string;
  description?: string;
}

export const TaskCard = ({ title, description }: ITaskCard) => {
  return (
    <div className="absolute flex flex-col items-center justify-center text-center px-6 py-4 bg-white/90 rounded-lg shadow-lg max-w-xs">
      <h2 className="text-sm font-bold text-gray-900">{title}</h2>
      {description && <p className="text-xs text-gray-800">{description}</p>}
    </div>
  );
};
