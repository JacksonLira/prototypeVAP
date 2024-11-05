const PerfilCircular = ({ src, alt = "Perfil" }) => (
    <div className="flex mb-2 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
      <img src={src} alt={alt} className="w-12 h-12 object-cover" />
    </div>
  );
  
  export default function App() {
    return (
      <div className="flex items-center justify-center ">
        <PerfilCircular src="https://www.gravatar.com/avatar/?d=mp" />
      </div>
    );
  }