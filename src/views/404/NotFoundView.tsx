import { Link } from "react-router-dom";

const NotFoundView = () => {
  return (
    <div className="h-[68vh] w-full">
      <h1 className="font-black text-center text-4xl text-gray-800">
        Página No Encontrada
      </h1>
      <p className="mt-10 text-center text-gray-800">
        Tal vez quieres volver a{" "}
        <Link className="text-fuchsia-500" to={"/"}>
          Proyectos
        </Link>
      </p>
    </div>
  );
};

export default NotFoundView;
